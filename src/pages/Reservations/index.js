import React from 'react'
import { FiShoppingCart, FiXCircle  } from 'react-icons/fi';

import Navbar from '../../components/Navbar';

import './styles.css';

const reservations = [
   { id:1,  client: "Vicente Avelino", book_reserved: "Pride and Prejudice" },
   { id:2,  client: "Vinicius Avelino", book_reserved: "Pride and Prejudice" },
   { id:3,  client: "José Avelino", book_reserved: "Pride and Prejudice" },
   { id:4,  client: "Josinalva Avelino", book_reserved: "Pride and Prejudice" },
   { id:5,  client: "Vitor Avelino", book_reserved: "Pride and Prejudice" },
]

export default function Reservations() {
   return (
      <>
         <Navbar />
         <div className="reservation-container">
            <header>
               <h2>Reservations</h2>
               <FiShoppingCart size={32} color="green" className="button" />
            </header>

            <ul className="reservations">
               {reservations.map(reservations => (
                  <li key={reservations.id} >
                     <p>
                        <strong>{reservations.client}</strong>
                        {" reserved "}
                        <strong>{reservations.book_reserved}</strong>
                     </p>
                     <FiXCircle color="red" size={28} className="button" />
                     
                  </li>
               ))}
               
            </ul>
         </div>
      </>
   );
}
