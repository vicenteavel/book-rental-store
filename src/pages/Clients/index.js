import React, { useState, useEffect } from 'react'
import { FiPlusCircle, FiEye, FiEdit, FiTrash2} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Navbar from '../../components/Navbar';

import './styles.css';


export default function Clients() {
   const [clients, setClients] = useState([]);
   const history = useHistory();

   useEffect( () => {
      api.get('/clients').then( response => {
         setClients(response.data);
      });
   }, [clients]);

   async function handleDelete(id) {
      if(window.confirm("Are you sure you want to delete?")) {
         await api.delete(`/client/${id}`);
         setClients([]); // to call the useEffect again
      }
   }

   return (
      <>
         <Navbar />
         <div className="client-container">
            <header>
               <h2>Clients</h2>
               <FiPlusCircle 
                  size={32}
                  color="green"
                  className="button"
                  onClick={ () => history.push('/clients/create') }
               />
            </header>

            <ul className="clients">
               {clients.map(client => (
                  <li key={client.id} >
                     <p>{client.id}</p>
                     <p>{client.name}</p>

                     <div className="actions">
                        <FiEye
                           size={20}
                           className="button"
                           onClick={() => history.push(`client/${client.id}`)}
                        />
                        <FiEdit 
                           size={20} 
                           className="button"
                           onClick={ () => history.push(`/client/edit/${client.id}`) }
                        />

                        <FiTrash2 
                           size={20} 
                           color="red" 
                           className="button"
                           onClick={ () => handleDelete(client.id)}
                        />
                     </div>
                  </li>
               ))}
               
            </ul>
         </div>
      </>
   );
}
