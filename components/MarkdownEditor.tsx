import { useCallback, useEffect } from 'react';
import { ActionIcon } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
// Extensions tiptop
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// Code extension
import { lowlight } from 'lowlight';
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript';
// Icons
import { IconPhoto, IconPrinter } from '@tabler/icons';

// register languages that your are planning to use
lowlight.registerLanguage('ts', tsLanguageSyntax);

interface IProps {
  value: string;
  getMarkdown: (value: string) => void;
}

export const MarkdownEditor = ({ value, getMarkdown }: IProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: 'Escribe aquí tu nuevo post.',
        showOnlyWhenEditable: false,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: value ?? '<h1>Text h1</h1>',
    onUpdate({ editor }) {
      getMarkdown(editor.getHTML());
    },
  });

  useEffect(() => {
    editor?.setOptions({ content: value });
    console.log(value);
  }, []);

  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor!.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
          <RichTextEditor.CodeBlock />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
          <RichTextEditor.H5 />
          <RichTextEditor.H6 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <ActionIcon onClick={addImage} variant="default">
            <IconPhoto size={18} stroke="currentColor" />
          </ActionIcon>
          {/* <ActionIcon variant="default">
            <IconPrinter size={18} stroke="currentColor" />
          </ActionIcon> */}
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};
