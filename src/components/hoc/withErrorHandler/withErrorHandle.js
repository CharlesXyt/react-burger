import React ,{ useState,useEffect }from 'react'
import Modal from '../../UI/Modal/Modal'

const withErrorHandler = (Wrapper,axios) => {
    return props => {

        const [error,setError] = useState(null)


        //willmount
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null)
            return req
        })
        const resInterceptor = axios.interceptors.response.use(res => res,err => {
            setError(err)
        })

        //willunmount
        useEffect(()=>{
            return () =>{
                axios.interceptors.request.eject(reqInterceptor)
                axios.interceptors.response.eject(resInterceptor)
            }
        },[reqInterceptor,resInterceptor])


        const errorConfirmHandler = () => {
            setError(null)
        }

      
        return(
            <React.Fragment>
            <Modal show={error} modalClosed={errorConfirmHandler}>
                {error ? error.message:null}
            </Modal>
            <Wrapper {...props}/>
        </React.Fragment>
        );
       
    }
}


export default withErrorHandler;