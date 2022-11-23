import { useSelector } from "react-redux";
import { useState } from "react";
import Gamecard from "../Game_card/Gamecard";
import styles from "./Home.module.css";
import services from "../../services";

const Results = () => {
  const games = useSelector((state) => state.games);

  const [page, setPage] = useState(1);
  const pageNumbers = services.getPageBtns(games);

  const goToPrevPage = () => {
    if (page !== 1) setPage(page - 1);
  };
  const goToNextPage = () => {
    if (page !== pageNumbers.length) setPage(page + 1);
  };

  return (
    <>
      <div className={styles.page_btns_container}>
        <button onClick={goToPrevPage} className={styles.page_btn}>
          {"<"}
        </button>
        {pageNumbers.map((number) => (
          <button
            onClick={() => setPage(number)}
            key={number}
            className={styles.page_btn}
          >
            {number}
          </button>
        ))}
        <button onClick={goToNextPage} className={styles.page_btn}>
          {">"}
        </button>
      </div>
      
      <div className={styles.gamecards_container}>
        {games.slice((page - 1) * 15, page * 15).map((game) => {
          return (
            <Gamecard
              key={game.id}
              name={game.name}
              background_image={game.background_image}
              genres={game.genres}
            />
          );
        })}
      </div>
    </>
  );
};

export default Results;
