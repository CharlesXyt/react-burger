import React,{useState, useEffect} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../components/store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'

const Auth = props => {

    const [controls,setControls] = useState(
        {
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        }
    )

    const [isSignup,setisSignup] = useState(false)

    const {bulidingBurger,authRedirectPath,onSetAuthRedirectPath} = props

    useEffect(()=>{
        if(!bulidingBurger && authRedirectPath !== '/'){
            onSetAuthRedirectPath();
        }
    },[bulidingBurger,authRedirectPath,onSetAuthRedirectPath])


    const checkValidity = (value,rules) => {
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

    const inputChangedHandler = (event,controlName) => {
        const updatedControls = {
            ...controls,
            [controlName] : {
                ...controls[controlName],
                value:event.target.value,
                valid:checkValidity(event.target.value,controls[controlName].validation),
                touched:true
            }
        }
        setControls(updatedControls)
    }

    const submitHandler =(event) => {
        event.preventDefault();
        props.onAuth(controls.email.value,controls.password.value,isSignup)
    }

    const switchAuthHandler = () => {
        setisSignup(!isSignup)
    }


    const formElementArray = [];
    for(let key in controls){
        formElementArray.push({
            id:key,
            config:controls[key]
        })
    }

    let form = formElementArray.map(el =>(
        <Input 
            key={el.id}
            shouldValidate={el.config.validation}
            inValid={!el.config.valid}
            touched={el.config.touched}
            changed={(event) => inputChangedHandler(event,el.id)} 
            elementType={el.config.elementType} 
            elementConfig={el.config.elementConfig} 
            value={el.config.value} 
        />
        
    ))

    if(props.loading){
        form = <Spinner/>
    }

    let errorMessage = null
    if(props.error){
        errorMessage = (<p>{props.error.message}</p>)
    }

    let authRedirect = null
    if(props.isAuthenticated){
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthHandler}>Switch to {isSignup ? "Sign up" : "Sign in"}</Button>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        bulidingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Auth)