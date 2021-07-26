import './ListUsers.scss'
import React, {useState, useEffect} from 'react'
import Main from '../templates/Main'
import Confirm from '../confirm/Confirm';
import ExcludeItem from '../../components/actions/ExcludeItem'
import Button from '@material-ui/core/Button';

const ListUsers = props => {

    const list = props.listUsers || []

    const [state, setState] = useState({ collection: [], count: 0 });

    useEffect(() => {
        setState({
            collection: list,
            count: list.count
          });
      
    }, [list])

    const headerProps = {
        icon: 'users',
        title: 'Usuários',
        subtitle: 'Lista de usuários cadastrados.',
    }

    const openEditUser = (user) => {
        window.location.href=`/${user.id}/editar-usuario`
    }
   
    if(state.collection.length > 0) {
        return (
            <Main {...headerProps}>
            <div className="content-list-users">
                <ul>
                {state.collection.map((user, index) => {

                    const dialogConfirm = {
                        question:"Tem certeza que deseja excluir este usuário?",
                        button:'Excluir',
                        class_icon:'',
                        yes:"Sim",
                        no:"Não",
                        classIcon:"fa fa-times-circle-o",
                        callback:() => {
                            setState({collection: state.collection.filter(function(item) { 
                                return item !== user
                            })});

                            return ExcludeItem(user, 'user')
                        }
                    }
  
                    return (
                        <li key={user.id}>
                            <span>
                                <span className="selo">
                                    <span>{user.id}</span>
                                </span>
                            </span>
                            
                            <span className="username">{user.username}</span> 
                            <Button variant="outlined" color="primary" onClick={(e) => openEditUser(user)}>
                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Editar
                            </Button> 
                            <Confirm {...dialogConfirm} />
                            <span className="status" title={(user.is_active == 1) ? 'Status: ativo' : 'Status: inativo'}><i className={(user.is_active == 1) ? 'fa fa-check' : 'fa fa-ban'} aria-hidden="true"></i> </span>
                        </li>
                    )
                })}
                </ul>
            </div>
            </Main>
        )
    } else {
        return (<Main {...headerProps}><div className="content-list-users"><h3>Não há usuários para listar.</h3></div></Main>)
    }
 
}
export default ListUsers
