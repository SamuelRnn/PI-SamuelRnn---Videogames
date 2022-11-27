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
  const localActiveFilters = JSON.parse(window.sessionStorage.getItem('active_filters')) || {
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
    return () => {
      window.sessionStorage.setItem('active_filters', JSON.stringify(filters))
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
    <div className={styles.main_container}>
      <div className={styles.filters_container}>
        <div className={styles.order_filters_container} hidden>
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

        <div className={styles.source_filters_container} hidden>
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
                className={`button ${filters.genre == genre.id ? styles.active_filter : null}`}
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
          <button title="move" onClick={goToPrevPage} className={styles.page_btn}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path transform="rotate(180, 10, 10)" id="svg_1" d="m6.12789,2.841a1.5,1.5 0 0 0 -2.3,1.269l0,11.78a1.5,1.5 0 0 0 2.3,1.269l9.344,-5.89a1.5,1.5 0 0 0 0,-2.538l-9.344,-5.891l0,0.001z"/>
            </svg>
          </button>
          {
            pageNumbers.map(number => (
              <button
                onClick={() => setPage(number)}
                key={number}
                className={`${styles.page_btn} ${page === number && styles.active_page}`}
              >{number}</button>
            ))
          }
          <button title="move" onClick={goToNextPage} className={styles.page_btn}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </button>
        </div>
      }

      <div className={styles.gamecards_container}>
        {games.slice((page - 1) * 15, page * 15).map(game => {
          return (
            <Gamecard
              id={game.id}
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
          <button title="move" onClick={goToPrevPage} className={styles.page_btn}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path transform="rotate(180, 10, 10)" id="svg_1" d="m6.12789,2.841a1.5,1.5 0 0 0 -2.3,1.269l0,11.78a1.5,1.5 0 0 0 2.3,1.269l9.344,-5.89a1.5,1.5 0 0 0 0,-2.538l-9.344,-5.891l0,0.001z"/>
            </svg>
          </button>
          {
            pageNumbers.map(number => (
              <button
                onClick={() => setPage(number)}
                key={number}
                className={`${styles.page_btn} ${page === number && styles.active_page}`}
              >{number}</button>
            ))
          }
          <button title="move" onClick={goToNextPage} className={styles.page_btn}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </button>
        </div>
      }
    </div>
  );
};

export default Results;
