import { getAllGames } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Results from "./Results";
import Loading from "./Loading";

const Home = () => {
  const dispatch = useDispatch();
  const fetchedGames = useSelector((state) => state.games)
  useEffect(() => {
    if(!fetchedGames.length){
      dispatch(getAllGames());
    }
  }, []);

  //filters
  const [filters, setFilters] = useState({
    1:4
  })
  useEffect(()=>{

  },[])

  return <div className={styles.main_container}>{fetchedGames.length ? <Results /> : <Loading />}</div>;
};

export default Home;
