import React, { useState } from "react";
import { ItemDetailView } from "./ItemDetailView";
import { TradeOfferForm } from "./TradeOfferForm";
interface TradeCardProps {
  image: string;
  title: string;
  condition: string;
  lookingFor: string;
  university: string;
}
export const TradeCard = ({
  image,
  title,
  condition,
  lookingFor,
  university
}: TradeCardProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showTradeOffer, setShowTradeOffer] = useState(false);
  return <>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowDetail(true)}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">Condition: {condition}</p>
          <p className="text-sm text-gray-600">Looking for: {lookingFor}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">{university}</span>
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700" onClick={e => {
            e.stopPropagation();
            setShowTradeOffer(true);
          }}>
              Offer Trade
            </button>
          </div>
        </div>
      </div>
      {showDetail && <ItemDetailView onBack={() => setShowDetail(false)} />}
      {showTradeOffer && <TradeOfferForm onClose={() => setShowTradeOffer(false)} />}
    </>;
};