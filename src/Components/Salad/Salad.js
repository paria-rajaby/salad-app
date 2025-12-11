import { FaArrowLeft } from "react-icons/fa6";
import styles from "./Salad.module.css";
import { IoAddOutline } from "react-icons/io5";

export default function Salad() {
  return (
    <div className={`${styles.salad_section} ${styles.container}`}>
      <header>
        <button>
          <FaArrowLeft />
        </button>
        <h3>Salad Info</h3>
      </header>
      <main>
        <div className={styles.saladWrapper}>
          <img src="/images/saladbowl.png" alt="salad" />
          <h1>salad sezar vegan</h1>
          <span>22.88$</span>
          <div className={styles.salad_desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsa,
            voluptates odio ipsum odit suscipit reprehenderit, sed ab
            repudiandae quidem id corporis animi illo? Esse laudantium
            consectetur obcaecati eum voluptas.
          </div>
        </div>
      </main>
    </div>
  );
}
