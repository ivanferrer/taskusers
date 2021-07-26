import './ListTasks.scss'
import React, {useState, useEffect} from 'react'
import Main from '../templates/Main'
import Confirm from '../../components/confirm/Confirm'
import ExcludeItem from '../../components/actions/ExcludeItem'
import Button from '@material-ui/core/Button';

const ListTasks = props => {

    const headerProps = {
        icon: 'tasks',
        title: 'Tarefas',
        subtitle: 'Lista de tarefas cadastradas.',
    }
   
    const list = props.listTasks

    const [state, setState] = useState({ collection: [], count: 0 });

    useEffect(() => {
        setState({
            collection: list,
            count: list.count
          });
      
    }, [list])
   
    const openEditTask = (task) => {
        window.location.href=`/${task.task_id}/editar-tarefa`
    }

    if(state.collection.length > 0) {
        return (
            <Main {...headerProps}>
                <div className="content-list-tasks">
                    <ul>
                        {state.collection.map((task) => {

                            const dialogConfirm = {
                                question:"Tem certeza que deseja excluir esta tarefa?",
                                button:'Excluir',
                                yes:"Sim",
                                no:"Não",
                                classIcon:"fa fa-times-circle-o",
                                callback:() => {

                                    setState({collection: state.collection.filter(function(item) { 
                                        return item !== task
                                    })});

                                    return ExcludeItem(task, 'task')
                                }
                            }
                            return (
                                <li key={task.task_id}>
                                    <span>
                                        <span className="selo">
                                            <span>{task.task_id}</span>
                                        </span>
                                    </span>
                                    <span className="task">{task.name}</span>
                                    <Button variant="outlined" color="primary" onClick={(e) => openEditTask(task)}>
                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Editar
                                    </Button> 
                                    <Confirm {...dialogConfirm} />
                                </li>
                            )

                    })}
                    </ul>
                </div>
            </Main>
        )
    } else {
        return (<Main  {...headerProps}><div className="content-list-users"><h3>Não há tarefas para listar.</h3></div></Main>)
    }
 
}
export default ListTasks
