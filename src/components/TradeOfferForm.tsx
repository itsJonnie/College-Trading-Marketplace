import React from "react";
import { X, Upload, Trash2 } from "lucide-react";
interface TradeOfferFormProps {
  onClose: () => void;
}
export const TradeOfferForm = ({
  onClose
}: TradeOfferFormProps) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Make a Trade Offer</h2>
            <button onClick={onClose}>
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block font-medium mb-2">
                What are you offering?
              </label>
              <input type="text" placeholder="Enter item name" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-medium mb-2">Condition</label>
              <select className="w-full px-4 py-2 border rounded-lg">
                <option>New</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Upload Photos</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                </div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800" alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                  <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">Additional Notes</label>
              <textarea placeholder="Add any details about your offer..." className="w-full px-4 py-2 border rounded-lg h-24" />
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Submit Trade Offer
            </button>
          </div>
        </div>
      </div>
    </div>;
};