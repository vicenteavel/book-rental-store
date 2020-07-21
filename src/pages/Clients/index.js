import React from 'react'
import { FiPlusCircle, FiEye, FiEdit, FiTrash2} from 'react-icons/fi';

import Navbar from '../../components/Navbar';

import './styles.css';

const clients = [
   { id: 1, name: "Vicente Avelino", email: "vicente@email.com.br" },
   { id: 2, name: "José Avelino", email: "jose@email.com.br" },
   { id: 3, name: "Josinalva Avelino", email: "josinalva@email.com.br" },
   { id: 4, name: "Vinicius Avelino", email: "vinicius@email.com.br" },
   { id: 5, name: "Vitor Avelino", email: "vitor@email.com.br" },
   { id: 6, name: "Fernanda Patrícia", email: "fernanda@email.com.br" },
];

export default function Clients() {
   return (
      <>
         <Navbar />
         <div className="client-container">
            <header>
               <h2>Clients</h2>
               <FiPlusCircle size={32} color="green" className="button" />
            </header>

            <ul className="clients">
               {clients.map(client => (
                  <li key={client.id} >
                     <p>{client.id}</p>
                     <p>{client.name}</p>

                     <div className="actions">
                        <FiEye size={20} className="button" />
                        <FiEdit size={20} className="button"/>
                        <FiTrash2 size={20} color="red" className="button" />
                     </div>
                  </li>
               ))}
               
            </ul>
         </div>
      </>
   );
}
