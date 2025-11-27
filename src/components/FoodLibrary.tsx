import { useState } from "react";
import { allFood } from "../types/allFood";
import { FoodCard } from "./FoodCard";

export function FoodLibrary() {
  const [search, setSearch] = useState("");
// Filter foods based on search query
  const filteredFoods = allFood.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1000px] mx-auto p-4">
      <h2 className="heading">Food Library</h2>

      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full flex justify-between rounded-full p-3 mb-4
          bg-gray-200 
          dark:bg-secondary
          text-gray-700 
          dark:text-primary
          focus:ring-green-600 "
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map((food, idx) => (
          <FoodCard key={idx} food={food} />
        ))}
      </div>
    </div>
  );
}
