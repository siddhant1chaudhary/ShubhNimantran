import React, { useState } from 'react';
import { X, Copy, CheckCircle2, Share2, Smartphone, Download, QrCode } from 'lucide-react';
import { WeddingData } from '../../types/wedding';
import { renderQrSvg, generateUpiUri } from '../../utils/generateQrCode';

interface ShareModalProps {
  wedding: WeddingData;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ wedding, isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const whatsappText = `🌸 *Wedding Invitation* 🌸\n\nWith great joy, our families invite you to celebrate the wedding of\n*${wedding.brideName}* & *${wedding.groomName}*\n\n📅 Date: ${new Date(wedding.weddingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}\n📍 Venue: ${wedding.mainVenue}, ${wedding.weddingCity}\n\n✨ View our interactive invitation card, ceremonies & RSVP here:\n${shareUrl}\n\n${wedding.hashtag}`;

  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(whatsappText);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-stone-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-2 text-amber-800">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-2xl text-stone-900">
            Share Your Digital Wedding Invitation
          </h3>
          <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
            Send via WhatsApp, print on physical cards via QR code, or share direct link with guests.
          </p>
        </div>

        {/* QR Code Scan for Mobile Testing */}
        <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-4 mb-4">
          <img
            src={renderQrSvg(shareUrl, 120)}
            alt="Wedding Invitation QR"
            className="w-24 h-24 rounded-lg border border-stone-300 bg-white p-1"
          />
          <div className="text-xs space-y-1">
            <div className="font-semibold text-stone-900 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-amber-700" />
              <span>Test on Your Real Smartphone</span>
            </div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Scan with your phone's camera to experience the interactive wax seal reveal and wedding audio live!
            </p>
          </div>
        </div>

        {/* Link Copy */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-stone-700 mb-1">Invitation Link</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 text-xs p-2.5 rounded-lg border border-stone-200 bg-stone-50 font-mono text-stone-700 select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors flex items-center gap-1 shrink-0"
            >
              {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* WhatsApp Message Preview */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-stone-700">WhatsApp Message Template</label>
            <button
              onClick={handleCopyMessage}
              className="text-[11px] text-amber-800 hover:text-amber-900 font-medium"
            >
              {copiedMsg ? 'Message Copied!' : 'Copy Template Text'}
            </button>
          </div>
          <div className="p-3 bg-[#E7F6EC] border border-[#B7E4C7] rounded-xl text-xs text-[#1B4332] font-sans max-h-32 overflow-y-auto whitespace-pre-line leading-relaxed">
            {whatsappText}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Send on WhatsApp</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-stone-200 rounded-xl text-xs text-stone-600 hover:bg-stone-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
