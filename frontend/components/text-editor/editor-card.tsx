"use client";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import "@blocknote/core/fonts/inter.css";
import {
    BasicTextStyleButton,
    BlockNoteView,
    BlockTypeSelect,
    ColorStyleButton,
    CreateLinkButton,
    FormattingToolbar,
    FormattingToolbarController,
    ImageCaptionButton,
    NestBlockButton,
    ReplaceImageButton,
    TextAlignButton,
    UnnestBlockButton,
    useCreateBlockNote,
    DefaultReactSuggestionItem,
    getDefaultReactSlashMenuItems,
    SuggestionMenuController,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import {
    BlockNoteEditor,
    filterSuggestionItems,
    PartialBlock,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { Button } from "../ui/button";

// import { BlueButton } from "./BlueButton";


export default function App() {

// Custom Slash Menu item to insert a block after the current one.
const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
    title: "Insert Hello World",
    onItemClick: () => {
        // Block that the text cursor is currently in.
        const currentBlock = editor.getTextCursorPosition().block;

        // New block we want to insert.
        const helloWorldBlock: PartialBlock = {
            type: "paragraph",
            content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
        };

        // Inserting the new block after the current one.
        editor.insertBlocks([helloWorldBlock], currentBlock, "after");
    },
    aliases: ["helloworld", "hw"],
    group: "Other",
    icon: <HiOutlineGlobeAlt size={18} />,
    subtext: "Used to insert a block with 'Hello World' below.",
});

    // List containing all default Slash Menu Items, as well as our custom one.
    const getCustomSlashMenuItems = (
        editor: BlockNoteEditor
    ): DefaultReactSuggestionItem[] => [
            ...getDefaultReactSlashMenuItems(editor),
            insertHelloWorldItem(editor),
        ];


    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        initialContent: [
            {
                type: "paragraph",
                content: "I will dislay test here in the future",
            },
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "Placeholder ",
                        styles: {},
                    },
                    // {
                    //     type: "text",
                    //     text: "blue",
                    //     styles: { textColor: "blue", backgroundColor: "blue" },
                    // },
                    {
                        type: "text",
                        text: " Placeholder ",
                        styles: {},
                    },
                    {
                        type: "text",
                        text: "Placeholder",
                        styles: { code: true },
                    },
                    {
                        type: "text",
                        text: " Placeholder",
                        styles: {},
                    },
                ],
            },
            {
                type: "paragraph",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam urna sapien, vestibulum et lacus vel, varius pharetra risus. Pellentesque fermentum dui et est consequat, et condimentum orci mattis. Sed laoreet dapibus risus at fringilla. Etiam dignissim leo vitae lorem rhoncus porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus at mattis ligula. Sed hendrerit vestibulum quam non tincidunt. Etiam lobortis nulla ut eleifend vehicula. Pellentesque rutrum feugiat nibh, vitae sagittis lacus feugiat eget. Maecenas auctor risus dolor, in luctus turpis finibus eu. Sed a ipsum sit amet erat pretium suscipit ac ac lectus. Vivamus aliquam quam vel enim pulvinar, et scelerisque nunc porttitor. Nullam tincidunt sodales tortor non maximus. Donec pulvinar libero et nisl pretium fringilla. Aenean ut metus ante.",
            },
            {
                type: "paragraph",
            },
        ],
    });

    return (
        <BlockNoteView editor={editor} formattingToolbar={false} slashMenu={false}>

            <SuggestionMenuController
                triggerCharacter={"/"}
                // Replaces the default Slash Menu items with our custom ones.
                getItems={async (query) =>
                    filterSuggestionItems(getCustomSlashMenuItems(editor), query)
                }
            />

            <FormattingToolbarController
                formattingToolbar={() => (
                    <FormattingToolbar>
                        <BlockTypeSelect key={"blockTypeSelect"} />

                        {/* Extra button to toggle blue text & background
            <BlueButton key={"customButton"} /> */}

                        <ImageCaptionButton key={"imageCaptionButton"} />
                        <ReplaceImageButton key={"replaceImageButton"} />

                        <BasicTextStyleButton
                            basicTextStyle={"bold"}
                            key={"boldStyleButton"}
                        />
                        <BasicTextStyleButton
                            basicTextStyle={"italic"}
                            key={"italicStyleButton"}
                        />
                        <BasicTextStyleButton
                            basicTextStyle={"underline"}
                            key={"underlineStyleButton"}
                        />
                        <BasicTextStyleButton
                            basicTextStyle={"strike"}
                            key={"strikeStyleButton"}
                        />
                        
                        <BasicTextStyleButton
                            key={"codeStyleButton"}
                            basicTextStyle={"code"}
                        />

                        <TextAlignButton
                            textAlignment={"left"}
                            key={"textAlignLeftButton"}
                        />
                        <TextAlignButton
                            textAlignment={"center"}
                            key={"textAlignCenterButton"}
                        />
                        <TextAlignButton
                            textAlignment={"right"}
                            key={"textAlignRightButton"}
                        />

                        <ColorStyleButton key={"colorStyleButton"} />

                        <NestBlockButton key={"nestBlockButton"} />
                        <UnnestBlockButton key={"unnestBlockButton"} />

                        <Button className="ml-2 h-6 ">
                            Generate AI
                        </Button>

                        {/* <CreateLinkButton /> */}
                    </FormattingToolbar>
                )}
            />
        </BlockNoteView>
    );
}

