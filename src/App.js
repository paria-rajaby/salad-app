import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Team from "./Components/Team/Team";
import Reserve from "./Components/Reserve/Reserve";
import Footer from "./Components/Footer/Footer";
import { useEffect, useState } from "react";

function App() {
  const key = process.env.REACT_APP_SUPABASE_KEY;
  const url = process.env.REACT_APP_SUPABASE_URL;

  const [popular, setPopular] = useState([]);
  const [vegan, setVegan] = useState([]);
  const [meat, setMeat] = useState([]);
  const [basket, setBasket] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

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
    const basketItems = data.filter((salad) => salad.bought === true);
    setPopular(popularSalad);
    setVegan(veganSalad);
    setMeat(meatSalad);
    setBasket(basketItems);
  };

  const updateBasket = async (id) => {
    const res = await fetch(`${url}/rest/v1/salads?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ bought: true }),
    });
    fetchData();
  };

  return (
    <div className="container">
      <header>
        <Header basket={basket} fetchData={fetchData} />
      </header>
      <main>
        <Main
          title="Top List"
          desc="Try our best items"
          items={popular}
          onAdd={updateBasket}
        />
        <Main
          title="Vegan Salad"
          desc="Fresh vegan salads"
          items={vegan}
          onAdd={updateBasket}
        />
        <Main
          title="Meat Salad"
          desc="Fresh meat salads"
          items={meat}
          onAdd={updateBasket}
        />
        <Team />
        <Reserve />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
