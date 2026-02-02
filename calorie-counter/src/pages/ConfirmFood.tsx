import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FoodEntry, FoodItem, MealType } from "../types/models";

function ConfirmFood() {
  const location = useLocation();
  const navigate = useNavigate();
  const foodFromNav = location.state as FoodItem | undefined;

  const food: FoodItem = foodFromNav ?? {
    //avoids conditional hooks and typescript issues
    id: "mock",
    name: "Mock Food",
    servings: 1,
    calories: 100,
    protein: 10,
    carbs: 10,
    fat: 5,
  };

  const [servings, setServings] = useState<number>(food.servings ?? 1);
  const [meal, setMeal] = useState<MealType>("breakfast");
  const now = new Date();
  const entriesKey = `entries-${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}`;

  const existing = localStorage.getItem(entriesKey);
  const todaysEntries: FoodEntry[] = existing ? JSON.parse(existing) : [];

  const targetsStored = localStorage.getItem("targets");
  const targets = targetsStored
    ? JSON.parse(targetsStored)
    : { calories: 2250 };

  const todaysCalories = todaysEntries.reduce((sum, e) => sum + e.calories, 0);

  const entryCalories = food.calories * servings;
  const willExceed = todaysCalories + entryCalories > targets.calories;
  const overBy = todaysCalories + entryCalories - targets.calories;

  function onSaveAndSubmit() {
    const entry: FoodEntry = {
      id: crypto.randomUUID(),
      name: food.name,
      meal,
      calories: food.calories * servings,
      protein: food.protein * servings,
      carbs: food.carbs * servings,
      fat: food.fat * servings,
      createdAt: new Date().toISOString(),
    };
    const now = new Date();
    const key = `entries-${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}`;
    const existing = localStorage.getItem(key);
    const entries: FoodEntry[] = existing ? JSON.parse(existing) : [];
    entries.push(entry);
    if (willExceed) {
      const ok = window.confirm(
        `This will put you about ${Math.round(
          overBy
        )} calories over your goal. Save anyway?`
      );
      if (!ok) return;
    }

    localStorage.setItem(key, JSON.stringify(entries));
    console.log(entries);
    navigate("/home");
  }

  return (
    <>
      <h1>Confirm page</h1>

      <label>
        Servings:
        <input
          type="number"
          min={0}
          step={0.5}
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
        />
      </label>
      <label>
        Meal:
        <select
          value={meal}
          onChange={(e) => setMeal(e.target.value as MealType)}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </label>

      <p>Name: {food.name}</p>
      <p>Calories: {Math.round(food.calories * servings)}</p>
      <p>Proteins:{Math.round(food.protein * servings)}</p>
      <p>Carbs: {Math.round(food.carbs * servings)}</p>
      <p>Fats:{Math.round(food.fat * servings)}</p>
      {willExceed && (
        <p style={{ fontWeight: "bold" }}>
          Warning: this will put you {Math.round(overBy)} calories over your
          goal.
        </p>
      )}

      <button onClick={onSaveAndSubmit}>Save and Submit</button>
    </>
  );
}
export default ConfirmFood;
