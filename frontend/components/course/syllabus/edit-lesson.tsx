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


const formSchema = z.object({
    Name: z.string().min(3).max(100),
    Description: z.string().min(3).max(1000),
    Objectives: z.string().min(3).max(1000),
});


interface Props {
    lessonID: string;
}




export default function EditLesson(
    {lessonID}: Props

){
    const lessonInfo = useQuery(api.functions.lessons.getLessonByID, {
        LessonID: lessonID as Id<"Lessons">
    });

    const updateLesson = useMutation(api.functions.lessons.updateLesson);

    console.log(lessonInfo);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            Name: lessonInfo?.Name || "",
            Description:  lessonInfo?.Description || "",
            Objectives: lessonInfo?.Objective || "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Form", values);
        
        try {
           
            const result = await updateLesson({
                LessonID: lessonID ,
                data: {
                    Name: values.Name,
                    Description: values.Description,
                    Objective: values.Objectives
                }
            });


            toast({
                title: "Lesson Updated",
                description: `Lesson ${values.Name} has been created`,
                variant: "default"
            });

            form.reset();

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

                        

                        <Button type="submit" >Make Changes</Button>
                    </form>
                </Form>}
                </CardContent>
            </Card>
        </>
    )
}