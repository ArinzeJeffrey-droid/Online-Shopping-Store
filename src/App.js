import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route, Switch} from "react-router-dom"
import ShopPage from './pages/shop-page/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component';
import { auth } from "./firebase/firebase.util"

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUser: null
    }
  }
  render (){
    return (
    <div>
    <Header/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/shop" component={ShopPage}/>
        <Route path="/signin" component={SignInAndSignUpPage}/>
      </Switch>
    </div>
  );
  }
}

export default App;
