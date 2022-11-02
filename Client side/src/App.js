import React, { useContext } from "react";
import Login from "./pages/Signup page/login";
import Profile from "./pages/Profilepage/profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./Context/Authcontext";
import loginSuccess from "./containers/loginSuccess/loginSuccess";
import Home from "./pages/homepage/home";
import Messenger from "./pages/messenger/messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/Messenger">
          {!user ? <Login /> : <Messenger />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/login/success" component={loginSuccess} />
        <Route exact path="/login/failure">
          <p>Error logging in. Try Again</p>
        </Route>
        <Route exact path="/profile">
          {user ? <Profile /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
