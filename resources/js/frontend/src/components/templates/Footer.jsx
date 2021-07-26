import './Footer.scss'
import React, {Fragment} from 'react'

export default props => {

    return(
    <Fragment>
        <footer className="footer">
            <span>
                Desenvolvido com por <strong>Ivan Ferrer</strong>.
            </span>
        </footer>
        {/* <Logout/> */}
    </Fragment>
    )
}
// function Logout(){
//     let Logout
//     if(localStorage.getItem('SessionToken'))
//         Logout =
//             <div className="logout">
//                 <a href="/login" onClick={() => localStorage.removeItem("SessionToken")}> 
//                     <span>Logout</span>
//                 </a>
//             </div>
//     else
//         Logout = <div className="logout"></div>
//     return(Logout)
// }