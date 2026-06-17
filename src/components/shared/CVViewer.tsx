import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CVViewerProps {
  content: string;
  persona: 'DEV' | 'TI';
}

export default function CVViewer({ content, persona }: CVViewerProps) {
  const isDev = persona === 'DEV';

  return (
    <article className={`
      prose dark:prose-invert max-w-4xl mx-auto p-6 md:p-12
      prose-headings:text-accent prose-a:text-accent prose-strong:text-foreground
      prose-p:text-foreground/90 prose-li:text-foreground/90
      ${isDev 
        ? 'retro-border bg-card/50 retro-shadow-sm' 
        : 'border border-accent/20 bg-accent/5 rounded-lg'}
    `}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
