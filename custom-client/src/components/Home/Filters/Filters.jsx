import styles from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../../redux/actions';
import { useState } from 'react';
import services from '../../../services';

const Filters = ({ fetchedGenres, setFilters, filters, setPage }) => {
  const dispatch = useDispatch();
  let filterMenu = useSelector(state => state.filterMenuState);

  const [orderMenu, toggleOrderMenu] = useState(false);
  const [sourceMenu, toggleSourceMenu] = useState(false);
  const [optionsMenu ,toggleOptionsMenu] = useState(false);

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
  const clearFilters = () => {
    setFilters({
      active: false,
      source: false,
      genre: false,
      order: false,
    })
  }

  const resetSearch = () => {
    dispatch(getAllGames())
  }

  return (
    <div className={`${styles.filters_container} ${filterMenu ? null : styles.inactive_section}`}>
        <div className={styles.options_filter_container}>
          <button 
            onClick={()=> toggleOptionsMenu(state =>!state)}
            className={`button ${styles.options_menu}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
          {
            optionsMenu &&
            <div className={styles.filter_list}>
              <button onClick={clearFilters}>Reset all filters</button>
              <button onClick={resetSearch}>Reset search</button>
              <button onClick={()=>{clearFilters(); resetSearch()}}>Reset all</button>
            </div>
          }
        </div>
        <div className={styles.order_filter_container}>
          <div className={`button ${styles.filter_menu_triger} ${orderMenu && styles.active}`} onClick={()=>toggleOrderMenu(state=>!state)}>
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
          <div className={`button ${styles.filter_menu_triger} ${sourceMenu && styles.active}`} onClick={()=>toggleSourceMenu(state=>!state)}>
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
  )
}

export default Filters