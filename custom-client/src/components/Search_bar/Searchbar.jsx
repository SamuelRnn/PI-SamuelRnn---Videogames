import { useState } from 'react';
import styles from './Searchbar.module.css';
import { setSearchedGames, resetGames } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const Searchbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [search, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.target.value);
  }
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(resetGames());
    dispatch(setSearchedGames(search));
    setSearch('');
    document.getElementById('search').blur();
    window.sessionStorage.removeItem('page');
    history.push("/home");
  }
  return(
    <form onSubmit={handleSubmit} className={styles.searchbar_container}>
      <input id="search" type="text" placeholder='Search a game' onChange={handleChange} value={search} />
      <button type="submit" disabled={!search}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={styles.svg}>
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  )
}
export default Searchbar;