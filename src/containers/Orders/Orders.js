import React,{Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandle'

class Orders extends Component{

    state={
        orders:[],
        loading:true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(res => {
            console.log(res.data);
            const fetchOrders = []
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id:key  
                })
            }
            this.setState({
                orders:fetchOrders,
                loading:false
            })
        })
        .catch(error => {
            this.setState({loading:false})
        })
    }

    render(){
        return(
            <div>
                {this.state.orders.map((el) =>{
                    return (
                        <Order key={el.id} ingredients={el.ingredients} price={el.price}/>
                    )
                })}
            </div>
            
        )
    }
}


export default withErrorHandler(Orders,axios);