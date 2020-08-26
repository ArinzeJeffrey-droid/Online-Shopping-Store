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
import { auth, createUserProfileDocument } from "./firebase/firebase.util"
import { setCurrentUser} from "./redux/user/user.actions"
import {selectCurrentUser} from './redux/user/user.selectors'


class App extends React.Component {
  
  unsubscribeFromAuth = null
  componentDidMount(){
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth)
    })
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
