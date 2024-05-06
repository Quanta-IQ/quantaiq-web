import React, { useState, ChangeEvent } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Send, Trash, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from '@/convex/_generated/api';

interface TestInputProps {
    type: string;
    sessionID: string | null;
    testID: string | null;
}

export default function TestChoice(props: TestInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [remoteValue, setRemoteValue] = useState("");
    const sendMessage = useMutation(api.messages.interviewer.send);
    const clearThread = useMutation(api.messages.interviewer.clear);

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleSend = async () => {
        if (inputValue.trim() && props.sessionID != null && props.testID != null){
            await sendMessage({
                message: inputValue,
                sessionId: props.sessionID,
                testId: props.testID
            });
            setInputValue("");
        }
    };
    
    const handleClear = async () => {
        if (props.sessionID != null){
            await clearThread({
                sessionId: props.sessionID
            });
        }
    };

    const handleChoiceSelect = async (choice: string) => {
        setRemoteValue(choice);
        await handleRemoteSend();
        console.log(`Selected choice: ${choice}`);
    };

    const handleNext = async () => {
        setRemoteValue("go to the next question");
        await handleRemoteSend();
        console.log("Proceeding to next question");
    };

    const handleBack = async () => {
        setRemoteValue("go to the previous question");
        await handleRemoteSend();
        console.log("Proceeding to previous question");
    };

    const handleEnd = async () => {
        setRemoteValue("end the test. i am done. finish");
        await handleRemoteSend();
        console.log("Proceeding to previous question");
    };

    const handleRemoteSend = async () => {
        if (remoteValue.trim() && props.sessionID != null && props.testID != null){
            await sendMessage({
                message: remoteValue,
                sessionId: props.sessionID,
                testId: props.testID
            });
            setRemoteValue("");
        }
    };

    return (
        <>
            <div className="grid w-full gap-2 mb-2">
            <div className="flex flex-row gap-3 justify-center">
                    <Button onClick={handleBack}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                    </Button>
                    {['A', 'B', 'C', 'D'].map((choice) => (
                        <Button 
                            key={choice}
                            className="rounded-full w-10 h-10 flex items-center justify-center border border-gray-300"
                            onClick={() => handleChoiceSelect(choice)}
                        >
                            {choice}
                        </Button>
                    ))}
                    <Button onClick={handleNext}>
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Next
                    </Button>
                </div>
                <Textarea
                    className="ring-inset focus-visible:ring-offset-0 pr-28 md:pr-40 min-h-[56px] max-h-60"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <div className="flex flex-row gap-3 justify-end"> 
                    <Button onClick={handleSend}>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                    </Button>
                    <Button onClick={handleEnd}>
                        {/* <Trash className="h-4 w-4 mr-2" /> */}
                        End Test
                    </Button>
                </div>
                
            </div>
        </>
    );
}
