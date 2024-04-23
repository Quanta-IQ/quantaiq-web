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
import { ChangeEvent, use, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleFileUpload, handleFileDelete } from "@/lib/actions/lesson.aws.actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"


const formSchema = z.object({
    Name: z.string().min(3).max(100),
    Description: z.string().min(3).max(1000),
    Objectives: z.string().min(3).max(1000),
    Files: z.any().optional()
});


interface Props {
    lessonID: string;
    courseID: string;
}




export default function EditLesson(
    {lessonID, courseID}: Props

){
    //List of File URLs
    const [files, setFiles] = useState<string[]>([]);


    const lessonInfo = useQuery(api.functions.lessons.getLessonByID, {
        LessonID: lessonID as Id<"Lessons">
    });
    

    const [processingFiles, setProcessingFiles] = useState(false);

    const updateLesson = useMutation(api.functions.lessons.updateLesson);

    console.log(lessonInfo);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            Name: lessonInfo?.Name || "",
            Description:  lessonInfo?.Description || "",
            Objectives: lessonInfo?.Objective || "",
            Files: null
        }
    });

    //useEffect if lessonInfo changes, set files to the content of the lesson
    useEffect(() => {
        setFiles([]);
        if(lessonInfo?.Content){
            
            setFiles(lessonInfo.Content.map((content) => content.url));
        }
    }
    , [lessonInfo]);


    //File Handlers
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
        console.log("Form", values);
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

        try {
            if (!contentArray){
                const result = await updateLesson({
                    LessonID: lessonID ,
                    data: {
                        Name: values.Name,
                        Description: values.Description,
                        Objective: values.Objectives
                    }
                });
            } else {
                const result = await updateLesson({
                    LessonID: lessonID ,
                    data: {
                        Name: values.Name,
                        Description: values.Description,
                        Objective: values.Objectives,
                        Content: contentArray
                    }
                });
            }


            toast({
                title: "Lesson Updated",
                description: `Lesson ${values.Name} has been edited successfully`,
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
                        Edit Lesson
                    </CardTitle>
                    <CardDescription>
                        Edit the lesson 
                    </CardDescription>
                </CardHeader>
                <CardContent>
                {lessonInfo && <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-5 pr-5 pl-5">
                        <FormField
                            control={form.control}
                            name="Name"
                            render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-2 ">
                                <FormLabel >Lesson Name</FormLabel>
                                <FormControl>
                                <Input  {...field}
                                placeholder={lessonInfo.Name}
                                value={field.value || lessonInfo.Name}
                             
                                />
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
                                <Textarea  {...field} 
                                placeholder={lessonInfo.Description}
                                value={field.value || lessonInfo.Description}
                                />
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
                                <Textarea  {...field} 
                                placeholder={lessonInfo.Objective}
                                value={field.value || lessonInfo.Objective}
                                />
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
                                               
                                                <AlertDialog>
                                                <AlertDialogTrigger><Button variant="destructive" className="text-xs h-8" >Delete</Button></AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the file
                                                        and from our servers.
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                    onClick={() => fileDelete(fileUrl)}>Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                                </AlertDialog>

                                            </div>
                                        );
                                    })}
                                    </div>
                                    </ScrollArea>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" >Make Changes</Button>
                    </form>
                </Form>}
                </CardContent>
            </Card>
        </>
    )
}