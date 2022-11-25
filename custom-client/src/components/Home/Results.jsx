import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Gamecard from "../Game_card/Gamecard";
import styles from "./Home.module.css";
import services from "../../services";

const Results = () => {
  let fetchedGames = useSelector((state) => state.games);
  let fetchedGenres = useSelector((state) => state.genres);

  const [games, setGames] = useState(fetchedGames);
  const [page, setPage] = useState(1);
  //filter Controllers----------------------------------------
  const localActiveFilters = JSON.parse(window.localStorage.getItem('active_filters')) || {
    active: false,
    source: false,
    genre: false,
    order: false,
  }
  const [filters, setFilters] = useState(localActiveFilters);

  const toggleFilters = (event) => {
    const { id, name } = event.target;
    if(filters[name] == id){
      if(services.getNoCurrentFilters(filters, name)){
        setFilters({ ...filters, active: false, [name]: false })
      } else {
        setFilters({ ...filters, [name]: false })
      }
      setPage(1)
    } else {
      setFilters({ ...filters, active: true, [name]: id })
      setPage(1)
    }
  }

  useEffect(() => {
    if(filters.active){
      setGames(services.filterGames(fetchedGames, filters))
    } else {
      setGames(fetchedGames)
    }
  },[filters])
  //page Controllers-------------------------------------------

  const pageNumbers = services.getPageBtns(games);

  const goToPrevPage = () => {
    if (page !== 1) setPage(page - 1);
  };
  const goToNextPage = () => {
    if (page !== pageNumbers.length) setPage(page + 1);
  };
  const handleArrowNavigation = (event) => {
    if (event.key === 'ArrowLeft') goToPrevPage();
    if (event.key === 'ArrowRight') goToNextPage();
  };
  document.onkeyup = handleArrowNavigation;
  //clean-up key events----------------------------------------
  useEffect(()=>{
    return () => {
      document.removeEventListener('keyup', handleArrowNavigation);
    }
  },[]);

  return (
    <>
      <div className={styles.filters_container}>
        <div className={styles.order_filters_container}>
          <h2>Order</h2>
          <button
            className={filters.order === 'ASC' ? styles.active_filter : null}
            id='ASC'
            name="order"
            onClick={toggleFilters}
          >A-Z</button>
          <button
            className={filters.order === 'DESC' ? styles.active_filter : null}
            id='DESC'
            name="order"
            onClick={toggleFilters}
          >Z-A</button>

          <button
            className={filters.order === 'WORST' ? styles.active_filter : null}
            id='WORST'
            name="order"
            onClick={toggleFilters}
          >Worst rated first</button>
          <button
            className={filters.order === 'BEST' ? styles.active_filter : null}
            id='BEST'
            name="order"
            onClick={toggleFilters}
          >Best rated first</button>
        </div>

        <div className={styles.source_filters_container}>
          <h2>Source</h2>
          <button
            className={filters.source === 'api' ? styles.active_filter : null}
            id='api'
            name="source"
            onClick={toggleFilters}
          >Api</button>
          <button
            className={filters.source === 'custom' ? styles.active_filter : null}
            id='custom'
            name="source"
            onClick={toggleFilters}
          >Custom</button>
        </div>

        <div className={styles.genres_filter_container}>
          { 
            fetchedGenres.map(genre => (
              <button
                className={filters.genre == genre.id ? styles.active_filter : null}
                onClick={toggleFilters}
                key={genre.id}
                id={genre.id}
                name='genre'
              >{genre.name}</button>
            ))
          }
        </div>
      </div>

      { !pageNumbers.length || pageNumbers.length === 1 ? null :
        <div className={styles.page_btns_container}>
          <button title="move" onClick={goToPrevPage} className={styles.page_btn}>{"<<"}</button>
          {
            pageNumbers.map(number => (
              <button
                onClick={() => setPage(number)}
                key={number}
                className={`${styles.page_btn} ${page === number && styles.active_page}`}
              >{number}</button>
            ))
          }
          <button title="move" onClick={goToNextPage} className={styles.page_btn}>{">>"}</button>
        </div>
      }

      <div className={styles.gamecards_container}>
        {games.slice((page - 1) * 15, page * 15).map(game => {
          return (
            <Gamecard
              key={game.id}
              name={game.name}
              background_image={game.background_image}
              genres={game.genres}
              rating={game.rating}
            />
          );
        })}
      </div>

      { !pageNumbers.length || pageNumbers.length === 1 ? null :
        <div className={styles.page_btns_container}>
          <button title="move" onClick={goToPrevPage} className={styles.page_btn}>{"<<"}</button>
          {
            pageNumbers.map(number => (
              <button
                onClick={() => setPage(number)}
                key={number}
                className={`${styles.page_btn} ${page === number && styles.active_page}`}
              >{number}</button>
            ))
          }
          <button title="move" onClick={goToNextPage} className={styles.page_btn}>{">>"}</button>
        </div>
      }
    </>
  );
};

export default Results;
