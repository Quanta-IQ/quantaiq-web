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
import {z } from "zod"
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
import { toast } from "@/components/ui/use-toast";
import {  useQuery, useMutation } from "convex/react"
import { ChangeEvent, useState } from "react";
import { handleFileUpload, handleFileDelete } from "@/lib/actions/lesson.aws.actions";
import { ScrollArea } from "@/components/ui/scroll-area";


const formSchema = z.object({
    Name: z.string().min(3).max(100),
    Description: z.string().min(3).max(1000),
    Objectives: z.string().min(3).max(1000),
    Files: z.any().optional()
});


interface Props {
    courseID: string;
    courseName: string;
}




export default function CreateLesson(
    {courseID, courseName}: Props

){
    const [processState, setProcessState] = useState<string | null>("Add Lesson");
    const [processingFiles, setProcessingFiles] = useState(false);
    //List of File URLs
    const [files, setFiles] = useState<string[]>([]);
    const createLesson = useMutation(api.functions.lessons.createLesson);
    const courseLessons = useQuery(api.functions.lessons.getLessonsByCourseID, {
        CourseID: courseID as Id<"Courses">
    });

    console.log(courseLessons?.length);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
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


    console.log("Files", files)

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
        const contentArray = files.map((fileUrl) => {
            const url = new URL(fileUrl);
            const pathname = url.pathname;
            const filename = pathname.split('/').pop();
            return {
                label: filename as string,
                url: fileUrl,
            };
        });
        
        console.log("Content Array", contentArray);


        console.log("Form", values);
        const Number = (courseLessons?.length || 0) + 1;

        try {
            if (contentArray){
                const createdLesson = await createLesson({
                    CourseID: courseID as Id<"Courses">,
                    Name: values.Name,
                    Number,
                    Description: values.Description,
                    Objective: values.Objectives,
                    Content: contentArray
                });
            } else{
                const createdLesson = await createLesson({
                    CourseID: courseID as Id<"Courses">,
                    Name: values.Name,
                    Number,
                    Description: values.Description,
                    Objective: values.Objectives,
                });
            }
            

            toast({
                title: "Lesson created",
                description: `Lesson ${values.Name} has been created in ${courseName}`,
                variant: "default"
            });

            form.reset();
            setFiles([]);

        }

        catch (error: any) {
            const regex = /Uncaught Error:\s*(.*)/;
            const matches = error.message.match(regex);
            
            toast({
              title: "Uh Oh! Error creating lesson",
              description: matches ? matches[1] : error.message,
              variant: "destructive"
            })
  
          }
        
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        Create Lesson
                    </CardTitle>
                    <CardDescription>
                        Create a new lesson for course {courseName} 
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit = {form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-5 pr-5 pl-5">
                        <FormField
                            control={form.control}
                            name="Name"
                            render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-2 ">
                                <FormLabel >Lesson Name</FormLabel>
                                <FormControl>
                                <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Description"
                            render={({ field }) => (
                            <FormItem className="flex flex-col ">
                                <FormLabel >Lesson Description</FormLabel>
                                <FormControl>
                                <Textarea  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Objectives"
                            render={({ field }) => (
                            <FormItem className="flex flex-col ">
                                <FormLabel >Lesson Objectives</FormLabel>
                                <FormControl>
                                <Textarea  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
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


                        <Button type="submit" >{processState}</Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </>
    )
}