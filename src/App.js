import React,{useEffect,Suspense} from 'react';
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

  
  const {onTryAutoSignup,isAuthenticated} = props

  useEffect(()=>{
    onTryAutoSignup();
  },[onTryAutoSignup])
  

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/"/>
    </Switch>
    
  )

  if(isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <CheckOut {...props}/>} />
        <Route path="/orders" render={(props) => <Orders {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props}/>} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    )
  }

  return (
    <div>
        <Layout>
          <Suspense fallback={<p>loading....</p>}>{routes}</Suspense>
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
