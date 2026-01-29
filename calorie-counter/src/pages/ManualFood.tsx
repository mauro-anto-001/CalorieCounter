import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FoodItem } from "../types/models";

function ManualFood() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [carbs, setCarbs] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);

  function onNext() {
    if (!name.trim()) return; // simple guard

    const foodItem: FoodItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      servings: 1,
      calories,
      protein,
      carbs,
      fat,
    };

    navigate("/confirm", { state: foodItem });
  }

  return (
    <>
      <h1>Manual Food Entry</h1>

      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Calories
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(Number(e.target.value))}
        />
      </label>

      <label>
        Protein (g)
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(Number(e.target.value))}
        />
      </label>

      <label>
        Carbs (g)
        <input
          type="number"
          value={carbs}
          onChange={(e) => setCarbs(Number(e.target.value))}
        />
      </label>

      <label>
        Fat (g)
        <input
          type="number"
          value={fat}
          onChange={(e) => setFat(Number(e.target.value))}
        />
      </label>

      <button onClick={onNext}>Next</button>
    </>
  );
}

export default ManualFood;
