// "use client"
// import "@blocknote/core/fonts/inter.css";
// import "@blocknote/react/style.css";
// import { BlockNoteEditor } from "@blocknote/core";
// import dynamic from "next/dynamic";
// import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useQuery, useMutation } from "convex/react";
// import TestHeader from "./test-header";
// import TestInput from "./test-input";
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"
// import { api } from "@/convex/_generated/api";
// import Markdown from 'react-markdown'
// import {
//     ContextMenu,
//     ContextMenuContent,
//     ContextMenuItem,
//     ContextMenuTrigger,
// } from "@/components/ui/context-menu"

// import { Id } from "@/convex/_generated/dataModel";
// import { Sparkles } from "lucide-react";
// import { toast } from "@/components/ui/use-toast";

// interface CreatorSession {
//     creationId: string;
// }

// export default function TestCreateRender({ creationId }: CreatorSession) {
//     const test = useQuery(api.messages.testcreator.get, { creationId: creationId });
//     const [isScrolled, setScrolled] = useState(false);
//     const listRef = useRef<HTMLDivElement>(null);
//     const editor = useCreateBlockNote();
//     const [editorInitialized, setEditorInitialized] = useState(false);
//     // const Editor = dynamic(() => import("@/components/text-editor/editor-basic"), { ssr: false });
    
//     useEffect(() => {
//         if (isScrolled) {
//             return;
//         }
//         // Using `setTimeout` to make sure scrollTo works on button click in Chrome
//         setTimeout(() => {
//             listRef.current?.scrollTo({
//                 top: listRef.current.scrollHeight,
//                 behavior: "smooth",
//             });
//         }, 5);
//     }, [test?.TestContent, isScrolled]);

//     useEffect(() => {
//         if (test && test.TestContent && !editorInitialized) {
//             handleEditor(test.TestContent);
//             setEditorInitialized(true);
//         }
//     }, [test]);

//     // Update blocks continuously after initial setup
//     useEffect(() => {
//         if (test && test.TestContent && editorInitialized) {
//             updateBlocks(test.TestContent);
//         }
//     }, [test]);
  
//     const handleEditor =  async (message: string) => {
//         try { 
//             editor.insertBlocks(
//                 [
//                   {
//                     content: message
//                   },
//                 ],
//                 editor.document[0],
//                 "before"
//               )
//         }
//         catch (e){
//           toast({
//             title:"Uh-oh we messed up!",
//             description:"Something went wrong please try again"
//           })
//         }
//       }
//     const updateBlocks = async (message: string) => {
//         try {
//             editor.updateBlock(editor.document[0], {
//                 content: message
//             })
//         } catch (e) {}
//     }
//     return (
//         <div className="flex flex-col relative h-full max-w-full ">
//             return <BlockNoteView editor={editor} />;
//             <div
//                 className="flex-grow overflow-scroll gap-2 flex flex-col mx-2 pb-2 rounded-lg"
//                 ref={listRef}
//                 onWheel={() => {
//                     setScrolled(true);
//                 }}
//             >
//                 <div
//                     className="h-5/6 flex flex-col space-y-4 p-3 overflow-y-auto"
//                 >
//                     {test ? (
//                         <div className="space-y-5">
//                             <div className="text-neutral-800 text-sm relative break-words">
//                             <ContextMenu>
//                                     <ContextMenuTrigger>
//                                         <Markdown className="w-full rounded-xl px-3 py-2 whitespace-pre-wrap bg-neutral-100 dark:bg-neutral-900 rounded-tl-none ">
//                                             {test.TestContent}
//                                         </Markdown>
//                                     </ContextMenuTrigger>
//                                     <ContextMenuContent>
//                                         <ContextMenuItem onClick={() => handleEditor(
//                                             test.TestContent
//                                         )}
//                                         > <Sparkles className="h-4 w-4 mr-2" /> Edit Test
//                                         </ContextMenuItem>
//                                     </ContextMenuContent>
//                                 </ContextMenu>
                                
//                             </div>
//                         </div>
//                     ) : (
//                         null
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
