import React from 'react'
import { FiShoppingCart, FiXCircle  } from 'react-icons/fi';

import Navbar from '../../components/Navbar';

import './styles.css';

const rents = [
   { id:1,  client: "Vicente Avelino", book_rented: "Pride and Prejudice" },
   { id:2,  client: "Vinicius Avelino", book_rented: "Pride and Prejudice" },
   { id:3,  client: "José Avelino", book_rented: "Pride and Prejudice" },
   { id:4,  client: "Josinalva Avelino", book_rented: "Pride and Prejudice" },
   { id:5,  client: "Vitor Avelino", book_rented: "Pride and Prejudice" },
]


export default function Rents() {
   return (
      <>
         <Navbar />
         <div className="rent-container">
            <header>
               <h2>Rents</h2>
               <FiShoppingCart size={32} color="green" className="button" />
            </header>

            <ul className="rents">
               {rents.map(rent => (
                  <li key={rent.id} >
                     <p>
                        <strong>{rent.client}</strong>
                        {" rented "}
                        <strong>{rent.book_rented}</strong>
                     </p>
                     <FiXCircle color="red" size={28} className="button" />
                     
                  </li>
               ))}
               
            </ul>
         </div>
      </>
   );
}
