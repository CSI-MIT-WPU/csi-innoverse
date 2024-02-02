/* eslint-disable react/no-unescaped-entities */
"use client";
import { DsaFormSchema, TDsaFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRecentQuestions } from "./data";

const checkUserSubmission = async (
  email: string,
  questionNumber: number
): Promise<boolean> => {
  try {
    const response = await fetch(
      `/api/dsa-submission?email=${email}&questionNumber=${questionNumber}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData.alreadySubmitted; // true if already submitted, false otherwise
    }
  } catch (error) {
    console.error("Error checking user submission:", error);
  }
  return false;
};

const DsaSubmission = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const questionsData = getRecentQuestions();

  const form = useForm<TDsaFormSchema>({
    resolver: zodResolver(DsaFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      questionNumber: 0,
      time: 0,
      memory: 0,
      language: "",
      code: "",
      image: undefined,
    },
  });

  const handleFileChange = (event: any, field: any) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the file size exceeds 3 MB
      if (file.size > 3 * 1024 * 1024) {
        // Set an error message for the file field
        form.setError("image", {
          type: "manual",
          message: "File size must be less than 3 MB.",
        });
      } else {
        // Clear any existing error messages for the file field
        form.clearErrors("image");
      }
    }
  };

  const onSubmit = async (data: TDsaFormSchema) => {
    setIsLoading(true);
    let points = 0;

    // File existance check
    const inputElement = document.querySelector(
      "input[name='image']"
    ) as HTMLInputElement | null;
    let imageFile;
    if (inputElement) {
      imageFile = inputElement.files?.[0];
    } else {
      console.error("File not found");
    }

    // File type and size check
    if (imageFile) {
      if (imageFile.size > 3 * 1024 * 1024) {
        form.setError("image", {
          type: "manual",
          message: "File size must be less than 3 MB.",
        });

        setIsLoading(false);
        return;
      }
      const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedFileTypes.includes(imageFile.type)) {
        form.setError("image", {
          type: "manual",
          message: "File type must be JPEG, PNG, or JPG.",
        });

        setIsLoading(false);
        return;
      }
    }

    const userHasSubmittedForQuestion = await checkUserSubmission(
      data.email,
      data.questionNumber
    );

    if (!userHasSubmittedForQuestion) {
      // Points Calculation
      const currentDate = new Date();
      const question = questionsData.find((q) => q.qNo === data.questionNumber);

      if (question) {
        const timeDifferenceHours =
          (currentDate.getTime() - question.revealDate.getTime()) /
          (60 * 60 * 1000);

        // Calculate points based on the time difference
        const initialPoints = 10;
        const pointsReductionInterval = 3; // Reduce 1 point every 3 hours
        const pointsReductionFactor = Math.floor(
          timeDifferenceHours / pointsReductionInterval
        );
        points = Math.max(initialPoints - pointsReductionFactor, 0);
      }
    }

    // Form Data preparation
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("questionNumber", String(data.questionNumber));
    formData.append("time", String(data.time));
    formData.append("memory", String(data.memory));
    formData.append("points", String(points));
    formData.append("code", data.code);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("language", data.language);

    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      console.error("Image file is undefined");
      form.setError("image", {
        type: "manual",
        message: "Screenshot is required",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/dsa-submission", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/forms");
        toast({
          duration: 2000,
          description: "Successfully submitted!",
        });
        return;
      }

      const responseData = await response.json();

      // Error handling
      if (responseData.errors) {
        form.clearErrors();
        const errors: Record<string, string> = responseData.errors;
        Object.entries(errors).forEach(([field, message]) => {
          form.setError(field as keyof TDsaFormSchema, {
            type: "server",
            message,
          });
        });
      } else {
        toast({
          variant: "destructive",
          duration: 4000,
          description: "Unexpected server response",
        });
        console.error(
          "Unexpected server response"
          //  responseData
        );
      }
    } catch (error) {
      toast({
        variant: "destructive",
        duration: 4000,
        description: "Error submitting form",
      });
      console.error(
        "Error submitting form"
        // error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center mt-10">
        <Card className="md:w-3/4 w-11/12">
          <CardHeader>
            <CardTitle className="text-3xl font-bold ">
              DSA Submission
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="name" autoComplete="true" />
                      </FormControl>
                      <FormDescription>Enter your full name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" autoComplete="true" />
                      </FormControl>
                      <FormDescription>
                        Please use your college's official email address
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="questionNumber"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Question Number</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value?.toString()}
                        {...form.register("questionNumber", {
                          valueAsNumber: true,
                        })}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a question number" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {questionsData.map((question) => (
                            <SelectItem
                              key={question.qNo}
                              value={question.qNo.toString()}
                            >
                              Day {question.id} Question{" "}
                              {question.qNo.toString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Runtime (ms)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register("time", { valueAsNumber: true })}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="memory"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Memory</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register("memory", { valueAsNumber: true })}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Language Used</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={10} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Screenshot</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="file"
                          accept=".jpeg,.png,.jpg"
                          onChange={(e) => handleFileChange(e, field)}
                        />
                      </FormControl>
                      <FormDescription>
                        Make sure the file size is less than 3 MB.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={form.formState.isSubmitting || isLoading}
                  type="submit"
                  className="mt-5"
                >
                  {isLoading ? "Submitting..." : "Submit"}{" "}
                  {isLoading && (
                    <svg
                      aria-hidden="true"
                      className="inline ml-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </>
  );
};

export default DsaSubmission;
