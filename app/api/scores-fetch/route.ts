import { TDsaFormSchema } from "@/lib/types";
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/utils/database";
import DsaSubmission from "@/app/models/dsa-submission";

interface GroupedSubmissions {
  email: string;
  points: number;
  name: string;
  submissions: TDsaFormSchema[];
}

export async function GET(req: Request, res: Response) {
  await connectToDB();

  try {
    const allSubmissions: TDsaFormSchema[] = await DsaSubmission.find({});

    // Group submissions by email and calculate points
    const groupedSubmissions: Record<string, GroupedSubmissions> =
      allSubmissions.reduce((result, submission) => {
        const { email, points, name } = submission;

        result[email] = result[email] || {
          name: "",
          email,
          points: 0,
          submissions: [],
        };

        if (!result[email]?.name || result[email]?.name !== name) {
          result[email].name = name;
        }

        result[email].points += points;
        result[email].submissions.push(submission);

        return result;
      }, {} as Record<string, GroupedSubmissions>);

    // Convert the grouped submissions to an array
    const submissionsArray: GroupedSubmissions[] = Object.values(
      groupedSubmissions
    ).sort((a, b) => b.points - a.points);

    return new NextResponse(JSON.stringify(submissionsArray), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return new NextResponse(`Failed to fetch submissions ${error}`, {
      status: 500,
    });
  }
}
