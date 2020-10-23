import React from 'react';
import {connect} from "react-redux"
import { createStructuredSelector} from "reselect"
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route, Switch, Redirect} from "react-router-dom"
import ShopPage from './pages/shop-page/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component';
import CheckOutPage from "./pages/checkout-page/checkout.component"
import {selectCurrentUser} from './redux/user/user.selectors'
import { checkUserSession } from "./redux/user/user.actions"


class App extends React.Component {
  
  unsubscribeFromAuth = null
  componentDidMount(){
    const { checkUserSession } = this.props
    checkUserSession()
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render (){
    return (
    <div>
    <Header/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/shop" component={ShopPage}/>
        <Route path="/checkout" component={CheckOutPage}/>
        <Route path="/signin" render={() => this.props.currentUser ? (<Redirect to="/"/>) : (<SignInAndSignUpPage/>)}/>
      </Switch>
    </div>
  );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
