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
import { Router } from "next/router";
import useUserConvexData from "@/hooks/useUserConvexData";




interface Props {
    user: {
        user_id: string,
    };
}
const formSchema = z.object({
    ClassName: z.string().min(3).max(30),
    ClassDescription: z.string().min(3).max(250),
    Visibility: z.enum(["Public", "Private"]),
    CourseImageURL: z.string().optional(),
    CourseID:z.string()
});

export default function CreateClassForm({ user }: Props) {
    const createClass = useMutation(api.functions.classes.createClass);
    
    //creted by user for now
    const courseOptions = useQuery(api.functions.courses.getCoursesCreatedByUser, { UserID: user.user_id as Id<"Users">});

    console.log(courseOptions);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            ClassName: "",
            ClassDescription: "",
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
            const courseCreated = await createClass({
                CourseID: values.CourseID as Id<"Courses">,
                Name: values.ClassName,
                Description: values.ClassDescription,
                Visibility: values.Visibility,                
                Code: CourseCode,
                ImageURL: values.CourseImageURL,
                Creator: user.user_id as Id<"Users">,
            })
            toast({
                title: `${values.ClassName} Created`,
                description: `Course ${values.ClassName} created successfully`,
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
                    name="ClassName"
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
                    name="ClassDescription"
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
                        name="CourseID"
                        render={({ field }) => (<FormItem>
                            <FormLabel>Course</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Courset" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                  <SelectItem value="none" key="none">None</SelectItem>
                                {
                                
                                courseOptions?.map((option) => (
                                    <SelectItem key={option._id} value={option._id}>
                                    {option.CourseName}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>)}
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