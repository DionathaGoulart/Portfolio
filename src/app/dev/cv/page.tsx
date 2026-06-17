import fs from 'fs';
import path from 'path';
import CVViewer from '@/components/shared/CVViewer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CV | Software Engineer - Dionatha Goulart",
  description: "Currículo de Dionatha Goulart focado em Engenharia de Software e Desenvolvimento Fullstack.",
};

import { generatePersonSchema } from '@/lib/schema';

export default function DevCVPage() {
  const filePath = path.join(process.cwd(), 'src/data/cv-dev.md');
  const content = fs.readFileSync(filePath, 'utf8');
  const schema = generatePersonSchema('DEV');

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <Link href="/dev" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
          ← Voltar ao Portfólio
        </Link>
        <button 
          onClick={() => window.print()} 
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg shadow-blue-900/20"
        >
          Baixar PDF
        </button>
      </nav>
      <CVViewer content={content} persona="DEV" />
    </div>
  );
}
