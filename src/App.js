import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import * as actions from './components/store/actions/index'
import Layout from './components/hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'


const Orders = React.lazy(() => import('./containers/Orders/Orders'))
const Auth = React.lazy(() => import('./containers/Auth/Auth'))
const CheckOut = React.lazy(() => import('./containers/CheckOut/CheckOut'))




 
const App = props => {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/"/>
    </Switch>
    
  )

  if(this.props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" component={CheckOut} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    )
  }

  return (
    <div>
        <Layout>
          {routes}
        </Layout>
    </div>
  );

  
}


const mapStateToProps = state =>{
  return {
    isAuthenticated:state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
