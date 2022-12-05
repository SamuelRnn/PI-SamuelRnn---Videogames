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
  };
  const [menus, toggleMenus] = useState(initialMenuStates);
  const handleMenuToggle = (menuName) => {
    root.onclick = null;
    toggleMenus((state) => ({
      orderMenu: false,
      sourceMenu: false,
      optionsMenu: false,
      [menuName]: !state[menuName],
    }));
  };
  useEffect(() => {
    const root = document.getElementById("root");
    if (!Object.values(menus).every((bool) => bool === false)) {
      root.onclick = () => toggleMenus(initialMenuStates);
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
    };
  }, []);
  return (
    <>
      <div
        className={`${styles.filters_container} ${
          filterMenu ? null : styles.inactive_section
        }`}
      >
        <div className={styles.options_filter_container}>
          <button
            onClick={() => handleMenuToggle("optionsMenu")}
            className={`button ${styles.options_menu}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                clipRule="evenodd"
              />
              <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
              <path
                fillRule="evenodd"
                d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
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
            onClick={() => handleMenuToggle("orderMenu")}
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
                className={
                  filters.order === "A-Z" ? styles.active_filter : null
                }
                id="A-Z"
                name="order"
                onClick={toggleFilters}
              >
                A-Z
              </button>
              <button
                className={
                  filters.order === "Z-A" ? styles.active_filter : null
                }
                id="Z-A"
                name="order"
                onClick={toggleFilters}
              >
                Z-A
              </button>
              <button
                className={
                  filters.order === "worst-rated-first"
                    ? styles.active_filter
                    : null
                }
                id="worst-rated-first"
                name="order"
                onClick={toggleFilters}
              >
                Worst rated first
              </button>
              <button
                className={
                  filters.order === "best-rated-first"
                    ? styles.active_filter
                    : null
                }
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
            onClick={() => handleMenuToggle("sourceMenu")}
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
                className={
                  filters.source === "api" ? styles.active_filter : null
                }
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
        Object.values(filters)
          .slice(1)
          .every((val) => val === false) ? null : (
          <p>
            Active Filters:{" "}
            {Object.values(filters)
              .slice(1)
              .filter((val) => val !== false)
              .join(", ")}
          </p>
        )
        //bordeado diferente dependiendo de su source
      }
    </>
  );
};

export default Filters;
