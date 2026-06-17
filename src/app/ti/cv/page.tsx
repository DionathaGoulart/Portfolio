import fs from 'fs';
import path from 'path';
import CVViewer from '@/components/shared/CVViewer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CV | IT Operations Specialist - Dionatha Goulart",
  description: "Currículo de Dionatha Goulart focado em Infraestrutura, Redes e Automação de TI.",
};

import { generatePersonSchema } from '@/lib/schema';

export default function TiCVPage() {
  const filePath = path.join(process.cwd(), 'src/data/cv-ti.md');
  const content = fs.readFileSync(filePath, 'utf8');
  const schema = generatePersonSchema('TI');

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <Link href="/ti" className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-2">
          ← Voltar ao Portfólio
        </Link>
        <button 
          onClick={() => window.print()} 
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg shadow-green-900/20"
        >
          Baixar PDF
        </button>
      </nav>
      <CVViewer content={content} persona="TI" />
    </div>
  );
}
