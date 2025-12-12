import { FaArrowLeft } from "react-icons/fa6";
import styles from "./Salad.module.css";
import { useLocation, useNavigate } from "react-router";

export default function Salad() {
  const navigate = useNavigate();
  const location = useLocation();
  const salad = location.state;
  return (
    <div className={`${styles.salad_section} ${styles.container}`}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h3>Salad Info</h3>
      </header>
      <main>
        <div className={styles.saladWrapper}>
          <img src={salad.image} alt="salad" />
          <h1>{salad.name}</h1>
          <span>{salad.price}$</span>
          <div className={styles.salad_desc}>{salad.info}</div>
        </div>
      </main>
    </div>
  );
}
