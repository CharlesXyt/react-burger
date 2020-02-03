import React,{Component} from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component{

    constructor(props){
        super(props)
        this.state={
            showSideDrawer:false
        }
    }

    sideDrawerClosedHandler = () =>{
        this.setState({
            showSideDrawer:false
        })
    }

    menuClickHandler = () => {
        const oldState = this.state.showSideDrawer
        this.setState({
            showSideDrawer:!oldState
        })
    }


    render(){
        return(
            <React.Fragment>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                clicked={this.menuClickHandler}/>
                <SideDrawer 
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}
    
const mapStateToProps = () => state =>{
    return {
        isAuthenticated: state.auth.token != null
    }
}


export default connect(mapStateToProps)(Layout);