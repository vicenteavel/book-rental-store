import React, { useEffect, useState } from 'react'

import api from '../../services/api';

import Navbar from '../../components/Navbar';

import './styles.css';

export default function Dashboard() {
   const [returnedBooksInRents, setReturnedBooksInRents] = useState([]);
   const [rentedBooksInRents, setRentedBooksInRents] = useState([]);
   
   const [returnedBooksInReservations, setReturnedBooksInReservations] = useState([]);
   const [rentedBooksInReservations, setRentedBooksInReservations] = useState([]);

   useEffect(() => {
      // setting up a week
      const today = new Date();
      today.setHours(0);
      today.setSeconds(0);

      const oneWeekInDays = 7;
      const oneWeekLater = new Date();
      oneWeekLater.setDate(today.getDate() + oneWeekInDays);
      oneWeekLater.setHours(0);

      api.get('/rents').then(response => {
         const allRents = response.data;

         const rentsAtFiltered = allRents.filter(rent => {
            
            const rented_at = new Date(rent.rented_at);
            rented_at.setDate(rented_at.getDate() + 1);

            return (rented_at <= oneWeekLater && rented_at >= today);
         });

         const rentsUntilFiltered = allRents.filter(rent => {
            const rented_until = new Date(rent.rented_until);
            rented_until.setDate(rented_until.getDate() + 1);

            return (rented_until <= oneWeekLater && rented_until >= today);
         });
         
         setRentedBooksInRents(rentsAtFiltered.map(rent => rent.book));
         setReturnedBooksInRents(rentsUntilFiltered.map(rent => rent.book));
      });

      api.get('/reservations').then(response => {
         const allReservations = response.data;
         const reservationsAtFiltered = allReservations.filter(reservation => {
            const rented_at = new Date(reservation.rented_at);
            rented_at.setDate(rented_at.getDate() + 1);

            return (rented_at <= oneWeekLater && rented_at >= today);
         });

         const reservationsUntilFiltered = allReservations.filter(reservation => {
            const rented_until = new Date(reservation.rented_until);
            rented_until.setDate(rented_until.getDate() + 1);

            return (rented_until <= oneWeekLater && rented_until >= today);
         });

         setRentedBooksInReservations(reservationsAtFiltered.map(rent => rent.book));
         setReturnedBooksInReservations(reservationsUntilFiltered.map(rent => rent.book));
      });
   }, []);

   return (
      <>
         <Navbar />
         <div className="dashboard-container">
            <div className="weekly-container">
               <h2>Books to be returned this week</h2>

               <ul>
                  {
                     returnedBooksInRents.map(book => (
                        <li key={book.id}>
                           <p> <b>Title: </b> {book.title}</p> 
                           <p> <b>Author: </b> {book.author}</p> 
                           <p> <b>Value: </b> $ {book.value}</p> 
                           
                        </li>
                     ))
                  }
                  {
                     returnedBooksInReservations.map(book => (
                        <li key={book.id}>
                           <p> <b>Title: </b> {book.title}</p> 
                           <p> <b>Author: </b> {book.author}</p> 
                           <p> <b>Value: </b> $ {book.value}</p> 
                           
                        </li>
                     ))
                  }
               </ul>

            </div>

            <div className="weekly-container">
               <h2>Books rented this week</h2>

               <ul>
                  {
                     rentedBooksInRents.map(book => (
                        <li key={book.id}>
                           <p> <b>Title: </b> {book.title}</p> 
                           <p> <b>Author: </b> {book.author}</p> 
                           <p> <b>Value: </b> $ {book.value}</p> 
                           
                        </li>
                     ))
                  }

                  {
                     rentedBooksInReservations.map(book => (
                        <li key={book.id}>
                           <p> <b>Title: </b> {book.title}</p> 
                           <p> <b>Author: </b> {book.author}</p> 
                           <p> <b>Value: </b> $ {book.value}</p> 
                           
                        </li>
                     ))
                  }

               </ul>

            </div>

         </div>

      </>
   )
}
