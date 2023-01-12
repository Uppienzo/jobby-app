import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import LoginRoute from './Components/LoginRoute'
import Home from './Components/Home'
import Jobs from './Components/jobs'
import JobItemDetails from './Components/JobItemDetails'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
