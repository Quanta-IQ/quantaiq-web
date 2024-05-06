"use client"
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import dynamic from "next/dynamic";
import { BlockNoteView, Theme, useCreateBlockNote } from "@blocknote/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes";

interface CreatorSession {
    creationId: string;
}

const Editor = dynamic(() => import("@/components/text-editor/editor"), { ssr: false });

export default function TestCreateRender({ creationId }: CreatorSession) {
    const test = useQuery(api.messages.testcreator.get, { creationId: creationId });
    const [isScrolled, setScrolled] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const [editorInitialized, setEditorInitialized] = useState(false);
    const [content, setContent] = useState("");
    const [format, setFormat] = useState(false);
    const [done, setDone] = useState(false);
    const [progress, setProgress]=useState(5);
    //Current theme
    const {theme} = useTheme();
    const [blockTheme, setblockTheme] = useState("light");

    useEffect(()=>{
        setblockTheme(theme as string)
    }, [theme])

    console.log(theme)
    useEffect(() =>{
        let interval: NodeJS.Timeout | null = null;
        if(!done) {if (test) {
            interval = setInterval(() => {
                setProgress((prevProgress) => prevProgress + 0.5);
            }, 100);
            if(test.TestContent != ""){
                setProgress(100);
                setTimeout(() => {
                    setDone(true);
                }, 500);
            }
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }};
    },[test, done]);
    
    useEffect(() => {
        if (isScrolled) {
            return;
        }
        // Using `setTimeout` to make sure scrollTo works on button click in Chrome
        setTimeout(() => {
            listRef.current?.scrollTo({
                top: listRef.current.scrollHeight,
                behavior: "smooth",
            });
        }, 5);

        

    }, [ isScrolled,editorInitialized]);


    useEffect(() => {
        if(test?.TestContent == ""){
            setContent("Processing Test...")

        }
        if (test?.TestContent && !editorInitialized) {
            setContent(test.TestContent);
            setEditorInitialized(true);  // Marks the editor as initialized
        } 
        else if (test?.TestContent && editorInitialized) {
            setContent(test.TestContent);
        }
    }, [test?.TestContent, editorInitialized]);

    

    return (
        <div className="flex flex-col relative h-full max-w-full ">
            <div
                className="flex-grow  gap-2 flex flex-col mx-2 pb-2 rounded-lg"
                ref={listRef}
                onWheel={() => {
                    setScrolled(true);
                }}
            >
                <div
                    className="h-full w-full flex flex-col space-y-4 p-3 overflow-y-hidden overflow-auto"
                >
                    <div className="flex justify-end p-2 pt-0">
                    <p className="text-2xl font-semibold leading-none tracking-tight m-2 justify-start w-full">Editor</p>
                    
                    
                            
                    
                    <Button className="bg-primary hover:bg-secondary text-white font-bold py-1 px-2 rounded"
                        onClick={() => setFormat(true)}>
                        Edit Test
                    </Button>
                    </div>
                    
                    {test && !done && <Progress value={progress} className="m-3 overflow-auto w-full"  />}
                    <Editor content={content} format={format} theme={blockTheme as Theme} />
                    
                </div>
            </div>
        </div>
    );
}
