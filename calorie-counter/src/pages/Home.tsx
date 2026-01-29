import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { MacroTargets, FoodEntry } from "../types/models";
function Home() {
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  const [target, setTarget] = useState<MacroTargets>({
    calories: 2250,
    protein: 220,
    carbs: 200,
    fat: 50,
  });
  useEffect(() => {
    const now = new Date();
    const key = `entries-${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}`;

    const existing = localStorage.getItem(key);
    const parsed: FoodEntry[] = existing ? JSON.parse(existing) : [];

    setEntries(parsed);
  }, []);
  useEffect(() => {
    const stored = localStorage.getItem("targets");
    if (stored) {
      setTarget(JSON.parse(stored));
    }
  }, []);

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
        Calories: {Math.round(totals.calories)} / {target.calories}
      </p>
      <p>
        Protein: {Math.round(totals.protein)} / {target.protein}
      </p>
      <p>
        Carbs: {Math.round(totals.carbs)} / {target.carbs}
      </p>
      <p>
        Fat: {Math.round(totals.fat)} / {target.fat}
      </p>
      {entries.map((entry) => (
        <div key={entry.id}>
          <p>Name: {entry.name}</p>
          <p>Meal: {entry.meal}</p>
          <p>Calories: {entry.calories}</p>
          <p>Protein: {Math.round(entry.protein)}</p>
          <p>Carbs: {Math.round(entry.carbs)}</p>
          <p>Fat: {Math.round(entry.fat)}</p>
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
        <li>
          <Link to="/scan"> Scan food</Link>
        </li>
        <li>
          <Link to="/targets">Edit Targets</Link>
        </li>
        <li>
          <Link to="/manual">Manual Entry</Link>
        </li>
      </ul>
    </>
  );
}
export default Home;
