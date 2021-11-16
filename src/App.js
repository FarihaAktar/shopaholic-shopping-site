
import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import AddProducts from './components/AddProducts/AddProducts';
import CheckOut from './components/CheckOut/CheckOut';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Orders from './components/Orders/Orders';
import ManageProduct from './components/ManageProduct/ManageProduct';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/manageProduct">
            <ManageProduct />
          </Route>
          <PrivateRoute path="/addProducts">
            <AddProducts />
          </PrivateRoute>
          <PrivateRoute path="/checkout/:key">
            <CheckOut />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
         

        </Switch>

      </Router>
    </UserContext.Provider>
  );
}

export default App;
