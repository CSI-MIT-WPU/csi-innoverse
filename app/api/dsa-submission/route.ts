import { DsaFormSchema, TDsaFormSchema } from "@/lib/types";
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/utils/database";
import DsaSubmission from "@/app/models/dsa-submission";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3: S3Client = new S3Client({
  region: process.env.AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: Request) {
  let newDsaSubmission;
  let zodErrors = {};
  const data = await request.formData();
  const file: File = data.get("image") as File;
  // console.log(file);
  // return;
  const otherData: { [key: string]: string | number | File } = {
    code: "",
    email: "",
    // csiId: 0,
    name: "",
    questionNumber: 0,
    time: 0,
    memory: 0,
    image: "",
    points: 0,
  };

  for (const [key, value] of data.entries()) {
    if (
      key === "questionNumber" ||
      key === "time" ||
      key === "memory" ||
      key === "points"
    ) {
      otherData[key] = Number(value);
    } else {
      otherData[key] = value;
    }
  }

  const result = DsaFormSchema.safeParse(otherData);

  if (result.success) {
    await connectToDB();

    try {
      const { uploadResult, fileLocation } = await processAndUploadImage(
        file,
        s3
      );

      newDsaSubmission = new DsaSubmission({
        name: otherData.name,
        email: otherData.email, // Access values directly from otherData
        questionNumber: otherData.questionNumber,
        time: otherData.time,
        memory: otherData.memory,
        code: otherData.code,
        image: fileLocation,
        points: otherData.points,
      });
      await newDsaSubmission.save();
      return new NextResponse(JSON.stringify(newDsaSubmission), {
        status: 201,
      });
    } catch (error) {
      console.error("Image processing or upload error:", error);
      return new NextResponse("Failed to process or upload image", {
        status: 500,
      });
    }
  } else {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return new NextResponse(JSON.stringify({ errors: zodErrors }), {
      status: 422,
    });
  }
}

const processAndUploadImage = async (image: File, s3: S3Client) => {
  const imageBuffer = Buffer.from(await image.arrayBuffer());

  const processedImageBuffer = await sharp(imageBuffer)
    .resize({ width: 500 })
    .jpeg({
      quality: 30, // Lower quality for more aggressive compression
      progressive: true, // Enable progressive JPEG for faster loading
      force: true, // Force conversion to JPEG even if original format is different
    })
    .toBuffer();

  const params: {
    Bucket: string;
    Key: string;
    Body: Buffer;
    ContentType: string;
  } = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || "",
    Key: `dsa-ss/${Date.now()}${Math.random().toString(36).slice(2)}.jpg`,
    Body: processedImageBuffer,
    ContentType: "image/jpeg",
  };

  const uploadResult = await s3.send(new PutObjectCommand(params));
  const fileLocation = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;

  return { uploadResult, fileLocation };
};

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
    const submissionsArray: GroupedSubmissions[] =
      Object.values(groupedSubmissions);

    return new NextResponse(JSON.stringify(submissionsArray), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return new NextResponse("Failed to fetch submissions", {
      status: 500,
    });
  }
}
