import './EditUser.scss'
import React, {Component, Fragment, createRef} from 'react'
import Main from '../templates/Main'
import axios from 'axios'
import Toast from '../utils/Toast';
import baseUrl from '../../config/baseUrl'
import Select from '../../components/select/Select'
import { Link } from 'react-router-dom';


const baseUrlBackend = `${baseUrl.baseUrlBackend}`

const headerProps = {
    icon: 'user',
    title: 'Editar Usuário',
    subtitle: 'Preencha o formulário abaixo para atualizar o usuário.',
}

export default class UserRegister extends Component {
    constructor(props) {
        super(props)

        this.child = createRef()

        this.state = {
            id: this.props.id,
            name: this.props.name || '',
            username: this.props.username || '',
            password: this.props.password || '',
            repeat_password:this.props.password || '',
            isActive: Boolean(parseInt(this.props.is_active)) || true,
            role: this.props.role || 'admin',
            toastMessage:'false',
            errorForm:[],
            formUpdate:{
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
                is_active:{ 
                    label:"Ativo:",
                inputName:"is_active",
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
                submitButton:"Atualizar",
                cancelButton:"Cancelar"

            }
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this)
        this.handleToggleCheck = this.handleToggleCheck.bind(this)
        this.handleChangeOption = this.handleChangeOption.bind(this)
        this.handleCancel = this.handleCancel.bind(this)

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
        const regExp =/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
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
            return true;
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.isValidUser()) {

            const { id, name, username, password, isActive, role } = this.state

            let is_active = (isActive === true) ? 1 : 0

            let user = {
                id: id,
                name:name,
                username:username,
                password:password,
                is_active:is_active,
                role:role
            }
            axios.post(`${baseUrlBackend}/update/user`, user, { "Content-Type": "multipart/form-data" })
            .then(response => {
                if(response.data.status) {
                    console.log(response)
                    this.newToast("Usuário atualizado com sucesso!")
                    setTimeout(() => {
                        window.location.href = "/listar-usuarios"
                    }, 1000)
                } else {

                    const validate = {
                        errors:[response.data.message]
                    }
                    this.newToast("Existem campos inválidos.")

                    if (validate.errors.length > 0) {
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
            if (!this.state.name && !this.state.username && !this.state.password && !this.state.repeat_password ) {
                this.newToast("Todos os campos devem ser preenchidos.")
            } else {
                this.newToast("Existem campos inválidos.")
            }
        }

    }

    messageError() {
       
        const { errorForm } = this.state
        if (errorForm.length > 0) {
          return (<div className="errors">
                    <ul>
                        {errorForm.map((errorItem) => {
                            return <li key={errorItem}>-{errorItem}</li>
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
    handleToggleCheck() {
        this.setState({
            isActive:!this.state.isActive
        })
    }

    handleCancel(event) {
        window.location.href=`/listar-usuarios`
    }

    getEntityUser(id) {

        axios.get(`${baseUrlBackend}/show/user/${id}`)
        .then(resp => {
            const {name, username, password, is_active, role } = {...resp.data}

            this.state.name = name;
           
            this.setState({
               name:name,
               username:username,
               password:password,
               repeat_password:password,
               isActive:Boolean(parseInt(is_active)),
               role:role
            })

        }).catch(err => {
            console.log(err.response)
        })
    }

    componentDidMount() {
        this.getEntityUser(this.props.id);
    }

    handleChangeOption(event) {
        this.setState({
            role:event.target.value
        })
    }
    render() {

        const { formUpdate, name, username, password, repeat_password, isActive, role } = this.state

        const messError = this.messageError()

        let isChecked = (isActive === true) ? 'checked': ''

        return (
              
            <Fragment>
                <Main {...headerProps}>
                <Toast message={this.state.toastMessage} time={3000} ref={this.child}/>
                    <form>
                        {messError}
                        <div className="form-control">
                            <label>{formUpdate.name.label}</label>
                            <input onChange={this.handleNameChange} id={formUpdate.name.inputName} name={formUpdate.name.inputName} type="text" value={name} maxLength={formUpdate.name.maxLength} />
                        </div>
                        <div className="form-control">
                            <label>{formUpdate.username.label}</label>
                            <input onChange={this.handleUsernameChange} id={formUpdate.username.inputName} name={formUpdate.username.inputName} type="text" value={username} maxLength={formUpdate.username.maxLength} />
                        </div>
                        <div className="form-control">
                            <label>{formUpdate.password.label}</label>
                            <input onChange={this.handlePasswordChange} id={formUpdate.password.inputName} name={formUpdate.password.inputName} type="password" value={password} maxLength={formUpdate.password.maxLength} />
                        </div>
                        <div className="form-control">
                            <label>{formUpdate.repeat_password.label}</label>
                            <input onChange={this.handleRepeatPasswordChange} id={formUpdate.repeat_password.inputName} name={formUpdate.repeat_password.inputName} type="password" value={repeat_password} maxLength={formUpdate.repeat_password.maxLength} />
                        </div>
                        <div className="form-control">
                            <label>{formUpdate.is_active.label}</label>
                            <input checked={isChecked} onChange={this.handleToggleCheck} value={'1'} id={formUpdate.is_active.inputName} name={formUpdate.is_active.inputName} type="checkbox" />
                        </div>
                        <Select {...formUpdate.roles} handleChangeOption={this.handleChangeOption} defaultValue={role} />
                        <div className="d-flex  flex-row-reverse final-buttons">
                            <Link to='/listar-usuarios' className="btn btn-cancel">{formUpdate.cancelButton}</Link>
                            <button className="btn btn-submit" onClick={e=>this.handleSubmit(e)}>{formUpdate.submitButton}</button>
                        </div>
                    </form>
                </Main>
            </Fragment>
        )
    }
}