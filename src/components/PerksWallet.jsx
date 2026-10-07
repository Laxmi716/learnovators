import { useState } from 'react';

const PERK_DETAILS = {
  library: {
    title: '14-Day Library Extension',
    icon: '📚',
    instructions: 'Show this digital code at your college central library circulation desk or enter it in your student intranet portal.',
    codePrefix: 'LN-LIB',
  },
  ebook: {
    title: '30% Partner eBook Voucher',
    icon: '💡',
    instructions: 'Apply this coupon code at checkout on our partner student bookstore (EdTechReads.org). Valid for any academic textbook.',
    codePrefix: 'LN-EBK30',
  },
  mentorship: {
    title: '45-Min Alumni Mentorship Session',
    icon: '🎓',
    instructions: 'Use this invitation token to book your preferred time slot on the alumni matching calendar portal.',
    codePrefix: 'LN-ALUMNI',
  },
};

export default function PerksWallet({ redemptions = {} }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const redeemedKeys = Object.keys(redemptions).filter((k) => redemptions[k] === true);

  if (redeemedKeys.length === 0) return null;

  function handleCopy(key, code) {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  return (
    <div className="card border-emerald-200 bg-emerald-50/40">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
            🎟️
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">My Redeemed Perks Wallet</h3>
            <p className="text-xs text-slate-500">Your active voucher codes ready to use.</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
          {redeemedKeys.length} Active {redeemedKeys.length === 1 ? 'Perk' : 'Perks'}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {redeemedKeys.map((key) => {
          const perk = PERK_DETAILS[key] || {
            title: 'Reward Item',
            icon: '🎁',
            instructions: 'Present this claim code to redeem your student benefit.',
            codePrefix: 'LN-REWARD',
          };
          const claimCode = `${perk.codePrefix}-${key.toUpperCase()}-${Math.abs(key.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1024))}`;

          return (
            <div key={key} className="bg-white rounded-xl border border-emerald-200 p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{perk.icon}</span>
                  <h4 className="font-semibold text-slate-900 text-sm leading-snug">{perk.title}</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                  {perk.instructions}
                </p>
              </div>

              <div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center justify-between font-mono text-xs text-slate-800 font-bold mb-2">
                  <span className="tracking-wider text-teal-800">{claimCode}</span>
                  <button
                    onClick={() => handleCopy(key, claimCode)}
                    className="text-[10px] bg-slate-200 hover:bg-teal-700 hover:text-white px-2 py-0.5 rounded transition-colors text-slate-700"
                  >
                    {copiedKey === key ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Verified & Active</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
