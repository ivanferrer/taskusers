import './Options.scss'
import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'

export default props => {
   
   return (
         <aside className="menu-options">
                <nav className="menu">
                    <Link to="/cadastrar-usuario">
                        <i className="fa fa-plus-square"></i> Cadastrar usuário
                    </Link>
                    <Link to="/listar-usuarios">
                        <i className="fa fa-users"></i> Usuários
                    </Link>
                    <Link to="/cadastrar-tarefa">
                        <i className="fa fa-plus-square"></i> Cadastrar tarefa
                    </Link>
                    <Link to="/listar-tarefas">
                        <i className="fa fa-tasks"></i> Tarefas
                    </Link>
                </nav>
        </aside>
   )
 
}