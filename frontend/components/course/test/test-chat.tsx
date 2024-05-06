"use client"
import React, {useEffect,useMemo,useRef,useState} from "react";
import {useQuery, useMutation} from "convex/react";
import TestHeader from "./test-header";
import TestInput from "./test-input";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator"
import { api } from "@/convex/_generated/api";
import Markdown from 'react-markdown'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Id } from "@/convex/_generated/dataModel";
import TestChoice from "./test-choices";
interface TestSession {
    testID: Id<"Tests">| null;
    sessionID: string;
}

export default function TestChat({ testID, sessionID }: TestSession) {
    const remoteMessages = useQuery(api.messages.interviewer.list, { sessionId: sessionID });
    const testInfo = useQuery(api.functions.tests.getTestByTestID, {TestID: testID || undefined});

    const firstMessage = `Hey there! I will administer ${testInfo?.Metadata.TestName}. Click next or let me know when you are ready!`;
    const [showOnlyLastComputerMessage, setShowOnlyLastComputerMessage] = useState(true);

    const [isScrolled, setScrolled] = useState(false);

    const messages = useMemo(
        () =>
          [{ IsViewer: false, Text: firstMessage, _id: "0" }].concat(
            (remoteMessages ?? []) as {
              IsViewer: boolean;
              Text: string;
              _id: string;
            }[]
          ),
        [remoteMessages, firstMessage]
      );
    const listRef = useRef<HTMLDivElement>(null);
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
        }, 0);
      }, [messages, isScrolled]);

      const lastComputerMessage = useMemo(() => {
        return messages.slice().reverse().find(message => !message.IsViewer);
    }, [messages]);

      const toggleView = () => {
        setShowOnlyLastComputerMessage(!showOnlyLastComputerMessage);
    };

    return (
      <div className="flex flex-col relative h-full max-w-full">
          <TestHeader />

          <div className="h-5/6 flex flex-col space-y-4 p-3 overflow-y-auto"
              ref={listRef}
              onWheel={() => setScrolled(true)}
          >
              {remoteMessages === undefined ? (
                  <>
                      <div className="animate-pulse rounded-md bg-black/10 h-5" />
                      <div className="animate-pulse rounded-md bg-black/10 h-9" />
                  </>
              ) : (
                  (showOnlyLastComputerMessage && lastComputerMessage ? [lastComputerMessage] : messages).map((message) => (
                      <div className="space-y-5 w-full" key={message._id}>
                          <div className={`text-neutral-400 text-sm relative break-words ${message.IsViewer ? "text-right" : ""}`}>
                              {message.IsViewer ? "Me" : "Quanta"}
                          </div>
                          {message.Text === "" ? (
                              <div className="animate-pulse rounded-md bg-black/10 h-9" />
                          ) : (
                            <div className={`w-full max-w-full overflow-hidden rounded-xl px-3 py-2 whitespace-pre-wrap ${message.IsViewer ? "bg-neutral-200 dark:bg-neutral-800 rounded-tr-none" : "bg-neutral-100 dark:bg-neutral-900 rounded-tl-none"}`}>
                            <Markdown className="w-full rounded-xl px-3 py-2 whitespace-pre-wrap">{message.Text}</Markdown>
                              </div>
                          )}
                      </div>
                  ))
              )}
          </div>

          <Separator />

          <div className="relative w-full box-border flex-col pt-2.5 p-5 space-y-2">
              <TestChoice type="interview" sessionID={sessionID} testID={testID} />
              <button onClick={toggleView} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary">Short Answer Mode</button>
          </div>
      </div>
  );
}