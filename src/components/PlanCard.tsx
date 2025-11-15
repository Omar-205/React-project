// import type { Plan } from "../types/meals";

// interface PlanCardProps {
//   plan: Plan;
// }

// export function PlanCard({ plan }: PlanCardProps) {
//   return (
//     <div
//       className="w-full p-6 rounded-2xl shadow-lg 
//                  bg-[var(--color-white)] text-[var(--color-text)]
//                  dark:bg-[var(--color-primary-dark)] dark:text-[var(--color-text-dark)]
//                  font-sans mb-6 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
//     >
//       {/* Plan title and total calories */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-2xl font-bold text-green-600">{plan.planName}</h3>
//         <p className="text-green-600 font-semibold">{plan.totalCalories} Cal</p>
//       </div>

//       {/* Meals */}
//       {plan.meals.map((meal, idx) => (
//         <div key={idx} className="mb-4">
//           <h4 className="font-semibold text-lg mb-2">{meal.name}</h4>
//           <ul className="ml-4 list-disc space-y-1">
//             {meal.foods.map((food, fIdx) => (
//               <li key={fIdx}>{food.name} - {food.grams}g</li>
//             ))}
//           </ul>
//           {idx < plan.meals.length - 1 && (
//             <hr className="my-3 border-t border-gray-200 dark:border-gray-600" />//n3ml line 2bl 2l2a5r
//           )}
//         </div>
//       ))}

//       {/* Dessert */}
//       <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
//         <h4 className="font-semibold text-lg mb-1">Dessert</h4>
//         <p>{plan.dessert.name} - {plan.dessert.grams}g</p>
//       </div>
//     </div>
//   );
// }


export function PlanCard() {
  return <div>Plan Card</div>;
}