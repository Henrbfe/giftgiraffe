import './App.css';
import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import CachorroIcon from './pictures/animal_icons/cachorro_icon.png'
import ElefantIcon from './pictures/animal_icons/elefant_icon.png'
import LoboIcon from './pictures/animal_icons/lobo_icon.png'
import TigerIcon from './pictures/animal_icons/tigre_icon.png'
import VacaIcon from './pictures/animal_icons/vaca_icon.png'
import ZebraIcon from './pictures/animal_icons/zebra_icon.png'
import Navigationbar from './components/navigationbar/navigationbar';
import Homepage from './pages/homepage/homepage';
import Giftspage from './pages/giftspage/giftspage';
import UserAnimalPage from './pages/userAnimalPage/userAnimalPage'
import Wishlistpage from './pages/wishlistpage/wishlistpage';
import Settingspage from './pages/settingspage/settingspage';
import firebase from './firebase.config'
import Loginpage from './pages/loginpage/loginpage';


export default function App() {

  const [user, setUser] = useState(firebase.auth().currentUser)

  const changeUser = newUser => {
    setUser(newUser)
  }

  const userAnimalIcons = [
      CachorroIcon,
      ElefantIcon,
      LoboIcon,
      TigerIcon,
      VacaIcon,
      ZebraIcon
  ]

  useEffect(() => {
    console.log(`User: ${user}`)
  }, [user])

  return (
    <BrowserRouter>
      <Navigationbar />
      <Switch>
        <Route exact path='/'>
          <Loginpage changeUser={changeUser}/>
        </Route>
        <Route path='/Home'>
          {user
          ? <Homepage userAnimalIcons={userAnimalIcons} />
          : <Redirect to='/' />}
        </Route>
        <Route exact path='/Gifts'>
          {user
            ? <Giftspage userAnimalIcons={userAnimalIcons} />
            : <Redirect to='/' />}
        </Route>
        <Route path='/Gifts/:displayName'>
          {user
          ? <UserAnimalPage userAnimalIcons={userAnimalIcons} />
          : <Redirect to='/' />}
        </Route>
        <Route exact path='/Wishlist'>
          {user
            ? <Wishlistpage userAnimalIcons={userAnimalIcons} />
            : <Redirect to='/' />}
        </Route>
        <Route path='/Settings'>
          {user
            ? <Settingspage changeUser={changeUser}/>
            : <Redirect to='/' />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
