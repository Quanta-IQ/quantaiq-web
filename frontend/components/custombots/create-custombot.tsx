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
import {set, z } from "zod"
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
import {  useQuery, useMutation, useAction } from "convex/react"
import { ChangeEvent, useEffect, useState } from "react";
import { handleFileUpload, handleFileDelete } from "@/lib/actions/lesson.aws.actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import {models, assistantTypes} from "@/constants/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";

const modelStrings = models.map((model) => model.modelString);



const formSchema = z.object({
    Name: z.string().min(3).max(100),
    Instructions: z.string().min(3).max(1000),
    Type: z.string().min(3),
    Model: z.string().min(3),
    LessonSelection: z.array(z.string()).min(1, "Please select at least one lesson.")
});


interface Props {
    courseID: string;
    userID: string;
}






export default function CreateBot(
    {courseID, userID}: Props

){
    const [processState, setProcessState] = useState("Create AI")
    //List of File URLs
    const createBot = useMutation(api.functions.custombots.createCustomBot)
    const courseLessons = useQuery(api.functions.lessons.getLessonsByCourseID, {
        CourseID: courseID as Id<"Courses">
    });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            Name: "",
            Instructions: "",
            Type: "learning-assistant",
            Model: "meta-llama/Llama-3-70b-chat-hf"
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      console.log("Form Values", values)
        const lessonIds = values.LessonSelection.map((lessonId: string) => lessonId as Id<"Lessons">);
        // create test
        try {
            const bot = await createBot({
              CreatorID: userID as Id<"Users">,
              Name: values.Name,
              Type: values.Type,
              Model: values.Model,
              CourseID: courseID as Id<"Courses">,
              Lessons: lessonIds,
              Instructions: values.Instructions,
              Config: "null",
            })
            toast({
                        title: "AI Bot Created!",
                        variant: "default"
                    });
            //form.reset();
            
        } catch (error) {
            console.error("Error fetching data: ", error);
            toast({
                title: "Uh Oh! Error creating assistant",
                variant: "destructive"
            });
            
        }
    }

    return (
        <>
            <div className="h-full w-full">
           
                <CardHeader>
                    <CardTitle>
                        Create AI Bot
                    </CardTitle>
                    <CardDescription>
                        Customize a teaching assistant, learning assistant, or any type of bot to help your learning or teaching.
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
                                <FormLabel >AI Name</FormLabel>
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
                            name="Instructions"
                            render={({ field }) => (
                            <FormItem className="flex flex-col ">
                                <FormLabel >Bot Instructions</FormLabel>
                                <FormControl>
                                <Textarea  {...field} 
                                className="max-h-64"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                       
                       <FormField
                          control={form.control}
                          name="Model"
                          render={({ field }) => (
                          <FormItem>
                          <FormLabel>Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                              <SelectTrigger>
                                  <SelectValue placeholder="Select AI Model" />
                              </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {modelStrings.map((model) => (
                                  <SelectItem key={model} value={model}>
                                    {model}
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
                          name="Type"
                          render={({ field }) => (
                          <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                              <SelectTrigger>
                                  <SelectValue placeholder="Select AI Type" />
                              </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {assistantTypes.map((model) => (
                                  <SelectItem key={model} value={model}>
                                    {model}
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
                                name="LessonSelection"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Lessons</FormLabel>
                                        <ScrollArea className="max-h-25">
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
                                        </ScrollArea>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        <Button type="submit">{processState}</Button>
                    </form>
                </Form>
                </CardContent>
                </div>
        </>
    )
}