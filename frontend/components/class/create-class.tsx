"use client";
import React, { useEffect } from "react";
import { useState, ChangeEvent } from "react";
import { z } from "zod"
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


const formSchema = z.object({
    ClassName: z.string().min(2).max(30),
    CourseCode: z.string().min(3),
    CourseDescription: z.string().min(3).max(250),
    Visibility: z.enum(["Public", "Private"]),
    CourseImageURL: z.string().optional(),
});

interface Props {
    user: {
        user_id: string,
    };
}


export default function CreateClassForm({ user }: Props) {
    const createClass = useMutation(api.functions.classes.createClass);
    const [courseCode, setCourseCode] = useState<string>("");
    const courseId = useQuery(api.functions.courses.getCourseByCourseCode, { CourseCode: courseCode });
    const userInfo = useQuery(api.functions.users.getUser, {
        userId: user.user_id
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ClassName: "",
            CourseCode: "",
            CourseDescription: "",
            Visibility: "Public",
            CourseImageURL: "/assets/atomic.png",
        }
    });

    useEffect(() => {
        if (!courseId && courseCode) {
            toast({
                title: "Invalid Course Code",
                description: "No course found with that code.",
                variant: "destructive"
            });
        }
    }, [courseId, courseCode]);
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const newCourseCode = values.CourseCode;
        setCourseCode(newCourseCode);

        if (courseId) {
            try {
                const ClassCode = Math.random().toString(36).substring(2, 8);
                const classCreated = await createClass({
                    CourseID: courseId,
                    CreatorID: userInfo!._id,
                    Name: values.ClassName,
                    Description: values.CourseDescription,
                    Visibility: values.Visibility,
                    ImageURL: values.CourseImageURL,
                    Code: ClassCode
                });
                toast({
                    title: `Class Created`,
                    description: `Class ${values.ClassName} created successfully`,
                    variant: "default"
                });
            } catch (error) {
               
                toast({
                    title: "Uh Oh! Error creating course",
                    variant: "destructive"
                });
            }
        }
    };
    
            return (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-5 pr-5 pl-5">
                            <FormField
                                control={form.control}
                                name="CourseCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course Code</FormLabel>
                                        <Input {...field} />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ClassName"
                                render={({ field }) => (
                                    <FormItem className="flex w-full flex-col gap-2 ">
                                        <FormLabel >Class Name</FormLabel>
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
                                        <FormLabel >Class Description</FormLabel>
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