import React from 'react';
import { Gift, QrCode, CreditCard } from 'lucide-react';
import { WeddingData } from '../../types/wedding';
import { renderQrSvg, generateUpiUri } from '../../utils/generateQrCode';

interface ShagunTabProps {
  wedding: WeddingData;
  onChange: (updated: Partial<WeddingData>) => void;
}

export const ShagunTab: React.FC<ShagunTabProps> = ({ wedding, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-stone-900">Digital Shagun & Gift Registry</h3>
        <p className="text-xs text-stone-500">
          Make it seamless for guests and well-wishers to gift digital shagun via UPI (GPay, PhonePe, Paytm) or bank transfer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Couple's UPI ID (VPA)
          </label>
          <input
            type="text"
            value={wedding.shagunUpiId}
            onChange={(e) => onChange({ shagunUpiId: e.target.value })}
            placeholder="e.g. couple@okhdfcbank"
            className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 font-mono"
          />
          <p className="text-[11px] text-stone-400 mt-1">
            Enables instant QR scan from any Indian UPI payment app.
          </p>
        </div>

        {/* Live QR Preview */}
        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-3">
          <img
            src={renderQrSvg(generateUpiUri(wedding.shagunUpiId || 'wedding@upi', `${wedding.brideName} & ${wedding.groomName}`), 80)}
            alt="Preview QR"
            className="w-16 h-16 rounded border border-stone-300"
          />
          <div>
            <div className="text-xs font-medium text-stone-900">Auto-Generated QR</div>
            <div className="text-[11px] text-stone-500">
              Updates in real-time as you modify the UPI ID.
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-stone-700 mb-1">
          Blessing / Shagun Note to Guests
        </label>
        <textarea
          rows={3}
          value={wedding.shagunMessage}
          onChange={(e) => onChange({ shagunMessage: e.target.value })}
          placeholder="Your presence and blessings are our greatest gift..."
          className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-stone-700 mb-1">
          Optional Bank Account / NRI Transfer Details
        </label>
        <textarea
          rows={2}
          value={wedding.shagunBankDetails}
          onChange={(e) => onChange({ shagunBankDetails: e.target.value })}
          placeholder="Account Name, Bank, Account Number, IFSC code..."
          className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 font-mono"
        />
      </div>
    </div>
  );
};
