import React, {useRef} from 'react'
import axios from 'axios'
import Toast from '../utils/Toast'

import baseUrl from '../../config/baseUrl'


const ExcludeItem = (item, type) => {

   const baseUrlBackend = `${baseUrl.baseUrlBackend}`

   const newToast = message => {
      const propsToast = {
         message:message,
         time:3000
      }

      return  (<Toast {...propsToast} />).show()

   }

   switch(type) {
      case 'task':
         axios.post(`${baseUrlBackend}/delete/task`, item)
         .then(response => {
               if(response.data.status) {
                  newToast('Tarefa excluída com sucesso!') 
               }
         }).catch(err => {
               if(err.response){
                  if (err.response.status === 401){
                     newToast('Problemas na requisição')
                  } else {
                     newToast('Ocorreu um erro de conexão') 
                  }
               }  
         })
      
         break; 
         case 'user':
         axios.post(`${baseUrlBackend}/delete/user`, item)
         .then(response => {
               if(response.data.status) {
                  newToast('usuário excluído com sucesso!') 
               }
         }).catch(err => {
               if(err.response){
                  if (err.response.status === 401){
                     newToast('Problemas na requisição')
                  } else {
                     newToast('Ocorreu um erro de conexão') 
                  }
               }  
         })
      
         break;     
   }

   
}

export default ExcludeItem;