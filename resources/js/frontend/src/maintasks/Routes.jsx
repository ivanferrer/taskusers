import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import UserRegister from '../components/registers/UserRegister'
import ListUsers from '../components/lists/ListUsers'
import TaskRegister from '../components/registers/TaskRegister'
import ListTasks from '../components/lists/ListTasks'
import EditTask from '../components/edit/EditTask'
import EditUser from '../components/edit/EditUser'
import ShowTask from '../components/display/ShowTask'


export default props => {
    let commomProps = props
    const loginProps = {
        input1_placeholder:'Digite seu usuário',
        input2_placeholder:'Digite sua senha',
        input1_label:'Usuário: ',  
        input2_label:'Senha: ',                              
        input1_textHelper:'Preencha o usuário corretamente.',       
        input2_textHelper: 'Preencha a senha corretamente.',     
        input1_validation: [{
                 validationType:"password",
                 textWhenInvalid:"Digite uma senha válida"},
             {
             validationType:"length",
             args:{ min:4, max: 10 },
             textWhenInvalid:"O usuário deve ter pelo menos 4 caracteres e o máximo de 10 caracteres."}
         ],
        input2_validation: [{
                     validationType:"length",
                     textWhenInvalid:"Sua senha deve ter pelo menos 8 caracteres.",
                     args:{ min:8, max: 150 }
        }],
                 
     }

     const apiRegex = /^\/backend\/.*/
    if (apiRegex.test(window.location.pathname)) {
       return <div />
    } else {

        return(
        <Switch>
        {/* <Route exact path='/login' render={props => <Home {...loginProps} />}/>
        <Route exact path='/logout' render={props => <Home {...loginProps} />}/> */}
        <Route exact path='/cadastrar-usuario' render={props => <UserRegister {...commomProps} />}/>
        <Route exact path='/listar-usuarios' render={props => <ListUsers {...commomProps} />}/>
        <Route exact path='/cadastrar-tarefas' render={props => <TaskRegister {...commomProps} />}/>
        <Route exact path='/listar-tarefas' render={props => <ListTasks {...commomProps} />}/>
        <Route exact path='/cadastrar-tarefa' render={props => <TaskRegister {...commomProps} />}/>
        {/* <Route exact path='/:task_id/ver-tarefa' render={props => <ShowTask {...commomProps} task_id={match.params.task_id} />}/> */}
        <Route exact path='/:task_id/editar-tarefa'
        render={({ match }) => <EditTask {...commomProps} task_id={match.params.task_id} />}/>
         <Route exact path='/:id/editar-usuario'
        render={({ match }) => <EditUser {...commomProps} id={match.params.id} />}/>
            <Route exact path='/' render={props => <Home {...loginProps} />}/>
            <Route exact path='/home' render={props => <Home {...loginProps} />}/>
            <Route exact path='/backend' render={props => <Home {...loginProps} />}/>
            <Redirect from='*' to='/'/>
        </Switch>
        )
    }
    

    
}


///  <Route path='/users' component={UserCrud}/>