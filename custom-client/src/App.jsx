import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllGenres } from "./redux/actions";

import Landing from "./components/Landing_page/Landing";
import Home from "./components/Home/Home";
import Navbar from "./components/Nav_bar/Navbar";
import CreationForm from "./components/Creation_form/CreationForm";
import Detail from "./components/Detail/Detail";

import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BACK_URL

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGenres());
  }, []);
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route path="/" component={Navbar} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={CreationForm} />
      <Route path="/game/:id" component={Detail} />
    </Router>
  );
};

export default App;
