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
import { useState } from "react";


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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Form", values);
        const Number = (courseLessons?.length || 0) + 1;

        try {
            const createdLesson = await createLesson({
                CourseID: courseID as Id<"Courses">,
                Name: values.Name,
                Number,
                Description: values.Description,
                Objective: values.Objectives,
            });

            toast({
                title: "Lesson created",
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

                        

                        <Button type="submit" >Add</Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </>
    )
}