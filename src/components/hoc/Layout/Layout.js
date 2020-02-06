import React,{useState} from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

const Layout = props => {


    const [sideDrawerIsVisible,setSideDrawerIsVisible] = useState(false)

    const sideDrawerClosedHandler = () =>{
        setSideDrawerIsVisible(false);
    }

    const menuClickHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }



    return(
        <React.Fragment>
            <Toolbar 
            isAuth={props.isAuthenticated}
            clicked={menuClickHandler}/>
            <SideDrawer 
            isAuth={props.isAuthenticated}
            open={sideDrawerIsVisible} 
            closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )

}
    
const mapStateToProps = () => state =>{
    return {
        isAuthenticated: state.auth.token != null
    }
}


export default connect(mapStateToProps)(Layout);