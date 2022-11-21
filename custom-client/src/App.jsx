import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/Landing_page/Landing'

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={Landing}/>
      {/* <Route path='/home' component={Navbar} /> */}
    </Router>
  )
}

export default App