"use client";
import React from "react";
import { useState, ChangeEvent } from "react";
import {z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react"
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Id } from "@/convex/_generated/dataModel";


const formSchema = z.object({
    CourseName: z.string().min(3).max(30),
    CourseDescription: z.string().min(3).max(250),
    Visibility: z.enum(["Public", "Private"]),
    CourseImageURL: z.string().optional(),
});

interface Props {
    user: {
        user_id: string,
    };
}


export default function CreateCourseForm({ user }: Props) {
    const createCourse = useMutation(api.functions.courses.createCourse);
    const userInfo = useQuery(api.functions.users.getUser, {
        userId: user.user_id
    } );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            CourseName: "",
            CourseDescription: "",
            Visibility: "Public",
            CourseImageURL: "/assets/atomic.png",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Form", values);
        //Add Logic

        try {
            //create 6 string random code
            const CourseCode = Math.random().toString(36).substring(2, 8);
            const courseCreated = await createCourse({
                CreatorID: userInfo!._id,
                CourseName: values.CourseName,
                CourseDescription: values.CourseDescription,
                Visibility: values.Visibility,
                CourseImageURL: values.CourseImageURL,
                CourseCode: CourseCode
            })
            toast({
                title: "Course Created",
                description: `Course ${values.CourseName} created successfully`,
                variant: "default"
            })
        }
        catch (error: any) {
            const regex = /Uncaught Error:\s*(.*)/;
            const matches = error.message.match(regex);
            
            toast({
              title: "Uh Oh! Error creating course",
              description: matches ? matches[1] : error.message,
              variant: "destructive"
            })
  
          }

    };

    return (
        <>
            <Form {...form}>
                <form onSubmit = {form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-5 pr-5 pl-5">
                
                <FormField
                    control={form.control}
                    name="CourseName"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col gap-2 ">
                        <FormLabel >Course Name</FormLabel>
                        <FormControl>
                          <Input  {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="CourseDescription"
                    render={({ field }) => (
                    <FormItem className="flex flex-col ">
                        <FormLabel >Course Description</FormLabel>
                        <FormControl>
                        <Textarea  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="Visibility"
                    render={({ field }) => (
                    <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your visibility" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Public">Public</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                        </SelectContent>
                    </Select>
    
                    <FormMessage />
                    </FormItem>
                    )}
                />

                <Button type="submit" >Submit</Button>
                </form>
            </Form>
        </>
    )

}