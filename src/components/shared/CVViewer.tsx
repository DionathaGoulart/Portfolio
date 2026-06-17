import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CVViewerProps {
  content: string;
  persona: 'DEV' | 'TI';
}

export default function CVViewer({ content, persona }: CVViewerProps) {
  const accentColor = persona === 'DEV' ? 'prose-blue' : 'prose-green';

  return (
    <article className={`prose prose-invert max-w-4xl mx-auto p-8 bg-neutral-900/50 rounded-3xl border border-neutral-800 shadow-2xl ${accentColor}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
