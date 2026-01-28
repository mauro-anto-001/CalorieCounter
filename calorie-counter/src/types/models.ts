// eventually add a feature where it can adjust meal types based on ur diet
// such as if you fast and have 2 meals or 1 meal or however many meals you have per day
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type FoodEntry = {
  id: string;
  name: string;
  meal: MealType;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
};

export type MacroTargets = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
export type FoodItem = {
  id: string; //use barcode as id for now
  servings: number;
  barcode?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
