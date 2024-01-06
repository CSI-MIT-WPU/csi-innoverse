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

const DsaSubmission = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const questionsData = getRecentQuestions();

  const form = useForm<TDsaFormSchema>({
    resolver: zodResolver(DsaFormSchema),
    defaultValues: {
      email: "",
      csiId: 0,
      questionNumber: 0,
      time: 0,
      memory: 0,
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

    const inputElement = document.querySelector(
      "input[name='image']"
    ) as HTMLInputElement | null;
    let imageFile;
    if (inputElement) {
      imageFile = inputElement.files?.[0];
    } else {
      console.error("Input element not found");
    }

    if (imageFile && imageFile.size > 3 * 1024 * 1024) {
      form.setError("image", {
        type: "manual",
        message: "File size must be less than 3 MB.",
      });

      setIsLoading(false); // Stop loading state
      return; // Stop execution if file size is too large
    }

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("csiId", String(data.csiId));
    formData.append("questionNumber", String(data.questionNumber));
    formData.append("time", String(data.time));
    formData.append("memory", String(data.memory));
    formData.append("code", data.code);
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      console.error("Image file is undefined");
      return; // Stop execution if image file is undefined
    }

    try {
      const response = await fetch("/api/dsa-submission", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/");
        toast({
          duration: 2000,
          description: "Successfully submitted!",
        });
        return;
      }

      const responseData = await response.json();

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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" autoComplete="true" />
                      </FormControl>
                      <FormDescription>
                        Enter your official email address
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="csiId"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>CSI Id</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register("csiId", { valueAsNumber: true })}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div className="mt-2 mb-1">
                  <label
                    htmlFor="questionNumber"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Question Number
                  </label>
                  <input
                    id="questionNumber"
                    {...form.register("questionNumber", {
                      valueAsNumber: true,
                    })}
                    list="questionNumbers"
                    name="questionNumber"
                    type="number"
                    placeholder="Select a question number"
                    className={cn(
                      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 mt-2"
                    )}
                  />
                  <datalist id="questionNumbers">
                    <option value="123">123</option>
                    <option value="214">214</option>
                  </datalist>
                </div> */}
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
                              key={question.qNumber}
                              value={question.qNumber.toString()}
                            >
                              Day {question.day} Question{" "}
                              {question.qNumber.toString()}
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
                  {isLoading ? "Submitting..." : "Submit"}
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
