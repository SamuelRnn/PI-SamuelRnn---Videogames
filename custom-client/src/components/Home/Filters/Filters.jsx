import styles from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../../redux/actions";
import { useEffect, useState } from "react";
import services from "../../../services";

const Filters = ({ fetchedGenres, setFilters, filters, setPage }) => {
  const dispatch = useDispatch();
  let filterMenu = useSelector((state) => state.filterMenuState);

  const initialMenuStates = {
    orderMenu: false,
    sourceMenu: false,
    optionsMenu: false,
  }
  const [menus, toggleMenus] = useState(initialMenuStates);
  const handleMenuToggle = (menuName) => {
    root.onclick = null;
    toggleMenus((state) => ({
      orderMenu: false,
      sourceMenu: false,
      optionsMenu: false,
      [menuName]: !state[menuName]
    }))
  }
  useEffect(()=> {
    const root = document.getElementById('root')
    if(!Object.values(menus).every(bool => bool === false)){
      root.onclick = () => toggleMenus(initialMenuStates)
    } else {
      root.onclick = null;
    }
  }, [menus]);
  //filter controllers -----------------------------------
  const toggleFilters = (event) => {
    const { id, name } = event.target;
    if (filters[name] == id) {
      if (services.getNoCurrentFilters(filters, name)) {
        setFilters({ ...filters, active: false, [name]: false });
      } else {
        setFilters({ ...filters, [name]: false });
      }
      setPage(1);
    } else {
      setFilters({ ...filters, active: true, [name]: id });
      setPage(1);
    }
  };
  const clearFilters = () => {
    setFilters({
      active: false,
      source: false,
      genre: false,
      order: false,
    });
  };

  const resetSearch = () => {
    dispatch(getAllGames());
  };
  useEffect(() => {
    return () => {
      root.onclick = undefined;
    }
  },[])
  return (
    <>
      <div
        className={`${styles.filters_container} ${
          filterMenu ? null : styles.inactive_section
        }`}
      >
        <div className={styles.options_filter_container}>
          <button
            onClick={()=>handleMenuToggle('optionsMenu')}
            className={`button ${styles.options_menu}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {menus.optionsMenu && (
            <div className={styles.filter_list}>
              <button onClick={clearFilters}>Reset all filters</button>
              <button onClick={resetSearch}>Reset search</button>
              <button
                onClick={() => {
                  clearFilters();
                  resetSearch();
                }}
              >
                Reset all
              </button>
            </div>
          )}
        </div>
        <div className={styles.order_filter_container}>
          <div
            className={`button ${styles.filter_menu_triger} ${
              menus.orderMenu && styles.active
            }`}
            onClick={() => handleMenuToggle('orderMenu')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
            Order by
          </div>
          {menus.orderMenu && (
            <div className={styles.filter_list}>
              <button
                className={filters.order === "A-Z" ? styles.active_filter : null}
                id="A-Z"
                name="order"
                onClick={toggleFilters}
              >
                A-Z
              </button>
              <button
                className={filters.order === "Z-A" ? styles.active_filter : null}
                id="Z-A"
                name="order"
                onClick={toggleFilters}
              >
                Z-A
              </button>
              <button
                className={
                  filters.order === "worst-rated-first" ? styles.active_filter : null
                }
                id="worst-rated-first"
                name="order"
                onClick={toggleFilters}
              >
                Worst rated first
              </button>
              <button
                className={filters.order === "best-rated-first" ? styles.active_filter : null}
                id="best-rated-first"
                name="order"
                onClick={toggleFilters}
              >
                Best rated first
              </button>
            </div>
          )}
        </div>
        <div className={styles.source_filter_container}>
          <div
            className={`button ${styles.filter_menu_triger} ${
              menus.sourceMenu && styles.active
            }`}
            onClick={() => handleMenuToggle('sourceMenu')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
            Select source
          </div>
          {menus.sourceMenu && (
            <div className={styles.filter_list}>
              <button
                className={filters.source === "api" ? styles.active_filter : null}
                id="api"
                name="source"
                onClick={toggleFilters}
              >
                Api
              </button>
              <button
                className={
                  filters.source === "custom" ? styles.active_filter : null
                }
                id="custom"
                name="source"
                onClick={toggleFilters}
              >
                Custom
              </button>
            </div>
          )}
        </div>
        {fetchedGenres.map((genre) => (
          <button
            className={`button ${
              filters.genre == genre.name ? styles.active_genre : null
            }`}
            onClick={toggleFilters}
            key={genre.id}
            id={genre.name}
            name="genre"
          >
            {genre.name}
          </button>
        ))}
      </div>
      {
        Object.values(filters).slice(1).every(val => val === false) ?
        null :
        <p>Active Filters: {Object.values(filters).slice(1).filter(val => val !== false).join(', ')}</p>
        //bordeado diferente dependiendo de su source
      }
    </>
  );
};

export default Filters;
