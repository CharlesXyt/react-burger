import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Loader from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandle'
import * as actions from '../../../components/store/actions/index'

class ContactData extends React.Component{


    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your name'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your street'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your zipcode'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your country'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your email'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3
                },
                valid:false,
                touched:false
            },
            deliverMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                validation:{},
                value:'fastest',
                valid:true,
            }
        },
        formIsValid:false,
        loading:false   
    }


    checkValidity = (value,rules) => {
        let isValid = true
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] =this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            orderData:formData
             
        }
        this.props.onOrderBurger(order,this.props.token)
        
    }

    inputChangedHandler =(event,inputIdentifier) => {

        const updatedForm ={
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true
        updatedForm[inputIdentifier] = updatedFormElement
        let formIsValid = true
        for (let inputIdentifierElement in updatedForm){
            formIsValid = updatedForm[inputIdentifierElement].valid && formIsValid
        }
        this.setState({
            orderForm:updatedForm,
            formIsValid:formIsValid
        })
    }


    render(){

        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(el => (<Input 
                shouldValidate={el.config.validation}
                inValid={!el.config.valid}
                touched={el.config.touched}
                changed={(event) => this.inputChangedHandler(event,el.id)} 
                key={el.id} 
                elementType={el.config.elementType} 
                elementConfig={el.config.elementConfig} 
                value={el.config.value} 
                />))}
                
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                {this.state.formIsValid}
            </form>
        );
        if (this.props.loading){
            form = <Loader/>
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{
        ingredients:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token
    }
    
}


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger:(orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
