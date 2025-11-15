import { mealPlans } from "../types/meals";
import { PlanCard } from "./PlanCard";

export function MealPlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* {mealPlans.map((plan, idx) => (
        <PlanCard key={idx} plan={plan} />
      ))} */}
    </div>
  );
}
