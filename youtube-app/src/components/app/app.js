import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Auth from '../../pages/auth'
import Home from '../../pages/home'
import Favorites from '../../pages/favorites'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { isAuthenticated } from '../../store/actions/auth'

import './app.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => dispatch(isAuthenticated()), [dispatch])

  const { token } = useSelector(state => state.auth.user)

  let routes = (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/favorites">
        <Favorites />
      </Route>
      <Redirect to="/" />
    </Switch>
  )

  if (!token) {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return <Router>{routes}</Router>
}

export default App
