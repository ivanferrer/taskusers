import './Logo.scss'
import logo from '../../assets/imgs/logo.png'
import React from 'react'
import {Link} from 'react-router-dom'

export default props =>
    <aside className="logo">
        <Link to="/" className="logo">
               <h2>Sistema de Tarefas</h2> 
        </Link>
    </aside>