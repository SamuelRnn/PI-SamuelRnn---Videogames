import styles from "./Landing.module.css";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();

  return (
    <div className={styles.bg}>
      <p>landing</p>
      <button onClick={() => history.push("/home")}>Go to home</button>
    </div>
  );
};

export default Landing;
