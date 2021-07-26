import './UserRegister.scss'
import React, {Component, Fragment, createRef} from 'react'
import Main from '../templates/Main'
import axios from 'axios'
import Toast from '../utils/Toast';
import baseUrl from '../../config/baseUrl'
import Select from '../../components/select/Select'

const baseUrlBackend = `${baseUrl.baseUrlBackend}`

const headerProps = {
    icon: 'user',
    title: 'Registro de Usuário',
    subtitle: 'Preencha o formulário abaixo para cadastrar um usuário.',
}

export default class EditUser extends Component {
    constructor(props) {
        super(props)

        this.child = createRef()

        this.state = {
            name: this.props.name || '',
            username: this.props.username || '',
            password: this.props.password || '',
            is_active:1,
            repeat_password:'',
            role: this.props.role || 'admin',
            toastMessage:'false',
            errorForm:[],
            formRegister:{
                name:{
                    label:"Nome:",
                    inputName:"name",
                    maxLength:85
                },
                username:{
                    label:"Usuário:",
                    inputName:"username",
                    maxLength:20
                },
                password:{
                    label:"Senha:",
                    inputName:"password",
                    maxLength:150
                },
                repeat_password:{
                    label:"Repita a senha:",
                    inputName:"repeat_password",
                    maxLength:150
                },
                roles:{
                    options:[
                        {
                            id:1,
                            title:'Administrativo',
                            value:'admin'
                        },
                        {
                            id:2,
                            title:'Editor',
                            value:'editor'
                        },
                        {
                            id:3,
                            title:'Consultor',
                            value:'consult'
                        }
                    ],
                    labelSelect:"Perfil de acesso:",
                    inputName:"role"
                },
                submitButton:"Cadastrar"

            }
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this)
        this.handleChangeOption = this.handleChangeOption.bind(this)

    }

    isValidUser() {
        const {name, username, password, repeat_password} = this.state

        const validate = {
            errors:[]
        }

        if (!name || name == '') {
            validate.errors.push('O nome precisa ser preenchido.');
        }
        if (name && name != '') {
            if(name.length < 3 || name.length > 85) {
                validate.errors.push('O nome precisa ter de 3-85 caracteres.');
            }
        }
        if (!username || username == '') {
            validate.errors.push('O nome de usuário precisa ser preenchido.');
        }

        const regExp = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
        if (!regExp.test(username)) {
            validate.errors.push('O nome de usuário precisa ser válido.');
        }
        if (username && username != '') {
            if (username.length < 4 || username.length > 20) {
                validate.errors.push('O usuário precisa ter de 4-20 caracteres.');
            }
        }
        if (!password || password == '') {
            validate.errors.push('A senha precisa ser preenchida.');
        }
        if (!repeat_password || repeat_password == '') {
            validate.errors.push('O campo repita a senha precisa ser preenchido.');
        }
        if (password && password != '') {
            if (password.length < 6) {
                validate.errors.push('A senha precisa ser ao menos 6 caracteres.');
            }
            if (password.length > 149) {
                validate.errors.push('A senha precisa ser menor que 150 caracteres.');
            }
        }
        if (repeat_password && repeat_password != '' && password && password != '') {
            if (password !== repeat_password) {
               validate.errors.push('As senhas digitadas precisam ser iguais');
            }
        }
        if (validate.errors.length > 0) {
            this.setState({errorForm:validate.errors})
            return false
        } else {
            this.setState({errorForm:[]})
           
        }
        return true;
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.isValidUser()) {

            const { formRegister, name, username, password, is_active, role } = this.state

            let user = {
                name:name,
                username:username,
                password:password,
                is_active:is_active,
                role:role
            }
            console.log(`${baseUrlBackend}/add/user`)
            axios.post(`${baseUrlBackend}/add/user`, user)
            .then(response => {
                if(response.data.status) {
                    console.log(response)
                    this.newToast("Usuário cadastrado com sucesso!")
                    window.location.href = "/listar-usuarios"
                } else {
                    const validate = {
                        errors:[response.data.message]
                    }
                    if (validate.errors.length > 0) {
                        this.newToast("Problemas encontrados!")
                        this.setState({errorForm:validate.errors})
                    } else {
                        this.setState({errorForm:[]})
                    }

                }
            }).catch(err => {
                console.log(err.response.status)
                switch(err.response.status){
                    case 409: 
                        this.newToast("Usuário já possui cadastro!");
                    break
                    default:  
                          this.newToast("Ocorreu um erro com o servidor, tente novamente mais tarde.")
                }
            })
        } else {
            this.newToast("Problemas encontrados!")
        }

    }

    messageError() {
       
        const { errorForm } = this.state
        if (errorForm.length > 0) {
          return (<div className="errors">
                    <ul>
                        {errorForm.map((errorItem) => {
                            return <li key={errorItem}>{errorItem}</li>
                        })}
                    </ul>
                 </div>)
        }
    }

    newToast = (message) => {
        this.setState({toastMessage:message}, () => {
            this.child.current.show()
        })
    }

    handleNameChange(event) {
        this.setState({
            name:event.target.value
        })
    }

    handleUsernameChange(event) {
        this.setState({
            username:event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password:event.target.value
        })
    }

    handleRepeatPasswordChange(event) {
        this.setState({
            repeat_password:event.target.value
        })
    }

    handleChangeOption(event) {
        this.setState({
            role:event.target.value
        })
    }

    render() {

        const { formRegister, name, username, password, repeat_password, role } = this.state

        const messError = this.messageError()

        return (
              
            <Fragment>
                <Main {...headerProps}>
                <Toast message={this.state.toastMessage} time={3000} ref={this.child}/>
                    <form>
                       {messError}
                        <div className="form-control">
                            <label>{formRegister.name.label}</label>
                            <input onChange={this.handleNameChange} id={formRegister.name.inputName} name={formRegister.name.inputName} type="text" value={name} maxLength={formRegister.name.maxLength} />
                        </div>
                        <div className="form-control">
                            <label>{formRegister.username.label}</label>
                            <input onChange={this.handleUsernameChange} id={formRegister.username.inputName} name={formRegister.username.inputName} type="text" value={username} maxLength={formRegister.username.maxLength} />
                        </div>
                        <div className="form-control">
                            <label>{formRegister.password.label}</label>
                            <input onChange={this.handlePasswordChange} id={formRegister.password.inputName} name={formRegister.password.inputName} type="password" value={password} maxLength={formRegister.password.maxLength} />
                        </div>
                        <div className="form-control">
                            <label>{formRegister.repeat_password.label}</label>
                            <input onChange={this.handleRepeatPasswordChange} id={formRegister.repeat_password.inputName} name={formRegister.repeat_password.inputName} type="password" value={repeat_password} maxLength={formRegister.repeat_password.maxLength} />
                        </div>
                        <Select {...formRegister.roles} handleChangeOption={this.handleChangeOption} defaultValue={role} />
                        <div className="d-flex  flex-row-reverse final-buttons">
                            <button className="btn btn-submit" onClick={e=>this.handleSubmit(e)}>{formRegister.submitButton}</button>
                        </div>
                    </form>
                </Main>
            </Fragment>
        )
    }
}