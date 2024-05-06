"use client"; // this registers <Editor> as a Client Component
import React, { useEffect, useRef, useState } from "react";
import { BlockNoteView, Theme, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import { toast } from "../ui/use-toast";
import { useTheme } from "next-themes"
interface EditorProps {
  content: string; 
  format: boolean;
}

function isDeletableContent(content:any) {
  return Array.isArray(content) && content.length > 0;
}

function isValidMessage(message: any) {
  return message && message.trim().length > 0; // Add more conditions as needed
}

export default function Editor({content, format}: EditorProps) {
  //Current theme
  const {theme} = useTheme();

  console.log(theme)
  
  // Creates a new editor instance.
  const editor = useCreateBlockNote();
  const firstRender = useRef(true)
  console.log("Format received in Editor: ", format);


  const multiBlocks = async (messages: string[]) => {
    const deletableBlocks = editor.document.filter(block => block.content !== undefined && isDeletableContent(block.content));
    console.log(deletableBlocks)
    try {
        if (deletableBlocks.length > 0) {
            editor.removeBlocks(deletableBlocks.map(block => block.id));
            console.log('Blocks removed:', deletableBlocks.map(block => block.id));
        } else {
            console.log('No deletable blocks found.');
        }
    } catch (error) {
        toast({
          variant: "destructive",
        title: "Uh-oh we messed up!",
        description: "Multi Block Deletion Error"
      })
        console.error('Error removing blocks:', error);
    }

    try {
      // Iterate over each message in the input list
      for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        // Insert the current message as a block into the editor
        editor.insertBlocks(
          [
            {
              content: message
            },
          ],
          editor.document[index], // Access the corresponding block in the editor's document
          "before"
        );
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh-oh we messed up!",
        description: "Multi Block Insertion Error"
      })
      console.error(error)
    }
  };

  const insertBlock = async (message: string) => {
    try {
      editor.insertBlocks(
        [
          {
            content: message
          },
        ],
        editor.document[0],
        "before"
      )
    }
    catch (error) {
      toast({
        variant: "destructive",
        title: "Uh-oh we messed up!",
        description: "Insertion Error"
      })
      console.error(error)
    }
  }
  const updateBlocks = async (message: string) => {
    try {
      editor.updateBlock(editor.document[0], {
        content: message
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh-oh we messed up!",
        description: "Update Error"
      })
      console.error(error)
    }
  }

  useEffect(() => {
    if(!content) {
      return;
    }

    console.log(format)
    // console.log(editor.document)
    //  experimenting with this, dont remove yet, 
    //  mutli blocks is hard
    if (format) {
      const messages = content.split('\n')
      multiBlocks(messages)
    } else {
      if (firstRender.current) {
        insertBlock(content)
        firstRender.current = false;
      } else {
        updateBlocks(content)
      } 
    }
  }, [content, format, insertBlock, multiBlocks, updateBlocks]);

  return <BlockNoteView editor={editor} theme={theme as Theme}  />;
}