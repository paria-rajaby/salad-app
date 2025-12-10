import styles from "./Header.module.css";
import Loader from "../Loader/Loader";
import { FaBasketShopping } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Header({ basket, fetchData }) {
  const key = process.env.REACT_APP_SUPABASE_KEY;
  const url = process.env.REACT_APP_SUPABASE_URL;
  const [loading, setLoading] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);

  const openBasket = () => {
    setBasketOpen((prev) => !prev);
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
      body: JSON.stringify({ bought: false }),
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
  return (
    <>
      {loading ? <Loader /> : null}
      <div className={styles.header}>
        <div className={styles.header_topbar}>
          <span className={styles.shop_name}>FRESHBOWL</span>
          <div className={styles.basket_btn} onClick={openBasket}>
            <FaBasketShopping />
            {basket.length > 0 ? (
              <span className={`${styles.basket_counter} ${styles.flex}`}>
                {basket.length}
              </span>
            ) : null}
            {basketOpen ? (
              <div
                style={{ width: basket.length < 1 ? "300px" : "" }}
                className={styles.basket_wrapper}
              >
                <div className={`${styles.basket_top} ${styles.flex}`}>
                  <button className={styles.custom_button} onClick={openBasket}>
                    <CiCircleRemove
                      className={styles.custom_svg}
                      onClick={openBasket}
                    />
                  </button>
                  <span>Basket</span>
                </div>
                <div
                  style={{ height: basket.length < 1 ? "150px" : "" }}
                  className={styles.basket_middle}
                >
                  {basket.length ? (
                    basket.map((item) => (
                      <div
                        key={item.id}
                        className={`${styles.basket_item} ${styles.flex}`}
                      >
                        <div
                          className={`${styles.basket_item_desc} ${styles.flex}`}
                        >
                          <div
                            className={`${styles.section_one} ${styles.flex}`}
                          >
                            <div className={styles.basket_item_desc_image}>
                              <img src={item.image} alt="salad" />
                            </div>
                            <div
                              className={`${styles.basket_item_desc_textwrapper} ${styles.flex}`}
                            >
                              <h2 className={styles.salad_title}>
                                {item.name}
                              </h2>
                              <p>{item.price}</p>
                            </div>
                          </div>
                          <div
                            className={`${styles.basket_item_desc_countwrapper} ${styles.flex}`}
                          >
                            <div>
                              <button
                                className={styles.custom_button}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  increaseCount(item.id);
                                }}
                              >
                                <FaPlus className={styles.custom_svg} />
                              </button>
                              <span>{item.count}</span>
                              <button
                                className={styles.custom_button}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  minusCount(item.id);
                                }}
                              >
                                <FaMinus className={styles.custom_svg} />
                              </button>
                            </div>
                            <button
                              className={styles.custom_button}
                              onClick={(e) => {
                                e.stopPropagation();
                                removeItem(item.id);
                              }}
                            >
                              <FaTrash className={styles.custom_svg} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span
                      style={{ textAlign: basket.length < 1 ? "center" : "" }}
                    >
                      Your basket is empty
                    </span>
                  )}
                </div>
                <div className={styles.basket_buttom}>
                  <Link to="/basket">
                    <button>Show Basket</button>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.header_desc}>
          <h1 className={styles.header_desc_text}>
            “Dive into fresh, crunchy salads bursting with flavor, colors, and
            happiness – because healthy food should always be this fun!”
          </h1>
          <img
            className={styles.header_desc_img}
            src="./images/saladbowl.png"
            alt="salad"
          />
        </div>
      </div>
    </>
  );
}
