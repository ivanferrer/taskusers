import './Main.scss'
import React, {Fragment} from 'react'
import Header from './Header'

export default props => {
    return(
    <Fragment>
        <Header {...props}/>
        <main className="content container-fluid">
            <div className="p-5 mt-4">
                {props.children}
            </div>
        </main>
    </Fragment>
    )
}