import React from 'react'
import Modal from '../../UI/Modal/Modal'
import useHttpErrorHandler from '../hooks/http-errorhandler'

const withErrorHandler = (Wrapper,axios) => {
    return props => {

        const [error,clearError] = useHttpErrorHandler(axios)
      
        return(
            <React.Fragment>
            <Modal show={error} modalClosed={clearError}>
                {error ? error.message:null}
            </Modal>
            <Wrapper {...props}/>
        </React.Fragment>
        );
       
    }
}


export default withErrorHandler;