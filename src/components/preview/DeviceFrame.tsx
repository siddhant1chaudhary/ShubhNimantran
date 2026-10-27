import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Maximize2, RotateCcw, QrCode } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  onResetSeal?: () => void;
  onOpenQrShare?: () => void;
}

export type ViewportMode = 'mobile' | 'tablet' | 'desktop';

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  onResetSeal,
  onOpenQrShare
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('mobile');

  return (
    <div className="flex flex-col h-full bg-[#EFECE6] border-l border-[#DCD6CA]">
      {/* Device Toolbar */}
      <div className="bg-[#FAF8F5] border-b border-[#DCD6CA] px-4 py-2 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-1.5 p-0.5 bg-stone-200/70 rounded-lg">
          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
              viewport === 'mobile'
                ? 'bg-white text-stone-900 shadow-sm font-medium'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
              viewport === 'tablet'
                ? 'bg-white text-stone-900 shadow-sm font-medium'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
              viewport === 'desktop'
                ? 'bg-white text-stone-900 shadow-sm font-medium'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {onOpenQrShare && (
            <button
              onClick={onOpenQrShare}
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
              title="Test on real smartphone via QR code"
            >
              <QrCode className="w-3.5 h-3.5 text-stone-700" />
              <span className="hidden sm:inline">Phone Scan</span>
            </button>
          )}
        </div>
      </div>

      {/* Viewport Canvas Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-start justify-center">
        {viewport === 'mobile' && (
          <div className="relative w-full max-w-[390px] min-h-[780px] bg-white rounded-[44px] shadow-2xl border-[9px] border-stone-900 overflow-hidden ring-1 ring-black/10 my-2">
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-stone-900 rounded-full z-50 flex items-center justify-end px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-800 border border-stone-700" />
            </div>

            {/* Mobile Viewport Content */}
            <div className="w-full h-full pt-6 overflow-y-auto">
              {children}
            </div>
          </div>
        )}

        {viewport === 'tablet' && (
          <div className="relative w-full max-w-[720px] min-h-[860px] bg-white rounded-[32px] shadow-2xl border-[8px] border-stone-900 overflow-hidden ring-1 ring-black/10 my-2">
            <div className="w-full h-full overflow-y-auto">
              {children}
            </div>
          </div>
        )}

        {viewport === 'desktop' && (
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden my-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
