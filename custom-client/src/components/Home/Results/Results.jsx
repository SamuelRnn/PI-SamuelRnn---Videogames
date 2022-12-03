import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import Gamecard from "../../Game_card/Gamecard";
import NotFound from "../NotFound/NotFound";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";

import styles from "./Results.module.css";
import services from "../../../services";
import { setActiveFilters } from '../../../redux/actions';

const Results = () => {
  const dispatch = useDispatch();

  let fetchedGames = useSelector((state) => state.games);
  let fetchedGenres = useSelector((state) => state.genres);
  let activeFilters = useSelector(state => state.activeFilters);

  const [games, setGames] = useState(false);
  const [page, setPage] = useState( +window.sessionStorage.getItem("page") || 1);
  const [filters, setFilters] = useState(activeFilters || {
    active: false,
    source: false,
    genre: false,
    order: false,
  });
  const pageNumbers = services.getPageBtns(games);

  useEffect(() => {
    if(filters.active){
      setGames(services.filterGames(fetchedGames, filters))
    } else {
      setGames(fetchedGames)
    }
    dispatch(setActiveFilters(filters))
  },[filters, fetchedGames]);

  return (
    <div className={styles.main_container}>
      <Filters fetchedGenres={fetchedGenres} setFilters={setFilters} filters={filters} setPage={setPage}/>

      {!games[0] ? <NotFound/> :
        <div className={styles.content_container}>
          { !pageNumbers.length || pageNumbers.length === 1 ? null :

            <Pagination page={page} setPage={setPage} pageNumbers={pageNumbers}/>
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
          
            <Pagination page={page} setPage={setPage} pageNumbers={pageNumbers}/>
          }
        </div>}
    </div>
  );
};

export default Results;
