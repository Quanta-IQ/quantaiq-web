import { Message, UserData } from "@/components/chat/data";
import React, { useRef } from "react";
import Image from "next/image";
import { ChatLayout } from "@/components/chat/chat-layout";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChatLayout defaultLayout={[320, 480]} navCollapsedSize={8} />
    </main>
  );
}
