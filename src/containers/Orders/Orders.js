import React,{useEffect} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandle'
import {connect} from 'react-redux'
import * as actions from '../../components/store/actions/index'
import Loader from '../../components/UI/Spinner/Spinner'

const Orders = props =>{

    const {onFetchOrders,loading,orders,token,userId} = props

    useEffect(()=>{
        onFetchOrders(token,userId)
    },[token,userId,onFetchOrders])


    let ordersShow = <Loader/>
    if(!loading){
        ordersShow = (
            <div>
                {orders.map((el) =>{
                    return (
                        <Order key={el.id} ingredients={el.ingredients} price={el.price}/>
                    )
                })}
            </div>
        )
    }
    return ordersShow

}

const mapStateToProps = state => {
    return{
        loading:state.order.loading,
        orders:state.order.orders,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders:(token,userId) => dispatch(actions.fetchAllOrders(token,userId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));