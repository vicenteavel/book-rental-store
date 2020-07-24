import React, { useEffect, useState } from 'react';
import { FiShoppingCart, FiXCircle  } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Navbar from '../../components/Navbar';

import './styles.css';

export default function Rents() {
   const [rents, setRents ] = useState([]);
   const history = useHistory();

   useEffect(() => {
      api.get('/rents').then(response => {
         setRents(response.data);
      });
   }, [rents]);

   async function handleDelete(id) {
      if(window.confirm("Are you sure you want to delete?")) {
         await api.delete(`/rent/${id}`);
         setRents([]); // to call the useEffect again
      }
   }

   return (
      <>
         <Navbar />
         <div className="rent-container">
            <header>
               <h2>Rents</h2>
               <FiShoppingCart 
                  size={32} 
                  color="green" 
                  className="button"
                  onClick={() => history.push('/rent/create')}
               />
            </header>

            <ul className="rents">
               {rents.map(rent => (
                  <li key={rent.id} >
                     <p>
                        <strong>{rent.client.name}</strong>
                        {" rented "}
                        <strong>{rent.book.title}</strong>
                     </p>
                     <FiXCircle 
                        color="red"
                        size={28}
                        className="button"
                        onClick={() => handleDelete(rent.id)}
                     />
                     
                  </li>
               ))}
               
            </ul>
         </div>
      </>
   );
}
