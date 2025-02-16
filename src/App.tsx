import React from "react";
import { Navigation } from "./components/Navigation";
import { TradeCard } from "./components/TradeCard";
export function App() {
  return <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Trade What You Don't Need,
            <br />
            Get What You Do
          </h1>
          <p className="text-gray-600 mb-6">
            The easiest way to trade textbooks, supplies, and more with other
            students
          </p>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-lg hover:bg-blue-700">
            Start Trading
          </button>
        </div>
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {["All Items", "Textbooks", "Electronics", "Dorm Supplies", "Clothing", "Sports Gear"].map(category => <button key={category} className="whitespace-nowrap px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600">
              {category}
            </button>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TradeCard image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" title="Calculus Early Transcendentals" condition="Like New" lookingFor="Physics Textbook or Chemistry Materials" university="MIT" />
          <TradeCard image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800" title="College Hoodie (Medium)" condition="Gently Used" lookingFor="Any Other College Merch" university="Stanford" />
          <TradeCard image="https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=800" title="Desk Lamp" condition="New" lookingFor="Mini Fridge or Study Chair" university="Harvard" />
        </div>
      </main>
    </div>;
}