import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Gamecard from "../Game_card/Gamecard";
import styles from "./Results.module.css";
import services from "../../services";
import { setActiveFilters } from '../../redux/actions'
const Results = () => {
  const dispatch = useDispatch()

  let fetchedGames = useSelector((state) => state.games);
  let fetchedGenres = useSelector((state) => state.genres);
  let activeFilters = useSelector(state => state.activeFilters);
  let filterMenu = useSelector(state => state.filterMenuState)

  const [games, setGames] = useState([]);
  const [page, setPage] = useState( +window.sessionStorage.getItem("page") || 1);
  const [orderMenu, toggleOrderMenu] = useState(false);
  const [sourceMenu, toggleSourceMenu] = useState(false);
  //filter Controllers----------------------------------------
  const [filters, setFilters] = useState(activeFilters || {
    active: false,
    source: false,
    genre: false,
    order: false,
  });

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
    dispatch(setActiveFilters(filters))
  },[filters, fetchedGames])
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
  //clean-up key events and page memo--------------------------
  useEffect(()=>{
    window.sessionStorage.setItem('page', page)
    return () => {
      document.removeEventListener('keyup', handleArrowNavigation);
    }
  },[page]);

  return (
    <div className={styles.main_container}>
      <div className={`${styles.filters_container} ${filterMenu ? null : styles.inactive_section}`}>
          <div className={styles.order_filter_container} >
            <div className={`button ${styles.filter_menu_triger}`} onClick={()=>toggleOrderMenu(state=>!state)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              Order by
            </div>
            {
              orderMenu &&
              <div className={styles.filter_list}>
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
            }
          </div>
          <div className={styles.source_filter_container}>
            <div className={`button ${styles.filter_menu_triger}`} onClick={()=>toggleSourceMenu(state=>!state)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              Select source
            </div>
            {
              sourceMenu &&
              <div className={styles.filter_list}>
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
            }
          </div>
          { 
            fetchedGenres.map(genre => (
              <button
                className={`button ${filters.genre == genre.id ? styles.active_genre : null}`}
                onClick={toggleFilters}
                key={genre.id}
                id={genre.id}
                name='genre'
              >{genre.name}</button>
            ))
          }
      </div>

      <div className={styles.content_container}>
        { !pageNumbers.length || pageNumbers.length === 1 ? null :
          <div className={styles.page_btns_container}>
            <button title="move" onClick={goToPrevPage} className={styles.page_btn}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
        
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Results;
