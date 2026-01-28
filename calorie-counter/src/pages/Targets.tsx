import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MacroTargets } from "../types/models";

const DEFAULT_TARGETS: MacroTargets = {
  calories: 2250,
  protein: 220,
  carbs: 200,
  fat: 50,
};

function Targets() {
  const navigate = useNavigate();
  const [targets, setTargets] = useState<MacroTargets>(DEFAULT_TARGETS);

  useEffect(() => {
    const stored = localStorage.getItem("targets");
    if (stored) setTargets(JSON.parse(stored));
  }, []);

  function save() {
    localStorage.setItem("targets", JSON.stringify(targets));
    navigate("/home");
  }

  return (
    <>
      <h1>Edit Targets</h1>

      <label>
        Calories
        <input
          type="number"
          value={targets.calories}
          onChange={(e) =>
            setTargets({ ...targets, calories: Number(e.target.value) })
          }
        />
      </label>

      <label>
        Protein
        <input
          type="number"
          value={targets.protein}
          onChange={(e) =>
            setTargets({ ...targets, protein: Number(e.target.value) })
          }
        />
      </label>

      <label>
        Carbs
        <input
          type="number"
          value={targets.carbs}
          onChange={(e) =>
            setTargets({ ...targets, carbs: Number(e.target.value) })
          }
        />
      </label>

      <label>
        Fat
        <input
          type="number"
          value={targets.fat}
          onChange={(e) =>
            setTargets({ ...targets, fat: Number(e.target.value) })
          }
        />
      </label>

      <button onClick={save}>Save</button>
    </>
  );
}

export default Targets;
