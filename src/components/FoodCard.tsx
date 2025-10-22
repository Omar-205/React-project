import { useState } from "react";
import type { Food } from "../types/allFood";

interface FoodCardProps {
  food: Food;
}

export function FoodCard({ food }: FoodCardProps) {
  const [grams, setGrams] = useState(100);

  const factor = grams / 100;

  return (
    <div className="w-full p-4 rounded-2xl shadow-lg
      bg-[var(--color-white)] text-[var(--color-text)]
      dark:bg-[var(--color-primary-dark)] dark:text-[var(--color-text-dark)]
      font-sans mb-4 transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
      
      <h3 className="text-xl font-bold mb-2">{food.name}</h3>

      <div className="mb-2">
        <label className="block mb-1 text-green-600 font-semibold">Grams</label>
        <input
          type="number"
          min={1}
          value={grams}
          onChange={(e) => setGrams(Number(e.target.value))}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-[var(--color-input-dark)]"
        />
      </div>

      <div className="flex justify-between mt-2">
        <p><span className="font-semibold">Protein:</span> {(food.protein * factor).toFixed(1)} g</p>
        <p><span className="font-semibold">Carbs:</span> {(food.carbs * factor).toFixed(1)} g</p>
        <p><span className="font-semibold">Fat:</span> {(food.fat * factor).toFixed(1)} g</p>
      </div>
    </div>
  );
}
