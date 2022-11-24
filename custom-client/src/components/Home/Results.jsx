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
    alphabetical: false,
    rating: false,
  }
  const [filters, setFilters] = useState(localActiveFilters);

  const toggleGenreFilter = (event) => {
    const { id } = event.target;
    if(filters.genre == id){
      if(services.getActiveFilters(filters, 'genre')){
        setFilters({ ...filters, active: false, genre: false })
      } else {
        setFilters({ ...filters, genre: false })
      }
      setPage(1)
    } else {
      setFilters({ ...filters, active: true, genre: id })
      setPage(1)
    }
  }
  const toggleSourceFilter = (event) => {
    const { id } = event.target;
    if(filters.source == id){
      if(services.getActiveFilters(filters, 'source')){
        setFilters({ ...filters, active: false, source: false })
      } else {
        setFilters({ ...filters, source: false })
      }
      setPage(1)
    } else {
      setFilters({ ...filters, active: true, source: id })
      setPage(1)
    }
  }
  //-------------------------------------------------------
  const toggleFilter = (event) => {
    const { id, name } = event.target;
    if(filters.name == id){
      if(services.getActiveFilters(filters, name)){
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
  //-------------------------------------------------------
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
        <div className={styles.source_filters_container}>
          <h2>Source</h2>
          <button
            className={filters.source === 'api' ? styles.active_genre_btn : null}
            id='api'
            onClick={toggleSourceFilter}
          >Api</button>
          <button
            className={filters.source === 'custom' ? styles.active_genre_btn : null}
            id='custom' 
            onClick={toggleSourceFilter}
          >Custom</button>
        </div>
        <div className={styles.genres_filter_container}>
          <h2>Genres</h2>
          {
            fetchedGenres.map(genre => (
              <button
                className={filters.genre == genre.id ? styles.active_genre_btn : null}
                onClick={toggleGenreFilter}
                key={genre.id}
                id={genre.id}
                name={genre.name}
              >{genre.name}</button>
            ))
          }
        </div>
      </div>
      <div className={styles.page_btns_container}>
        <button onClick={goToPrevPage} className={styles.page_btn}>{"<"}</button>
        {
          pageNumbers.map(number => (
            <button
              onClick={() => setPage(number)}
              key={number}
              className={styles.page_btn}
            >{number}</button>
          ))
        }
        <button onClick={goToNextPage} className={styles.page_btn}>{">"}</button>
      </div>

      <div className={styles.gamecards_container}>
        {games.slice((page - 1) * 15, page * 15).map(game => {
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
