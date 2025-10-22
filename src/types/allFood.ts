export interface Food {
  name: string;
  protein: number; // per 100g
  carbs: number;   // per 100g
  fat: number;     // per 100g
}

export const allFood: Food[] = [
  { name: "Baladi bread", protein: 8, carbs: 50, fat: 1.5 },
  { name: "Foul (fava beans)", protein: 9, carbs: 20, fat: 0.5 },
  { name: "Grilled chicken", protein: 31, carbs: 0, fat: 3.6 },
  { name: "Grilled fish", protein: 22, carbs: 0, fat: 5 },
  { name: "Rice", protein: 2.5, carbs: 28, fat: 0.3 },
  { name: "Vegetables (mixed)", protein: 2, carbs: 10, fat: 0.2 },
  { name: "Molokhia", protein: 3, carbs: 6, fat: 0.5 },
  { name: "Koshari", protein: 6, carbs: 20, fat: 5 },
  { name: "Eggs", protein: 13, carbs: 1.1, fat: 11 },
  { name: "Olives", protein: 0.8, carbs: 6, fat: 15 },
  { name: "Basbousa", protein: 5, carbs: 60, fat: 15 },
  { name: "Om Ali", protein: 6, carbs: 50, fat: 20 },
  { name: "Tahini", protein: 17, carbs: 12, fat: 53 },
  { name: "Beef Kofta", protein: 21, carbs: 2, fat: 15 },
  { name: "Chicken Shawarma", protein: 24, carbs: 5, fat: 12 },
  { name: "Lentils", protein: 9, carbs: 20, fat: 0.4 },
  { name: "Hummus", protein: 8, carbs: 14, fat: 6 },
  { name: "Cucumber", protein: 0.7, carbs: 3.6, fat: 0.1 },
  { name: "Tomato", protein: 0.9, carbs: 3.9, fat: 0.2 },
  { name: "Potato (boiled)", protein: 2, carbs: 17, fat: 0.1 },
  { name: "Carrot", protein: 0.9, carbs: 10, fat: 0.2 },
  { name: "Spinach", protein: 2.9, carbs: 3.6, fat: 0.4 },
  { name: "Cheese (Romi)", protein: 25, carbs: 1, fat: 28 },
  { name: "Yogurt (plain)", protein: 3.5, carbs: 4.7, fat: 3.3 },
  { name: "Banana", protein: 1.1, carbs: 23, fat: 0.3 },
  { name: "Apple", protein: 0.3, carbs: 14, fat: 0.2 },

  // Dairy / Protein additions
  { name: "Whole milk", protein: 3.5, carbs: 5, fat: 3.5 },
  { name: "Skimmed milk", protein: 3.5, carbs: 5, fat: 0.1 },
  { name: "Cottage cheese", protein: 11, carbs: 3.4, fat: 4 },
  { name: "Whey protein (80%)", protein: 80, carbs: 8, fat: 2 },
];
