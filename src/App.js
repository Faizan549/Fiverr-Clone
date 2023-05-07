import React, { useEffect } from "react";
import Nav from "./nav";
import Account from "./account";
import "./App.css";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Main";
import GigDetail from "./GigDetail";
import Login from "./Components/login/login";
import Register from "./Components/register/register";
import { useHistory } from "react-router-dom";
import GigCreate from "./GigCreate";
import EditGig from "./EditGig";
const App = () => {
  const history = useHistory();
  const jwtToken = localStorage.getItem("token");
  const [user, setLoginUser] = useState(jwtToken);
  return (
    <>
      <Nav setLoginUser={setLoginUser} user={user} />

      <Switch>
        <Route exact path="/login">
          <Login setLoginUser={setLoginUser} user={user} />
        </Route>
        <Route exact path="/account" component={Account}></Route>
        <Route exact path="/" component={Main}></Route>
        <Route exact path="/gig/:id" component={GigDetail}></Route>
        <Route exact path="/creategig" component={GigCreate}></Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/GigCreate" component={GigCreate} />
        <Route exact path="/editgig" component={EditGig} />

        {/* {user ? <GigCreate /> : <Login />} */}
      </Switch>
    </>
  );
};
export default App;
