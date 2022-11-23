import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'

import Landing from "./components/Landing_page/Landing";
import Home from './components/Home/Home';
import Navbar from "./components/Nav_bar/Navbar";
import CreationForm from "./components/Creation_form/CreationForm"
const App = () => {

  return (
    <Router>
      <Route exact path='/' component={Landing}/>
      <Route path='/' component={Navbar}/>
      <Route path='/home' component={Home} />
      <Route path='/create' component={CreationForm} />
    </Router>
  );
};

export default App;
