import React, { useState, useCallback } from "react";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import dynamic from "next/dynamic";
import TestCard from "./test-card";
import TestCreateRender from "./test-create-render";

export default function CreateTestPanel({ courseID }: { courseID: string }) {
    const [creationID, setCreationID] = useState(crypto.randomUUID());
    console.log("hereID")
    console.log(creationID)
    const handleFormSubmit = useCallback((newCreationID: string) => {
        // new creationID each time form is submitted
        setCreationID((newCreationID));
    }, []);

    return (
        <div className="relative h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={30} maxSize={70} minSize={0}>
                    <TestCard courseID={courseID} creationID={creationID} onFormSubmit={handleFormSubmit} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={70} maxSize={100} minSize={30}>
                    {/* <Editor /> */}
                    <TestCreateRender creationId={creationID}/>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
