import React, { Component, Fragment, createRef } from 'react'
import './FormLogin.scss'
import axios from 'axios'
import Toast from '../utils/Toast';
import Main from './Main';

const headerProps = {
    icon: 'sign-in',
    title: 'Login',
    subtitle: 'Você precisa estar logado para acessar o sistema.',
}

const baseUrlBackend = 'http://local.task.com.br/backend/'

export default class FormLogin extends Component {
    constructor(props){
        super(props)

        this.child = createRef()

        this.state = {
            login: {
                input1_placeholder: props.input1_placeholder || '',
                input2_placeholder: props.input2_placeholder || '',
                input1_label: props.input1_label,  
                input2_label: props.input2_label,                              //Label of this form
                input1_textHelper: props.input1_textHelper || '',        //Default text message
                input2_textHelper: props.input2_textHelper || '',     
                username: '',  
                password: '',                                      //Form value
                input1_invalidList: [], 
                input2_invalidList: [],                                //list of failed validations - if empity the form is valid
                changed: false,                                 //This form has been changed at lest 1 time ? -used to not render error style when page load-
                validation: props.validation,
                setFormValid: this.setFormValid
            }
       
        }
    }

    setFormValid(form, value){
        switch(form){
            // case 'Username' : this.setState({username:value}); break
            // case 'Password' : this.setState({password:value}); break
            case 'username' : 
            this.setState({
                    login:{
                        username: value
                    }
                }); 
                break
            case 'password' : 
            this.setState({
                    login:{
                        password:value
                    }
                }); 
                break
            default: 
        }
        //this.setstate( {this.state[form]:value} )
    }

    handleSubmit(e){
        e.preventDefault()
        if (this.state.login.username && this.state.login.password) {
            let user = {
                username:this.state.login.username,
                password:this.state.login.password
            }
            axios.post(`${baseUrlBackend}/login`, user).then(response => {
               // console.log(resp)
                localStorage.setItem('SessionToken', response.data.token)
                this.newToast("Bem vindo!");
                window.location.href = "/home"
            }).catch(err => {
                switch(err.response.status){
                    case 401: 
                         this.newToast("Nome de usuário ou senha errados. Por favor tente novamente.");
                    break
                    default:  
                         this.newToast("Ocorreu um erro com o servidor, tente novamente mais tarde.")
                }
            })
        }else{
            if(!this.state.login.password || !this.state.login.username){
                this.newToast("Todos os campos devem ser preenchidos.")
            }else{
                this.newToast("Existem campos inválidos.")
            }
        }
        
    }

    
    render(){
           const { login } = this.state
        return(
            <Fragment>
                <Toast message={this.state.toastMessage} time={3000} ref={this.child}/>
                <Main {...headerProps}>
                    <div className="col-12 col-sm-6 col-md-6 ">
                        <div className="form-group">
                            <label>{login.input1_label}</label>
                            <input type="text" className={`form-control`} id="username"
                            name={login.input1} value={login.username} 
                            placeholder={login.input1_placeholder}/>
                        </div>
                        <div className="form-group">
                            <label>{login.input2_label}</label>
                            <input type="password" className={`form-control`} id="password"
                            name={login.input2} value={login.password} 
                            placeholder={login.input2_placeholder}/>
                        </div>
                        <div className="d-flex  flex-row-reverse">
                            <input className="btn btn-primary" type="submit" value="Entrar" onClick={(e) => this.handleSubmit(e)}/>
                        </div>
                    </div>
                </Main>
            </Fragment>
        )}
}