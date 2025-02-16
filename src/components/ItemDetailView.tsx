import React from "react";
import { ArrowLeft, MessageCircle, Share2, Flag } from "lucide-react";
interface ItemDetailViewProps {
  onBack: () => void;
}
export const ItemDetailView = ({
  onBack
}: ItemDetailViewProps) => {
  return <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <div className="flex gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Flag className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" alt="Calculus Textbook" className="w-full rounded-lg" />
            <div className="flex gap-2 mt-4">
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" alt="Thumbnail 1" className="w-20 h-20 rounded object-cover cursor-pointer border-2 border-blue-600" />
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" alt="Thumbnail 2" className="w-20 h-20 rounded object-cover cursor-pointer" />
            </div>
          </div>
          {/* Item Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Calculus Early Transcendentals
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="User avatar" className="w-8 h-8 rounded-full" />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">
                  MIT • 12 successful trades
                </p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold">Condition</h3>
                <p className="text-gray-600">
                  Like New - Used for one semester only
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Looking For</h3>
                <p className="text-gray-600">
                  Physics Textbook or Chemistry Materials
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="text-gray-600">
                  8th Edition, perfect condition with no highlights or marks.
                  Includes online access code (unused). Perfect for Calculus I,
                  II, and III.
                </p>
              </div>
            </div>
            <button onClick={() => {}} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mb-4">
              Make a Trade Offer
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50">
              <MessageCircle className="h-5 w-5" />
              Message Trader
            </button>
          </div>
        </div>
      </div>
    </div>;
};