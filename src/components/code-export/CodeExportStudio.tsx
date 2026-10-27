import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  CheckCircle2, 
  FileCode, 
  FolderTree, 
  Terminal, 
  Sparkles, 
  Code2, 
  ExternalLink,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { WeddingData } from '../../types/wedding';
import { getNextJsProjectFiles, downloadNextJsZip } from './generateNextJsProject';

interface CodeExportStudioProps {
  wedding: WeddingData;
}

export const CodeExportStudio: React.FC<CodeExportStudioProps> = ({ wedding }) => {
  const files = getNextJsProjectFiles(wedding);
  const fileKeys = Object.keys(files);
  const [selectedFile, setSelectedFile] = useState<string>(fileKeys[0] || 'app/page.tsx');
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showVercelGuide, setShowVercelGuide] = useState(true);

  const handleCopy = () => {
    const code = files[selectedFile] || '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await downloadNextJsZip(wedding);
    } catch (err) {
      console.error('Failed to download zip:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#18181B] text-stone-200">
      {/* Top Banner / Actions Bar */}
      <div className="bg-[#27272A] border-b border-stone-700/60 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm">Next.js 14 Codebase</span>
            <span className="text-[11px] text-amber-400 font-mono">100% Free & Open Export</span>
            <span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-700/50">
              Vercel Zero-Config Ready
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-0.5">
            Full Next.js 14 App Router project with Tailwind CSS, Shadcn UI styling, and your customized wedding data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium border border-stone-600 transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied File' : 'Copy File Code'}</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-rose-900/30 transition-all active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Generating ZIP...' : 'Download Next.js Project (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Vercel Deployment Tips Alert */}
      {showVercelGuide && (
        <div className="bg-[#1C2333] border-b border-blue-900/50 px-6 py-2.5 text-xs text-blue-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>Vercel Deployment:</strong> The downloaded ZIP places <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">package.json</code> directly at the root. Keep <strong>Framework: Next.js</strong> and <strong>Root Directory: ./</strong> in Vercel.
            </span>
          </div>
          <button
            onClick={() => setShowVercelGuide(false)}
            className="text-stone-400 hover:text-white text-xs shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* File Tree Explorer (Left) */}
        <div className="w-full md:w-64 bg-[#1E1E22] border-r border-stone-700/60 p-4 shrink-0 flex flex-col overflow-y-auto">
          <div className="text-[11px] uppercase tracking-wider text-stone-400 font-mono font-semibold mb-3 flex items-center gap-1.5">
            <FolderTree className="w-3.5 h-3.5 text-amber-500" />
            <span>Project Explorer</span>
          </div>

          <div className="space-y-1">
            {fileKeys.map((file) => (
              <button
                key={file}
                onClick={() => setSelectedFile(file)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono text-left transition-colors ${
                  selectedFile === file
                    ? 'bg-amber-500/20 text-amber-300 font-medium'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span className="truncate">{file}</span>
              </button>
            ))}
          </div>

          {/* Vercel & Terminal Quick Guide */}
          <div className="mt-auto pt-6 border-t border-stone-700/40 text-[11px] text-stone-400 space-y-3">
            <div>
              <div className="flex items-center gap-1.5 text-stone-300 font-mono font-semibold mb-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Run Locally</span>
              </div>
              <div className="p-2 bg-black/50 rounded-lg font-mono text-[10px] space-y-0.5 text-stone-300">
                <div>npm install</div>
                <div>npm run dev</div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-stone-300 font-mono font-semibold mb-1">
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                <span>Deploy to Vercel</span>
              </div>
              <p className="text-[10px] text-stone-400 leading-normal">
                Import the unzipped repository into Vercel. With <code className="text-amber-300 font-mono">package.json</code> at root, it builds automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Code Content Editor / Viewer (Right) */}
        <div className="flex-1 flex flex-col bg-[#141416] overflow-hidden">
          {/* File Tab Header */}
          <div className="bg-[#1C1C1F] border-b border-stone-700/50 px-4 py-2 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-stone-300">
              <FileCode className="w-4 h-4 text-amber-500" />
              <span>{selectedFile}</span>
            </div>
            <div className="text-stone-500 text-[11px]">
              UTF-8 · Ready for Next.js 14
            </div>
          </div>

          {/* Code Text Area */}
          <div className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed text-stone-300 select-text">
            <pre className="whitespace-pre">
              <code>{files[selectedFile]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
