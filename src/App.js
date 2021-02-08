import './App.css';
import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import Navigationbar from './components/navigationbar/navigationbar';
import Homepage from './pages/homepage/homepage';
import Giftspage from './pages/giftspage/giftspage';
import Wishlistpage from './pages/wishlistpage/wishlistpage';
import Settingspage from './pages/settingspage/settingspage';
import history from './history';


export default function App() {

  return (
    <Router history={history}>
      <Navigationbar />
      <Switch>
        <Route path='/Home' component={Homepage} />
        <Route path='/Gifts'>
          <Giftspage />
        </Route>
        <Route path='/Wishlist' component={Wishlistpage} />
        <Route path='/Settings' component={Settingspage} />
      </Switch>
    </Router>
  );
}
