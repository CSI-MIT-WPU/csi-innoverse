import { DsaFormSchema, TDsaFormSchema } from "@/lib/types";
import DsaSubmission from "@/models/dsa-submission";
import { connectToDB } from "@/utils/database";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
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
    language: "",
    email: "",
    phoneNumber: "",
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

  // console.log(otherData.phoneNumber);
  const result = DsaFormSchema.safeParse(otherData);
  // console.log(result);

  if (result.success) {
    await connectToDB();

    try {
      const { uploadResult, fileLocation } = await processAndUploadImage(
        file,
        s3,
      );

      newDsaSubmission = new DsaSubmission({
        name: otherData.name,
        email: otherData.email, // Access values directly from otherData
        phoneNumber: otherData.phoneNumber,
        questionNumber: otherData.questionNumber,
        time: otherData.time,
        memory: otherData.memory,
        language: otherData.language,
        code: otherData.code,
        image: fileLocation,
        points: otherData.points,
      });
      console.log(newDsaSubmission);
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

export async function GET(req: NextRequest, res: Response) {
  await connectToDB();

  try {
    const email = req.nextUrl.searchParams.get("email");
    const questionNumber = req.nextUrl.searchParams.get("questionNumber");
    // Check if the user has already submitted for the given question number
    const userHasSubmitted = await DsaSubmission.exists({
      email: email,
      questionNumber: parseInt(questionNumber as string, 10),
    });

    if (userHasSubmitted) {
      // User has already submitted, you can return the appropriate response
      return new NextResponse(JSON.stringify({ alreadySubmitted: true }), {
        status: 200,
      });
    }

    // User has not submitted for the given question number
    return new NextResponse(JSON.stringify({ alreadySubmitted: false }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error checking user submission:", error);
    return new NextResponse(`Failed to check user submission ${error}`, {
      status: 500,
    });
  }
}
