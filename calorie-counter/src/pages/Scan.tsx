import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useZxing } from "react-zxing";
import type { FoodItem } from "../types/models";
function Scan() {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foodName, setFoodName] = useState<string | null>(null);
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [carbs, setCarbs] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const navigate = useNavigate();
  const { ref } = useZxing({
    onDecodeResult(result) {
      if (locked) return;

      const text = result.getText();
      setBarcode(text);
      setLocked(true);
    },
  });
  async function lookupBarcode(code: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${code}.json`
      );
      const data: any = await res.json();

      if (!data || data.status !== 1) {
        setError("Not found in Open Food Facts.");
        return;
      }

      const name = data.product?.product_name ?? "Unnamed product";
      const nutriments = data.product?.nutriments ?? {};
      const calories = Number(nutriments["energy-kcal"]) || 0;
      const proteins = Number(nutriments["proteins"]) || 0;
      const carbs = Number(nutriments["carbohydrates"]) || 0;
      const fat = Number(nutriments["fat"]) || 0;
      setFoodName(name);
      setCalories(calories);
      setProtein(proteins);
      setCarbs(carbs);
      setFat(fat);
    } catch {
      setError("Lookup failed. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }
  function routeToConfirm() {
    if (!barcode || !foodName) return; //safe guard
    const foodItem: FoodItem = {
      id: barcode,
      barcode,
      name: foodName,
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
      <h1>Scan</h1>

      {!barcode && <p>Point your camera at a barcode…</p>}

      <video ref={ref} style={{ width: "100%", maxWidth: 420 }} />

      {barcode && (
        <>
          <p>
            <b>Scanned:</b> {barcode}
          </p>
          <button onClick={() => lookupBarcode(barcode)}>Lookup</button>
          <button
            onClick={() => {
              setBarcode(null);
              setLocked(false);
              setFoodName(null);
              setError(null);
            }}
          >
            Scan again
          </button>
          {loading && <p>Looking up…</p>}
          {error && <p>{error}</p>}
          {foodName && (
            <>
              <p>
                <b>Found:</b> {foodName}
              </p>
              <div>
                <p>Calories: {Math.round(calories)}</p>
                <p>Proteins: {Math.round(protein)}</p>
                <p>Carbs: {Math.round(carbs)}</p>
                <p>Fat: {Math.round(fat)}</p>
              </div>
            </>
          )}
          {foodName && (
            <button onClick={() => routeToConfirm()}>Confirm</button>
          )}
        </>
      )}
    </>
  );
}

export default Scan;
