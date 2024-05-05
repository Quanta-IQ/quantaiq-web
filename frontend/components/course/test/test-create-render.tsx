"use client"
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import dynamic from "next/dynamic";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

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
    }, [test, isScrolled]);

    useEffect(() => {
        if (test?.TestContent && !editorInitialized) {
            setContent(test.TestContent);
            setEditorInitialized(true);  // Marks the editor as initialized
        } else if (test?.TestContent && editorInitialized) {
            setContent(test.TestContent);
        }
    }, [test?.TestContent]);

    return (
        <div className="flex flex-col relative h-full max-w-full ">
            <div
                className="flex-grow overflow-scroll gap-2 flex flex-col mx-2 pb-2 rounded-lg"
                ref={listRef}
                onWheel={() => {
                    setScrolled(true);
                }}
            >
                <div
                    className="h-5/6 flex flex-col space-y-4 p-3 overflow-y-auto"
                >
                    <div className="flex justify-end p 2">
                    <Button className="bg-primary hover:bg-secondary text-white font-bold py-1 px-2 rounded"
                        onClick={() => setFormat(true)}>
                        Format Output
                    </Button>
                </div>
                    <Editor content={content} format={format} />
                </div>
            </div>
        </div>
    );
}
