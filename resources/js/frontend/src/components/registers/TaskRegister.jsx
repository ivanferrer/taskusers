import './TaskRegister.scss'
import React, {Component, Fragment, createRef} from 'react'
import Main from '../templates/Main'
import axios from 'axios'
import Toast from '../utils/Toast';
import baseUrl from '../../config/baseUrl'
import Select from '../../components/select/Select'

const baseUrlBackend = `${baseUrl.baseUrlBackend}`

const headerProps = {
    icon: 'calendar-check-o',
    title: 'Cadastro de Tarefa',
    subtitle: 'Preencha o formulário abaixo com as informações da tarefa.',
}
const currentDate = new Date()

export default class TaskRegister extends Component {
    constructor(props) {
        super(props)

        this.child = createRef()

        this.state = {
            name: this.props.name || "",
            description: this.props.description || "",
            startDate: this.props.startDate || this.formmatedCurrentDate(),
            endDate: this.props.endDate || this.formmatedCurrentDate(this.addDays(currentDate, 10)),
            isInfinite: this.props.isInfinite || true,
            toastMessage:"false",
            owner: this.props.owner || "",
            formRegister:{
                name:{
                    label:"Título da tarefa: ",
                    inputName:"task",
                    maxLength:45
                },
                description:{
                    label:"Descrição da tarefa: ",
                    inputName:"description",
                    maxLength:1000
                },
                infinite:{
                    label: "Infinito",
                    inputName:"infinite"
                },
                interval:{
                    startDate:{
                        label:"Data inicial:",
                        inputName:"start_date"
                    },
                    endDate:{
                        label: "Data final:",
                        inputName: "end_date"
                    }
                },
                users:this.props.users || {},
                permissionSubmit:false,
                submitButton:"Cadastrar"
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleToggleCheck = this.handleToggleCheck.bind(this)
        this.handleTaskNameChange = this.handleTaskNameChange.bind(this)
        this.handleTaskDescriptionChange = this.handleTaskDescriptionChange.bind(this)
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.handleChangeOption = this.handleChangeOption.bind(this)

    }

    formmatedCurrentDate(theDate) {
        const dateTime = theDate || currentDate
        return new Date(dateTime.getTime()-dateTime.getTimezoneOffset()*60000).toISOString().substring(0,19)
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.name && this.state.name !== '') {

            if (!this.state.isInfinite) {
              
                if (!this.state.startDate) {
                    this.newToast("A data inicial precisa ser registrada.")
                     return false
                }
                if (!this.state.endDate) {
                    this.newToast("A data final precisa ser registrada.")
                   return false
                }
                if (this.state.startDate && this.state.startDate) {
                    if (new Date(this.state.startDate).getTime() > new Date(this.state.endDate).getTime()) {
                        this.newToast("A data final precisa ser maior que a data inicial.")
                        return false
                    }
                }
            } 

            if(this.state.owner == "") {
               this.newToast("Selecione um usuário para a tarefa.")
               return false
            }

            let is_infinite = (this.state.isInfinite === true) ? 1 : 0
            let task = {
                name:this.state.name,
                description:this.state.description,
                is_infinite:is_infinite,
                start_date:this.state.startDate,
                end_date:this.state.endDate,
                is_active:1,
                user_id:this.state.owner
            }
            axios.post(`${baseUrlBackend}/add/task`,task)
            .then(response => {
                if (response.data.status) {
                    this.newToast("Tarefa cadastrada com sucesso!")
                    window.location.href = "/listar-tarefas"
                } else {
                    this.newToast(response.data.message)
                }
            }).catch(err => {
                switch(err.response.status) {
                    case 409: 
                    this.newToast("Tarefa já cadastrada!");
                    break
                    default:  
                    this.newToast("Ocorreu um erro com o servidor, tente novamente mais tarde.")
                }
            })
        } else {
            if (!this.state.name) {
                this.newToast("Preencha o nome da tarefa.")
            } else {
                this.newToast("Existem campos inválidos.")
            }
        }

    }

  

    componentDidMount() {
        this.setState({
            isInfinite:true
        })
    }

    handleToggleCheck() {
       this.setState({
           isInfinite:!this.state.isInfinite
       })
    }

    handleTaskNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleTaskDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    handleStartDateChange(event) {
        this.setState({startDate: event.target.value});
    }
    handleEndDateChange(event) {
        this.setState({endDate: event.target.value});
    }

    handleChangeOption(event) {
        this.setState({
            owner:event.target.value
        })
    }

    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    newToast = (message) => {
        this.setState({toastMessage:message}, () => {
            this.child.current.show()
        })
        
    }

    formInterval() {
        const { formRegister, startDate, endDate } = this.state
            return  (<Fragment>
                        <div className="form-control">
                        <label>{formRegister.interval.startDate.label}</label>
                                <input type="datetime-local" onChange={this.handleStartDateChange} name={formRegister.interval.startDate.inputName} id={formRegister.interval.startDate.inputName} value={startDate} min="2018-06-07T00:00" max="2018-06-14T00:00" />
                        </div>
                        <div className="form-control">
                        <label>{formRegister.interval.endDate.label}</label>
                                <input type="datetime-local" onChange={this.handleEndDateChange} name={formRegister.interval.endDate.inputName} id={formRegister.interval.endDate.inputName} value={endDate} />
                        </div>
                   </Fragment>)
    }

    collectionSelect() {
        
        const { listUsers } = this.props
        const { owner } = this.state

        const result = listUsers.map((value) => {
                        return {
                            title:value.username,
                            value:value.id,
                            id:value.id
                        }
        }) || []


        result.unshift({
            title:"Selecione",
            value:"",
            id:0
        })
        const dataOptions = {
            options:result,
            labelSelect:"Autor:",
            inputName:"users",
            defaultValue:owner,
            handleChangeOption:this.handleChangeOption
        }

        return ( <Select {...dataOptions} />)
    }

    render() {

        const { formRegister, isInfinite, name, description, owner, toastMessage } = this.state

        const dateInterval = this.formInterval()

        let isChecked = (isInfinite) ? 'checked' : ''

        const selectUsers = this.collectionSelect()

        return (
              
            <Fragment>
                <Main {...headerProps}>
                <Toast message={toastMessage} time={3000} ref={this.child}/>
                    <form>
                        <div className="form-control">
                            <label>{formRegister.name.label}</label>
                            <input id={formRegister.name.inputName} name={formRegister.name.inputName} onChange={this.handleTaskNameChange} type="text" value={name} maxLength={formRegister.name.maxLength} />
                        </div>
                        <div className="form-control">
                            <label>{formRegister.description.description}</label>
                            <textarea name={formRegister.description.inputName} onChange={this.handleTaskDescriptionChange} id={formRegister.description.inputName} rows="20" defaultValue={description} cols="50" maxLength={formRegister.description.maxLength}></textarea>
                        </div>
                        {selectUsers}
                        <div className="form-control">
                            <label>{formRegister.infinite.label}</label>
                            <input onChange={this.handleToggleCheck} checked={isChecked} value={'1'} id={formRegister.infinite.inputName} name={formRegister.infinite.inputName} type="checkbox" />
                        </div>
                         {!isInfinite && dateInterval}
                        <div className="d-flex  flex-row-reverse">
                            <button className="btn btn-submit" onClick={e=>this.handleSubmit(e)}>{formRegister.submitButton}</button>
                        </div>
                    </form>
                </Main>
            </Fragment>
        )
    }
}