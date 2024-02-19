// import { TDsaFormSchema } from "@/lib/types";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import DsaSubmission from "@/models/dsa-submission";
import { questionNos } from "@/app/forms/dsa-submission/data";

interface TDsaFormSchema {
  code: string;
  time: number;
  name: string;
  email: string;
  phoneNumber: string;
  questionNumber: number;
  memory: number;
  language: string;
  points: number;
  image?: any;
  timestamp: Date;
  id: number;
}

interface GroupedSubmissions {
  id: number;
  email: string;
  points: number;
  name: string;
  timestamp: Date;
  submissions: TDsaFormSchema[];
}

export async function GET(req: Request, res: Response) {
  await connectToDB();

  try {
    const allSubmissions: TDsaFormSchema[] = await DsaSubmission.find({});

    // Group submissions by email and accumulate points
    const groupedSubmissions: Record<string, GroupedSubmissions> =
      allSubmissions.reduce(
        (result, submission) => {
          const { email, points, name, timestamp, id } = submission;

          result[email] = result[email] || {
            name: "",
            email,
            points: 0,
            submissions: [],
            timestamp: new Date(0), // Initialize timestamp
          };

          if (!result[email]?.name || result[email]?.name !== name) {
            result[email].name = name;
          }

          result[email].points += points;
          result[email].submissions.push(submission);

          // Update timestamp if the current submission has a later timestamp
          const questionInfo = getQuestionInfo(id);
          const revealTime = questionInfo
            ? questionInfo.revealDate
            : new Date();

          if (timestamp > result[email].timestamp && timestamp > revealTime) {
            result[email].timestamp = timestamp;
          }

          return result;
        },
        {} as Record<string, GroupedSubmissions>,
      );

    // Convert the grouped submissions to an array and sort by timestamp and points
    const submissionsArray: GroupedSubmissions[] = Object.values(
      groupedSubmissions,
    ).sort((a, b) => {
      // Sort first by points in descending order, then by timestamp in descending order
      return (
        b.points - a.points || b.timestamp.getTime() - a.timestamp.getTime()
      );
    });
    return new NextResponse(JSON.stringify(submissionsArray), {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=10",
        "CDN-Cache-Control": "public, s-maxage=10",
        "Vercel-CDN-Cache-Control": "public, s-maxage=10",
      },
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return new NextResponse(`Failed to fetch submissions ${error}`, {
      status: 500,
    });
  }
}

// Helper function to get question information based on question number
function getQuestionInfo(
  questionNumber: number,
): { revealDate: Date } | undefined {
  // Replace this with your logic to retrieve question information
  const questionInfo = questionNos.find((q) => q.id === questionNumber);
  return questionInfo;
}
