'use client';

import { useAppearance } from '@/hooks/use-appearance';
import {
    AdmonitionDirectiveDescriptor,
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    codeBlockPlugin,
    codeMirrorPlugin,
    CodeToggle,
    diffSourcePlugin,
    directivesPlugin,
    frontmatterPlugin,
    headingsPlugin,
    imagePlugin,
    InsertCodeBlock,
    InsertTable,
    InsertThematicBreak,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    ListsToggle,
    markdownShortcutPlugin,
    MDXEditor,
    MDXEditorMethods,
    MDXEditorProps,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { ForwardedRef } from 'react';

const allPlugins = (diffMarkdown: string) => [
    toolbarPlugin({
        toolbarContents: () => (
            <>
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <InsertCodeBlock />
                <InsertThematicBreak />
                <InsertTable />
                <ListsToggle />
                <UndoRedo />
            </>
        ),
    }),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({ imageUploadHandler: async () => '/sample-image.png' }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
    codeMirrorPlugin({
        codeBlockLanguages: {
            js: 'JavaScript',
            css: 'CSS',
            txt: 'text',
            tsx: 'TypeScript',
        },
    }),
    directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
    diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown }),
    markdownShortcutPlugin(),
];

export default function TextEditor({
    markdown,
    editorRef,
    ...props
}: {
    markdown: string;
    editorRef: ForwardedRef<MDXEditorMethods> | null;
} & MDXEditorProps) {
    const { appearance } = useAppearance();
    return (
        <MDXEditor
            ref={editorRef}
            markdown={markdown}
            {...props}
            className={`prose max-w-full font-sans ${appearance === 'dark' || appearance === 'system' ? 'dark-theme mdxeditor' : 'mdxeditor'}`}
            contentEditableClassName="prose max-w-full font-sans"
            plugins={allPlugins(markdown)}
        />
    );
}
