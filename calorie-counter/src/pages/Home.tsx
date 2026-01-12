import { Link } from "react-router-dom";
import { useState } from "react";
import { type MacroTargets, type FoodEntry } from "../types/models";
function Home() {
  const [entries, setEntries] = useState<FoodEntry[]>([
    {
      id: "1",
      name: "Pizza",
      meal: "breakfast",
      calories: 350,
      protein: 7,
      carbs: 70,
      fat: 27,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [target, setTarget] = useState<MacroTargets>({
    calories: 2250,
    protein: 220,
    carbs: 200,
    fat: 50,
  });

  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <>
      <h1>Todays Food Log</h1>
      <h2>Summary</h2>
      <p>
        Calories: {totals.calories} / {target.calories}
      </p>
      <p>
        Protein: {totals.protein} / {target.protein}
      </p>
      <p>
        Carbs: {totals.carbs} / {target.carbs}
      </p>
      <p>
        Fat: {totals.fat} / {target.fat}
      </p>
      {entries.map((entry) => (
        <div key={entry.id}>
          <p>Name: {entry.name}</p>
          <p>Meal: {entry.meal}</p>
          <p>Calories: {entry.calories}</p>
          <p>Protein: {entry.protein}</p>
          <p>Carbs: {entry.carbs}</p>
          <p>Fat: {entry.fat}</p>
          <p>When: {entry.createdAt}</p>
        </div>
      ))}

      <ul>
        <li>
          <Link to="/logfood">Log Food</Link>
        </li>
        <li>
          <Link to="/login">Log Out</Link>
        </li>
      </ul>
    </>
  );
}
export default Home;
