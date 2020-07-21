import React from 'react'
import { Link } from 'react-router-dom';
import { FiBook } from 'react-icons/fi';


import './styles.css';

export default function Navbar() {
   return (
      <div className="navbar">
         <div className="logo">
            <h2>Book Rental Store</h2>
            <FiBook size={28} className="icon"/>
         </div>

         <nav>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>

               <li>
                  <Link to="/clients">Clients</Link>
               </li>

               <li>
                  <Link to="/books">Books</Link>
               </li>
            </ul>
         </nav>
      </div>
   )
}
