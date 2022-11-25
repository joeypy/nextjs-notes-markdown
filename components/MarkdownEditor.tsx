import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export const MarkdownEditor = ({ markdown, setMarkdown }: any) => {
  return (
    <div>
      {/* @ts-ignore */}
      <MDEditor data-color-mode="light" height={600} value={markdown} onChange={setMarkdown} />
    </div>
  );
};
