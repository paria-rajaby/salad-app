import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { useEffect, useState } from "react";

function App() {
  const key = process.env.REACT_APP_SUPABASE_KEY;
  const url = process.env.REACT_APP_SUPABASE_URL;

  const [popular, setPopular] = useState([]);
  const [vegan, setVegan] = useState([]);
  const [meat, setMeat] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${url}/rest/v1/salads?select=*&order=created_at.asc`,
        {
          method: "GET",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
        }
      );
      const data = await response.json();

      const popularSalad = data.filter((salad) => salad.popular === true);
      const veganSalad = data.filter((salad) => salad.category == "vegan");
      const meatSalad = data.filter((salad) => salad.category == "meat");
      setPopular(popularSalad);
      setVegan(veganSalad);
      setMeat(meatSalad);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <main>
        <Main title="Top List" desc="Try our best items" items={popular} />
        <Main title="Vegan Salad" desc="Fresh vegan salads" items={vegan} />
        <Main title="Meat Salad" desc="Fresh meat salads" items={meat} />
      </main>
    </div>
  );
}

export default App;
