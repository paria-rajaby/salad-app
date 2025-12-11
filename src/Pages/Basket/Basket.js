import { useEffect, useState } from "react";
import styles from "./Basket.module.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import Loader from "../../Components/Loader/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router";

export default function Basket() {
  const navigate = useNavigate();
  const key = process.env.REACT_APP_SUPABASE_KEY;
  const url = process.env.REACT_APP_SUPABASE_URL;
  let sum = 0;
  let sumPrice = 0;
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    totalCount();
    totalPrice();
  }, [basket]);

  const totalCount = () => {
    basket.map((item) => {
      sum = sum + item.count;
    });
    setCount(sum);
  };
  const totalPrice = () => {
    basket.map((item) => {
      sumPrice = sumPrice + item.price * item.count;
    });
    setPrice(sumPrice);
  };
  const fetchData = async () => {
    setLoading(true);
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

    const basketItems = data.filter((salad) => salad.bought === true);

    setBasket(basketItems);
    setLoading(false);
  };
  const removeItem = async (id) => {
    setLoading(true);
    const res = await fetch(`${url}/rest/v1/salads?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ bought: false, count: 1 }),
    });
    setLoading(false);
    fetchData();
  };
  const getItem = async (id) => {
    const res = await fetch(`${url}/rest/v1/salads?id=eq.${id}`, {
      method: "GET",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });

    const data = await res.json();
    return data[0];
  };
  const increaseCount = async (id) => {
    setLoading(true);
    const item = await getItem(id);
    const newCount = (item.count || 0) + 1;

    await fetch(`${url}/rest/v1/salads?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ count: newCount }),
    });

    fetchData();
    setLoading(false);
  };
  const minusCount = async (id) => {
    setLoading(true);
    const item = await getItem(id);
    const newCount = (item.count || 0) - 1;
    if (newCount <= 0) {
      removeItem(id);
    } else {
      await fetch(`${url}/rest/v1/salads?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ count: newCount }),
      });
    }

    fetchData();
    setLoading(false);
  };
  const showSwal = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      text: "Your order has been successfully placed.",
      icon: "success",
    });
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div className={styles.basket_wrapper}>
        <h1>Your Basket :</h1>
        <div className={styles.items_wrapper}>
          {basket.length > 0 ? (
            basket.map((item) => (
              <div key={item.id} className={styles.item}>
                <img src={item.image} alt="salad" />
                <h3>{item.name}</h3>
                <span>{item.price}</span>
                <div className={styles.item_counter}>
                  <button onClick={() => increaseCount(item.id)}>
                    <FaPlus />
                  </button>
                  <span>{item.count}</span>
                  <button onClick={() => minusCount(item.id)}>
                    <FaMinus />
                  </button>
                </div>
                <button onClick={() => removeItem(item.id)}>
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <span style={{ height: "100%", alignItems: "center" }}>
              Your basket is empty!
            </span>
          )}
        </div>
        <div className={styles.total_info}>
          <h2>
            Total Price : <span>{price > 0 ? price.toFixed(2) : 0}$</span>
          </h2>
          <h2>
            Items Count : <span>{count}</span>
          </h2>
        </div>
        <div className={styles.buttons_wrapper}>
          <button onClick={() => navigate(-1)}>Return</button>
          <button onClick={showSwal}>Complete</button>
        </div>
      </div>
    </>
  );
}
