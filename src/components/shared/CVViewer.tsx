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
        : 'border border-accent/20 bg-accent/5 relative overflow-hidden'}
    `}>
      {!isDev && (
        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[10px] select-none uppercase pointer-events-none hidden md:block">
          DOCUMENT_TYPE: SYSTEM_MANIFEST<br />
          VERSION: 1.0.4<br />
          SECURITY: LEVEL_4
        </div>
      )}
      <div className={!isDev ? 'terminal-glow' : ''}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
