import styles from "./Basket.module.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

export default function Basket() {
  return (
    <div className={styles.basket_wrapper}>
      <h1>Your Basket :</h1>
      <div className={styles.items_wrapper}>
        <div className={styles.item}>
          <img src="/images/saladbowl.png" alt="" />
          <h3>salad sezart hyty</h3>
          <span>44.99</span>
          <div className={styles.item_counter}>
            <button>
              <FaPlus />
            </button>
            <span>1</span>
            <button>
              <FaMinus />
            </button>
          </div>
          <button>
            <FaTrash />
          </button>
        </div>
        <div className={styles.item}>
          <img src="/images/saladbowl.png" alt="" />
          <h3>salad sezart hyty</h3>
          <span>44.99</span>
          <div className={styles.item_counter}>
            <button>
              <FaPlus />
            </button>
            <span>1</span>
            <button>
              <FaMinus />
            </button>
          </div>
          <button>
            <FaTrash />
          </button>
        </div>
        <div className={styles.item}>
          <img src="/images/saladbowl.png" alt="" />
          <h3>salad sezart hyty</h3>
          <span>44.99</span>
          <div className={styles.item_counter}>
            <button>
              <FaPlus />
            </button>
            <span>1</span>
            <button>
              <FaMinus />
            </button>
          </div>
          <button>
            <FaTrash />
          </button>
        </div>
        <div className={styles.item}>
          <img src="/images/saladbowl.png" alt="" />
          <h3>salad sezart hyty</h3>
          <span>44.99</span>
          <div className={styles.item_counter}>
            <button>
              <FaPlus />
            </button>
            <span>1</span>
            <button>
              <FaMinus />
            </button>
          </div>
          <button>
            <FaTrash />
          </button>
        </div>
      </div>
      <div className={styles.total_info}>
        <h2>
          Total Price : <span>100$</span>
        </h2>
        <h2>
          Items Count : <span>10</span>
        </h2>
      </div>
      <div className={styles.buttons_wrapper}>
        <button>Return</button>
        <button>Complete</button>
      </div>
    </div>
  );
}
