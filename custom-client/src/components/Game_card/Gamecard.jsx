import styles from "./Gamecard.module.css";
import { useHistory } from 'react-router-dom';

const Gamecard = (props) => {
  const history = useHistory();
  const FALLBACK_IMG = 'https://assets.reedpopcdn.com/jetstreamsam.jpg/BROK/resize/1200x1200%3E/format/jpg/quality/70/jetstreamsam.jpg'
  return (
    <div className={styles.container} onClick={()=>history.push(`/game/${props.id}`)}>
      <div
        className={styles.img_container}
        style={{ backgroundImage: `url(${props.background_image || FALLBACK_IMG})` }}
      ></div>
      <h3 className={styles.title}>{props.name}</h3>
      <p className={styles.genres}>
        {props.genres.map((genre) => genre.name).join(", ")}
      </p>
      <span className={styles.span} aria-hidden>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M17.303 5.197A7.5 7.5 0 006.697 15.803a.75.75 0 01-1.061 1.061A9 9 0 1121 10.5a.75.75 0 01-1.5 0c0-1.92-.732-3.839-2.197-5.303zm-2.121 2.121a4.5 4.5 0 00-6.364 6.364.75.75 0 11-1.06 1.06A6 6 0 1118 10.5a.75.75 0 01-1.5 0c0-1.153-.44-2.303-1.318-3.182zm-3.634 1.314a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68z" clipRule="evenodd" />
        </svg>
        Click the card to see full info!
      </span>
      <div className={styles.rating}>
        <svg className={styles.star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
        <p>{props.rating}</p>
      </div>
    </div>
  );
};

export default Gamecard;
