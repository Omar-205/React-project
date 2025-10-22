export interface FoodItem {
  name: string;
  grams: number;
  calories?: number; // optional, for clarity
}

export interface Meal {
  name: string;
  foods: FoodItem[];
}

export interface Plan {
  planName: string;
  totalCalories: number;
  meals: Meal[];
  dessert: FoodItem;
}

export const mealPlans: Plan[] = [
  {
    planName: "Plan 1 - 1700 Cal",
    totalCalories: 1700,
    meals: [
      {
        name: "Breakfast",
        foods: [
          { name: "Baladi bread", grams: 60, calories: 150 },
          { name: "Foul (fava beans)", grams: 150, calories: 165 },
          { name: "Tomato", grams: 50, calories: 10 },
        ],
      },
      {
        name: "Lunch",
        foods: [
          { name: "Grilled chicken", grams: 120, calories: 198 },
          { name: "Rice", grams: 100, calories: 130 },
          { name: "Molokhia", grams: 100, calories: 50 },
        ],
      },
      {
        name: "Dinner",
        foods: [
          { name: "Grilled fish", grams: 150, calories: 195 },
          { name: "Vegetables (mixed)", grams: 150, calories: 60 },
          { name: "Baladi bread", grams: 50, calories: 125 },
        ],
      },
    ],
    dessert: { name: "Basbousa", grams: 50, calories: 175 },
  },
  {
    planName: "Plan 2 - 2000 Cal",
    totalCalories: 2000,
    meals: [
      {
        name: "Breakfast",
        foods: [
          { name: "Baladi bread", grams: 80, calories: 200 },
          { name: "Foul (fava beans)", grams: 200, calories: 220 },
          { name: "Olive", grams: 20, calories: 30 },
        ],
      },
      {
        name: "Lunch",
        foods: [
          { name: "Grilled chicken", grams: 150, calories: 248 },
          { name: "Rice", grams: 120, calories: 156 },
          { name: "Molokhia", grams: 120, calories: 60 },
        ],
      },
      {
        name: "Dinner",
        foods: [
          { name: "Grilled fish", grams: 180, calories: 234 },
          { name: "Koshari", grams: 150, calories: 180 },
          { name: "Vegetables (mixed)", grams: 150, calories: 60 },
        ],
      },
    ],
    dessert: { name: "Om Ali", grams: 80, calories: 192 },
  },
  {
    planName: "Plan 3 - 2500 Cal",
    totalCalories: 2500,
    meals: [
      {
        name: "Breakfast",
        foods: [
          { name: "Baladi bread", grams: 100, calories: 250 },
          { name: "Foul (fava beans)", grams: 200, calories: 220 },
          { name: "Eggs", grams: 100, calories: 155 },
        ],
      },
      {
        name: "Lunch",
        foods: [
          { name: "Grilled chicken", grams: 200, calories: 330 },
          { name: "Rice", grams: 150, calories: 195 },
          { name: "Molokhia", grams: 150, calories: 75 },
        ],
      },
      {
        name: "Dinner",
        foods: [
          { name: "Grilled fish", grams: 200, calories: 260 },
          { name: "Koshari", grams: 200, calories: 240 },
          { name: "Vegetables (mixed)", grams: 150, calories: 60 },
        ],
      },
    ],
    dessert: { name: "Basbousa", grams: 100, calories: 350 },
  },
];
