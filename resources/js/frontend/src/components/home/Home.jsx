import React from 'react'
// import Main from '../templates/Main'
import Options from '../templates/Options'

export default props => {

    //if(props.connection !== "Connected") props.setConnection("Connected", "not required")
   
    return(
        <Options {...props}  />
    )
    
}