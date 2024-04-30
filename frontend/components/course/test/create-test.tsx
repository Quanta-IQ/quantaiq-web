"use client"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useAction } from "convex/react"
import { ChangeEvent, useEffect, useState } from "react";
import { handleFileUpload, handleFileDelete } from "@/lib/actions/lesson.aws.actions";
import { ScrollArea } from "@/components/ui/scroll-area";



const formSchema = z.object({
    Name: z.string().min(3).max(100),
    LessonSelection: z.array(z.string()).min(1, "Please select at least one lesson."),
    Description: z.string().min(3).max(1000),
    Objectives: z.string().min(3).max(1000),
    Files: z.any().optional()
});

// Specify the type for the form data based on the schema
interface FormData {
    Name: string;
    Description: string;
    Objectives: string;
    Files: any;  // Specify a more precise type if possible
    LessonSelection: string[];
}

interface Props {
    courseID: string;
    courseName: string;
    user: {
        user_id: string,
    };
}

export default function CreateTest(
    { courseID, courseName, user}: Props

) {
    const [processState, setProcessState] = useState<string | null>("Create Test");
    const [autoFillState, setAutoFillState] = useState<string | null>("AI AutoFill");
    const [prompt, setPrompt] = useState<string>("");

    const [processingFiles, setProcessingFiles] = useState(false);
    //List of File URLs
    const [files, setFiles] = useState<string[]>([]);
    const createTest = useMutation(api.functions.tests.createTest)
    const courseLessons = useQuery(api.functions.lessons.getLessonsByCourseID, {
        CourseID: courseID as Id<"Courses">
    });

    const createDocument = useMutation(api.functions.lessons.createDocument);
    const userInfo = useQuery(api.functions.users.getUser, {
        userId: user.user_id
    } );
    //Added handling for ai convex
    const anyscaleOneshot = useAction(api.ai.anyscale.CompletionOneshot);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Name: "",
            Description: "",
            Objectives: "",
            Files: null
        }
    });

    //File Handling
    const handleFile = async (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        setProcessingFiles(true);
        const reader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (!((file.type.includes("image") && file.type !== "image/svg+xml") ||
                file.type.includes("pdf") ||
                file.type.includes("text/plain"))) {
                alert("Invalid file. Please select an image, PDF, or text file.");
                return;
            }
            //TODO: Add Logic Upload to S3
            reader.onload = async (event) => {
                const dataFile = event.target?.result?.toString() || "";

                try {
                    const uploadedFile = await handleFileUpload(file.name, dataFile, courseID, "dump", file.type);
                    console.log("Uploaded File", uploadedFile);
                    // Add to Files Array
                    setFiles([...files, uploadedFile!.toString()]);
                } catch (error) {
                    console.error(error);
                }
            };

            reader.readAsDataURL(file);


        }
        setProcessingFiles(false);
    };


    //Handle File Delete
    const fileDelete = (fileUrl: string) => {
        const newFiles = files.filter((file) => file !== fileUrl);
        setFiles(newFiles);

        try {
            handleFileDelete(fileUrl);
            toast({
                title: "Deleted File",
                description: `File has been deleted`,
                variant: "default"
            });
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //TODO: Add File Logic
        //Process files into Content Array
        const contentArray = await Promise.all(files.map(async (fileUrl) => {
            const url = new URL(fileUrl);
            const pathname = url.pathname;
            const filename = pathname.split('/').pop();
            try {
                const doc = await createDocument({
                    Label: filename as string,
                    URL: fileUrl,
                    Course: courseID as Id<"Courses">
                }) as Id<"Documents">;
                return doc
            } catch (error) {
                console.error(error);
            }
        }));


        console.log("Form", values);
        const Number = (courseLessons?.length || 0) + 1;

        try {
            if (contentArray) {
                console.log(contentArray);
                const filteredContentArray = contentArray.filter((content) => content !== undefined) as Id<"Documents">[];
                const metadata = {
                    Lessons: values.LessonSelection, 
                    Description: values.Description,
                    Objectives: values.Objectives,
                    Documents: filteredContentArray
                };
                const createdTest = await createTest({
                    CreatorID: userInfo!._id,
                    TestContent: "placeholder", //v.string(), // make ai call
                    Metadata: metadata
                });
            } else {
                const metadata = {
                    Lessons: values.LessonSelection, 
                    Description: values.Description,
                    Objectives: values.Objectives,
                };
                const createdTest = await createTest({
                    CreatorID: userInfo!._id,
                    TestContent: "placeholder", // v.string(), // make ai call
                    Metadata: metadata
                });
            }

            toast({
                title: "Test created",
                description: `Finish test creation with the Test Bot!`,
                variant: "default"
            });

            form.reset();
            setFiles([]);
            setPrompt("");

        }

        catch (error: any) {
            const regex = /Uncaught Error:\s*(.*)/;
            const matches = error.message.match(regex);

            toast({
                title: "Uh Oh! Error creating test",
                description: matches ? matches[1] : error.message,
                variant: "destructive"
            })

        }

    };

    useEffect(() => {
        if (form.getValues().Name && form.getValues().Description) {
            setPrompt(`
        [INSTRUCTIONS] Output should only be the numbered list of lesson objectives [CONTEXT]Create a list of lesson objectives bullet format. COURSE: ${courseName}; LESSONNAME: ${form.getValues().Name} LESSONDESCRIPTION: ${form.getValues().Description}[END CONTEXT]`);
        }
    }, [form.getValues()]);



    const handleAutoFill = async () => {
        setAutoFillState("AI processing...")
        // TODO: Implement AI AutoFill logic here
        console.log("AutoFill")

        //change this prompting for test creation 
        try {
            const content = await anyscaleOneshot({
                system_prompt: "Complete the Task",
                user_prompt: prompt
            });


            // Set the content to the Objectives field
            if (content) {
                form.setValue('Objectives', content)
            };

            //Toast
            toast({
                title: "AI AutoFill",
                description: `AI has filled in the objectives`,
                variant: "default"
            });

            setAutoFillState("AI AutoFill")

        } catch (error) {
            console.error("Error fetching data: ", error);
            // Handle fetch errors (network issues, server errors, etc.)
        }

    };

    return (
        <>
            <Card className="w-full ml-1">
                <CardHeader>
                    <CardTitle>
                        Create Test
                    </CardTitle>
                    <CardDescription>
                        Create a new test for course {courseName}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="flex flex-col justify-start gap-5 " onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="Name"
                                render={({ field }) => (
                                    <FormItem className="flex w-full flex-col gap-2 ">
                                        <FormLabel >Test Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="LessonSelection"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Lessons</FormLabel>
                                        <div className="max-h-25 overflow-auto">
                                            {courseLessons?.map(lesson => (
                                                <div key={lesson._id} className="flex items-center space-x-2 py-2">
                                                    <Checkbox
                                                        checked={field.value?.includes(lesson._id) || false}
                                                        onCheckedChange={(checked: boolean) => {
                                                            const newList = checked
                                                                ? [...(field.value || []), lesson._id]
                                                                : field.value?.filter((id: string) => id !== lesson._id) || [];
                                                            field.onChange(newList);
                                                        }}
                                                    />
                                                    <label>{lesson.Number} - {lesson.Name}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="Description"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col ">
                                        <FormLabel >Test Description</FormLabel>
                                        <FormControl>
                                            <Textarea  {...field}
                                                className="max-h-20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="Objectives"
                                render={({ field }) => (
                                    <>

                                        <FormItem className="flex flex-col ">
                                            <div className="w-full mb-4">
                                                <FormLabel >Test Objectives</FormLabel>
                                                {prompt &&
                                                    <span className="p-2 h-8 text-xs ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground" onClick={handleAutoFill}>
                                                        {autoFillState}
                                                    </span>
                                                }
                                            </div>
                                            <FormControl>
                                                <Textarea  {...field}
                                                    className="max-h-24" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>

                                )}
                            />

                            <FormField
                                control={form.control}
                                name="Files"
                                render={({ field }) => (
                                    <FormItem className="flex w-full flex-col gap-3">
                                        <FormLabel className="text-base-semibold text-light-2">
                                            Attach Files
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                className="placeholder-slight"
                                                type="file"
                                                accept="image/*, .pdf"
                                                onChange={(e) => handleFile(e)}
                                                disabled={processingFiles}
                                            />

                                        </FormControl>

                                        <FormLabel className="text-base-semibold text-light-2">
                                            Current Files
                                        </FormLabel>
                                        <ScrollArea className="h-20 w-full ">

                                            <div className="flex flex-col gap-3">


                                                {files?.map((fileUrl) => {
                                                    const url = new URL(fileUrl);
                                                    const pathname = url.pathname;
                                                    const filename = pathname.split('/').pop();

                                                    return (
                                                        <div key={fileUrl} className="flex flex-row justify-between">
                                                            <span className="text-sm text-gray-400 mt-2">{filename}</span>
                                                            <Button variant="destructive" className="text-xs h-8" onClick={() => fileDelete(fileUrl)}>
                                                                Remove
                                                            </Button>




                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </ScrollArea>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <Button type="submit">{processState}</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}