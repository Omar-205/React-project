// Define TypeScript interfaces for type safety
interface Meal {
    name: string;
    time: string;
    calories: number;
    content: string;
}

interface Plan {
    planName: string;
    dailyCalories: number;
    carbs: number; // in grams
    protein: number; // in grams
    fat: number; // in grams
    ongoing?: boolean;
    meals: Meal[];
}

interface MealPlans {
    [key: string]: Plan;
}

// The main object containing all meal plans
export const mealPlans: MealPlans = {
    "Weight Loss Plan": {
        planName: "Weight Loss Plan",
        dailyCalories: 2000,
        carbs: 175,
        protein: 200,
        fat: 56,
        meals: [
            {
                name: "Breakfast",
                time: "8:00 AM",
                calories: 450,
                content: "Scrambled eggs (3 large) with spinach and one slice of whole-wheat toast. A side of 1/2 grapefruit. This provides high-quality protein to keep you full and kickstart your metabolism. \nAlternatives: 1 cup of Greek yogurt with a cup of mixed berries and a tablespoon of chia seeds."
            },
            {
                name: "Lunch",
                time: "1:00 PM",
                calories: 550,
                content: "Large mixed greens salad with 150g (5oz) of grilled chicken breast, cherry tomatoes, cucumber, bell peppers, and a light vinaigrette dressing (2 tablespoons). Focuses on lean protein and nutrient-dense vegetables. \nAlternatives: 150g (5oz) of canned tuna (in water) mixed with Greek yogurt instead of mayo, served with veggie sticks."
            },
            {
                name: "Snack",
                time: "4:00 PM",
                calories: 400,
                content: "A protein shake with one scoop of whey or plant-based protein powder mixed with water or unsweetened almond milk, plus a medium-sized apple. This helps curb afternoon hunger and supports muscle maintenance. \nAlternatives: 1 cup of cottage cheese with a sliced pear."
            },
            {
                name: "Dinner",
                time: "7:00 PM",
                calories: 600,
                content: "150g (5oz) of baked salmon seasoned with herbs, served with 1 cup of quinoa and a large portion of steamed broccoli and asparagus. Rich in omega-3 fatty acids, fiber, and lean protein. \nAlternatives: 150g (5oz) of lean turkey mince cooked with chopped tomatoes and onions, served with a small sweet potato."
            },
        ],
    },
    "Muscle Build Plan": {
        planName: "Muscle Build Plan",
        dailyCalories: 2800,
        carbs: 350,
        protein: 210,
        fat: 62,
        meals: [
            {
                name: "Breakfast",
                time: "8:00 AM",
                calories: 700,
                content: "Large bowl of oatmeal (1 cup dry) made with milk, mixed with one scoop of protein powder, a sliced banana, and two tablespoons of peanut butter. A calorie-dense and high-protein start to fuel your day and workouts. \nAlternatives: 4 scrambled eggs, 2 slices of whole-wheat toast with avocado, and a glass of milk."
            },
            {
                name: "Lunch",
                time: "1:00 PM",
                calories: 750,
                content: "200g (7oz) of lean ground beef stir-fried with mixed vegetables (broccoli, bell peppers, onions) and served with 1.5 cups of cooked brown rice. Provides essential protein and complex carbs for energy and muscle repair. \nAlternatives: 200g (7oz) chicken breast with a large baked sweet potato and a side salad with olive oil."
            },
            {
                name: "Snack",
                time: "4:00 PM",
                calories: 600,
                content: "1.5 cups of full-fat cottage cheese topped with a cup of pineapple chunks and a handful of almonds (30g). A slow-digesting protein source ideal for sustained muscle recovery. \nAlternatives: A high-calorie protein shake with 2 scoops of whey, 1 cup of milk, 1/2 cup of oats, and a tablespoon of almond butter."
            },
            {
                name: "Dinner",
                time: "7:00 PM",
                calories: 750,
                content: "200g (7oz) of chicken thighs (cooked without skin) served with a large portion of whole-wheat pasta (1.5 cups cooked) and a tomato-based sauce. A balanced meal to replenish glycogen stores and provide building blocks for muscle growth overnight. \nAlternatives: 200g (7oz) of steak with a side of mashed potatoes and green beans."
            },
        ],
    },
    "Maintenance Plan": {
        planName: "Maintenance Plan",
        dailyCalories: 2400,
        carbs: 240,
        protein: 180,
        fat: 80,
        ongoing: true,
        meals: [
            {
                name: "Breakfast",
                time: "8:00 AM",
                calories: 600,
                content: "Three-egg omelette with cheese, bell peppers, and onions, served with two slices of whole-wheat toast topped with avocado. A balanced mix of protein, healthy fats, and complex carbs. \nAlternatives: A smoothie made with 1 cup Greek yogurt, 1/2 cup oats, a handful of spinach, mixed berries, and a tablespoon of flaxseed."
            },
            {
                name: "Lunch",
                time: "1:00 PM",
                calories: 650,
                content: "A large chicken or chickpea wrap using a whole-wheat tortilla, filled with 150g (5oz) of chicken/chickpeas, lettuce, tomato, and a yogurt-based sauce. Served with a side of apple slices. A convenient and balanced meal for sustained energy. \nAlternatives: A large bowl of lentil soup with a side of whole-grain bread for dipping."
            },
            {
                name: "Snack",
                time: "4:00 PM",
                calories: 450,
                content: "An apple sliced and served with two tablespoons of natural peanut butter. Plus, a small handful of mixed nuts (30g). Simple, effective, and provides healthy fats, fiber, and protein. \nAlternatives: A bowl of Greek yogurt with a drizzle of honey and a handful of walnuts."
            },
            {
                name: "Dinner",
                time: "7:00 PM",
                calories: 700,
                content: "A balanced 'Buddha Bowl' containing a base of quinoa (1 cup), topped with roasted chickpeas, mixed roasted vegetables (broccoli, sweet potato, zucchini), and a tahini dressing. This meal is flexible and nutrient-dense. \nAlternatives: 180g (6oz) of grilled fish (like cod or tilapia) with a side of roasted potatoes and a large green salad."
            },
        ],
    },
};

// important intefaces
export interface dailyMeal {
    breakfast?: meal;
    lunch?: meal;
    snacks?: meal;
    dinner?: meal;
}
export interface meal {
    calories: number;
    protien: number;
    carbs: number;
    fat: number;
}
