import { useHistory } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  const history = useHistory();
  return (
    <div className={styles.bg}>
      <div className={styles.landing_content}>
        <h2>Welcome to</h2>
        <h1>gAmeXploRe</h1>
        <p>Individual Project for Henry Bootcamp, made by SamuelRnn</p>
        <button className={`button ${styles.button}`} onClick={() => history.push("/home")}>start exploring</button>
      </div>
    </div>
  );
};

export default Landing;
