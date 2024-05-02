import React from "react";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import dynamic from "next/dynamic";
 
const Editor = dynamic(() => import("@/components/text-editor/editor-card"), { ssr: false });

import TestCard from "./test-card";

export default function CreateTestPanel({ courseID }: { courseID: string }) {
    return (
        <div className="relative h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={30} maxSize={70} minSize={0}>
                    <TestCard courseID={courseID} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={70} maxSize={100} minSize={30}>
                    <Editor />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
