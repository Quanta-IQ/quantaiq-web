import React, { useRef, useState } from "react";
import { z } from 'zod';
import {
    FileImage,
    Mic,
    Paperclip,
    PlusCircle,
    SendHorizontal,
    Smile,
    ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Message, loggedInUserData } from "./data";
import { Textarea } from "@/components/ui/textarea";
// import { EmojiPicker } from "./emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ApiResponseSchema } from "@/schemas/completion-schemas";

type ApiResponseType = z.infer<typeof ApiResponseSchema>

interface ChatBottombarProps {
    sendMessage: (newMessage: Message) => void;
    isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({ sendMessage, isMobile }: ChatBottombarProps) {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const handleThumbsUp = () => {
        const newMessage: Message = {
            id: message.length + 1,
            name: loggedInUserData.name,
            avatar: loggedInUserData.avatar,
            message: "👍",
        };
        sendMessage(newMessage);
        setMessage("");
    };

    const sendToAPI = async (message: string): Promise<ApiResponseType> => {
        try {
            const response = await fetch('/api/anyscale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: message }),
            });
            const data: ApiResponseType = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to send message:', error);
            throw new Error('API call failed');
        }
    };


    const handleSend = async () => {
        if (message.trim()) {
            try {
                const newMessage: Message = {
                    id: message.length + 1,
                    name: loggedInUserData.name,
                    avatar: loggedInUserData.avatar,
                    message: message.trim(),
                };
                sendMessage(newMessage);
                setMessage("");

                const chatResponse = await sendToAPI(message.trim()); // Send the message to the API and capture
                console.log("API Response:", JSON.stringify(chatResponse, null, 2));
                // Create a new message from the API response
                if (chatResponse) {
                    const apiResponse = chatResponse.response.choices[0].message.content || "No response from API";
                    const responseMessage: Message = {
                        id: chatResponse.response.created,  
                        name: "Test Name", 
                        avatar: "/apiAvatar.png", 
                        message: apiResponse,
                    };
                    sendMessage(responseMessage); 
                }
                

                if (inputRef.current) {
                    inputRef.current.focus();
                }
            } catch (error) {
                console.error('Error handling send:', error)
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }

        if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault();
            setMessage((prev) => prev + "\n");
        }
    };

    return (
        <div className="p-2 flex justify-between w-full items-center gap-2">
            <div className="flex">
                <Popover>
                    <PopoverTrigger asChild>
                        <Link
                            href="#"
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "h-9 w-9",
                                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                            )}
                        >
                            <PlusCircle size={20} className="text-muted-foreground" />
                        </Link>
                    </PopoverTrigger>
                    <PopoverContent
                        side="top"
                        className="w-full p-2">
                        {message.trim() || isMobile ? (
                            <div className="flex gap-2">
                                <Link
                                    href="#"
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "icon" }),
                                        "h-9 w-9",
                                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                    )}
                                >
                                    <Mic size={20} className="text-muted-foreground" />
                                </Link>
                                {BottombarIcons.map((icon, index) => (
                                    <Link
                                        key={index}
                                        href="#"
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                            "h-9 w-9",
                                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                        )}
                                    >
                                        <icon.icon size={20} className="text-muted-foreground" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <Link
                                href="#"
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                    "h-9 w-9",
                                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                )}
                            >
                                <Mic size={20} className="text-muted-foreground" />
                            </Link>
                        )}
                    </PopoverContent>
                </Popover>
                {!message.trim() && !isMobile && (
                    <div className="flex">
                        {BottombarIcons.map((icon, index) => (
                            <Link
                                key={index}
                                href="#"
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                    "h-9 w-9",
                                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                )}
                            >
                                <icon.icon size={20} className="text-muted-foreground" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence initial={false}>
                <motion.div
                    key="input"
                    className="w-full relative"
                    layout
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{
                        opacity: { duration: 0.05 },
                        layout: {
                            type: "spring",
                            bounce: 0.15,
                        },
                    }}
                >
                    <Textarea
                        autoComplete="off"
                        value={message}
                        ref={inputRef}
                        onKeyDown={handleKeyPress}
                        onChange={handleInputChange}
                        name="message"
                        placeholder="Aa"
                        className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
                    ></Textarea>
                    {/* <div className="absolute right-2 bottom-0.5  ">
                        <EmojiPicker onChange={(value) => {
                            setMessage(message + value)
                            if (inputRef.current) {
                                inputRef.current.focus();
                            }
                        }} />
                    </div> */}
                </motion.div>

                {message.trim() ? (
                    <Link
                        href="#"
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "h-9 w-9",
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
                        )}
                        onClick={handleSend}
                    >
                        <SendHorizontal size={20} className="text-muted-foreground" />
                    </Link>
                ) : (
                    <Link
                        href="#"
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "h-9 w-9",
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
                        )}
                        onClick={handleThumbsUp}
                    >
                        <ThumbsUp size={20} className="text-muted-foreground" />
                    </Link>
                )}
            </AnimatePresence>
        </div>
    );
}
