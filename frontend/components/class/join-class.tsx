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
import { ConvexError } from "convex/values";


const formSchema = z.object({
    ClassCode: z.string().min(3),
});

interface Props {
    user: {
        user_id: string,
    };
}


export default function JoinClassForm({ user }: Props) {
    const [classCode, setClassCode] = useState<string>("");
    const joinClass = useMutation(api.functions.classes.addStudentToClass)
    const classId = useQuery(api.functions.classes.getClassByClassCode, { ClassCode: classCode });
    //TODO FIX THIS
    //AGAIN THIS IS REDUNDANT YOU COULD HAVE JUST USED THE RIGHT HOOKS FROM THE HOC
    const userInfo = useQuery(api.functions.users.getUser, {
        userId: user.user_id
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ClassCode: "",
        }
    });

    useEffect(() => {
        if (!classId && classCode) {
            toast({
                title: "Invalid Class Code",
                description: "No class found with that code.",
                variant: "destructive"
            });
        }
    }, [classId, classCode]); 

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const newClassCode = values.ClassCode;
        setClassCode(newClassCode); 
        
        if (classId) {
            try {
               const student = await joinClass({UserID: userInfo!._id, ClassID: classId})
                if(student){
                toast({
                    title: `Success!`,
                    description: `Class joined successfully`,
                    variant: "default"
                })};
            } catch (error) {
                if (error instanceof ConvexError) {
                    // Access data and extract the message
                    const errorMessage = (error.data as { message: string }).message
                    // ...display the error message on the frontend
                    toast({
                        title: "Uh Oh! Error joining the class",
                        description: error.data,
                        variant: "destructive"
                    });
                  }
                  else{
                    toast({
                        title: "Uh Oh! Error joining the class",
                        description: "Please Try Again",
                        variant: "destructive"
                    });
                  }
                
            }
        }
    };
    
            return (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-5 pr-5 pl-5">
                            <FormField
                                control={form.control}
                                name="ClassCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Class Code</FormLabel>
                                        <Input {...field} />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" >Submit</Button>
                        </form>
                    </Form>
                </>
            )

        }