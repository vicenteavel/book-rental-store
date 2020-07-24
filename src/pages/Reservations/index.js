import React, { useEffect, useState } from 'react';
import { FiShoppingCart, FiXCircle  } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Navbar from '../../components/Navbar';

import './styles.css';

export default function Reservations() {
   const [reservations, setReservations] = useState([]);
   const history = useHistory();

   useEffect(() => {
      api.get('/reservations').then(response => {
         setReservations(response.data);
      });
   }, [reservations]);
   
   async function handleDelete(id) {
      if(window.confirm("Are you sure you want to delete?")) {
         await api.delete(`/reservation/${id}`);
         setReservations([]); // to call the useEffect again
      }
   }
   
   return (
      <>
         <Navbar />
         <div className="reservation-container">
            <header>
               <h2>Reservations</h2>
               <FiShoppingCart
                  size={32}
                  color="green"
                  className="button"
                  onClick={()=> history.push('/reservation/create')}
               />
            </header>

            <ul className="reservations">
               {reservations.map(reservation => (
                  <li key={reservation.id} >
                     <p>
                        <strong>{reservation.client.name}</strong>
                        {" reserved "}
                        <strong>{reservation.book.title}</strong>
                     </p>
                     <FiXCircle
                        color="red"
                        size={28}
                        className="button"
                        onClick={() => handleDelete(reservation.id)}
                     />
                     
                  </li>
               ))}
               
            </ul>
         </div>
      </>
   );
}
