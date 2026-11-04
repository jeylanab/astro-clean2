import React, { useState } from 'react';
import { fmtMoney } from '../data/pricingConfig';

// Price screen for sales reps. Shows ONE big price (2-monthly + markup).
// The rep taps the price and types a lower amount (never above the starting price).
const RepPriceStep = ({ startPrice, onConfirm }) => {
  const [price, setPrice] = useState(startPrice);
  const [text, setText]   = useState(fmtMoney(startPrice));

  const apply = (n) => {
    const clamped = Math.min(startPrice, Math.max(1, Math.round(n * 100) / 100));
    setPrice(clamped);
    setText(fmtMoney(clamped));
  };

  const onType = (e) => {
    const v = e.target.value;
    setText(v);
    const n = parseFloat(v);
    if (!isNaN(n) && n > 0 && n <= startPrice) setPrice(n);
  };

  const onBlur = () => {
    const n = parseFloat(text);
    apply(isNaN(n) ? startPrice : n);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="drop-in drop-in-1 text-3xl md:text-4xl font-black uppercase mb-6 text-blue-800">
        Instant Quote
      </h2>

      <div className="drop-in drop-in-2 w-full max-w-2xl bg-green-50 border-2 border-green-400 rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-green-400/20 text-center">
        <p className="uppercase font-black text-xs md:text-sm tracking-widest text-green-700/70 mb-4">
          Price per clean
        </p>

        <div className="flex items-center justify-center text-green-600 font-black leading-none">
          <span className="text-8xl md:text-[10rem]">£</span>
          <input
            type="number"
            inputMode="decimal"
            value={text}
            onChange={onType}
            onBlur={onBlur}
            style={{ width: `${Math.max(text.length, 2) + 0.5}ch` }}
            className="bg-transparent text-8xl md:text-[10rem] font-black text-green-600 text-center outline-none leading-none"
          />
        </div>

        {price < startPrice && (
          <button
            onClick={() => apply(startPrice)}
            className="mt-6 text-[10px] font-black uppercase tracking-widest text-green-700/40 underline"
          >
            Reset
          </button>
        )}
      </div>

      <button
        onClick={() => onConfirm(price)}
        className="drop-in drop-in-3 mt-8 w-full max-w-2xl bg-green-500 hover:bg-green-600 text-white py-6 rounded-2xl font-black text-xl uppercase tracking-widest active:scale-95 transition-all"
      >
        Continue
      </button>
    </div>
  );
};

export default RepPriceStep;