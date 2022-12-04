import { getAllGames } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Results from "./Results/Results";
import Loading from "../Loading/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const fetchedGames = useSelector((state) => state.games);
  useEffect(() => {
    if (!fetchedGames) {
      dispatch(getAllGames());
    }
  }, []);

  return fetchedGames ? <Results /> : <Loading />;
};

export default Home;
