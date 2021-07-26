import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './TaskApp.scss'
import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'

import Routes from './Routes'
import Logo from '../components/templates/Logo'
import Footer from '../components/templates/Footer'
import Nav from '../components/templates/Nav'
import Overlay from '../components/templates/Overlay'
import axios from 'axios'
import baseUrl from '../config/baseUrl'

const baseUrlBackend = `${baseUrl.baseUrlBackend}`


export default class TaskApp extends Component {
    constructor(props){
        super(props)
        this.state = {
            type:null,
            isFinite:true,
            listTasks:[],
            listUsers:[],
            users:{}
        }
    }
   
    newToast = (message) => {
        this.setState({toastMessage:message})
        this.child.current.show();
    };

    componentDidMount(){

        let params = {
            all:true
        }
        axios.post(`${baseUrlBackend}/list/task`, params)
        .then(response => {
            this.setState({
                listTasks:response.data.listTasks
            })

         
        }).catch(err => {

            if(err.response){
               if (err.response.status === 401){
                  this.newToast('Problemas na requisição')
               } else {
                  this.newToast('Ocorreu um erro de conexão') 
               }
            }
        })

        axios.post(`${baseUrlBackend}/list/user`, params)
        .then(response => {
  
            this.setState({
                listUsers:response.data.listUsers,
                users:{
                    options:response.data.listUsers,
                    labelSelect:"Autor:",
                    inputName:"users"
                }
            })
            localStorage.setItem('listUsers', JSON.stringify(response.data.listUsers))
        }).catch(err => {

            if(err.response){
               if (err.response.status === 401){
                  this.newToast('Problemas na requisição')
               } else {
                  this.newToast('Ocorreu um erro de conexão') 
               }
            }
        })
    }
  
    render(){
        return(
        <BrowserRouter>
            <div className="task-app">
                <Overlay {...this.state}/>
                <Logo />
                <Nav {...this.state}/>
                <Routes {...this.state}/>
                <Footer />
            </div>
        </BrowserRouter>
        )
    }
}
