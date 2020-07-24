import React, { useRef, useEffect, useState } from 'react'
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom'

import api from '../../../services/api';

import Navbar from '../../../components/Navbar';
import Input from '../../../components/Input';
import Select from '../../../components/Select';

import './styles.css';

export default function Create() {
   const formRef = useRef(null);
   const history = useHistory();
   const [clients, setClients] = useState([]);
   const [books, setBooks] = useState([]);


   useEffect(() => {
      let isCancelled = false;

      api.get('/clients').then(response => {
         if(!isCancelled)
            setClients(response.data);
      });

      api.get('/books').then(response => {
         if(!isCancelled)
            setBooks(response.data);
      });

      return () => {
         isCancelled = true;
      }
      
   }, [books, clients]);

   async function handleSubmit(data, { reset }) {
      try {

         const schema = Yup.object().shape({
            client: Yup.number().required('The Client is required'),
            book: Yup.string().required('The Book is required'),
            reserved_at: Yup.date().typeError('The Reserve in must be a valid date').required('The Reserve in is required'),
            reserved_until: Yup.date().typeError('The Reserved until must be a valid date').required('The Reserved until is required'),
         });

         await schema.validate(data, { abortEarly: false });

         // validate rental date
         const reservationDay = new Date(data.reserved_at);
         const reservationDayUntil = new Date(data.reserved_until);

         const response =  await api.get('/rents');
         const rents = response.data;
      
         const rentsFiltered = rents.filter(rent => {
            return rent.book.id === Number(data.book);
         });
      
         const itemRented = rentsFiltered.find( rent => {
            const rented_until = new Date(rent.rented_until);
            return (reservationDay <= rented_until || reservationDayUntil <= rented_until);
         });

         if(itemRented) {
            const { rented_until } = itemRented

            alert(`Book already rented until: ${rented_until}`);
            return;
         }

         const result  = await api.get('/reservations');
         const reservations = result.data;

         const reservationsFiltered = reservations.filter(reservation => {
            return reservation.book.id === Number(data.book);
         });

         const itemReserved = reservationsFiltered.find(reservation => {
            const reserved_at = new Date(reservation.reserved_at);
            const reserved_until = new Date(reservation.reserved_until);

            return (reservationDay <= reserved_until && reservationDay >= reserved_at)
               ||  (reservationDayUntil <= reserved_until && reservationDay >= reserved_at);
         });
         
         if(itemReserved) {
            const { reserved_at, reserved_until } = itemReserved;

            alert(`Book already reserved: ${reserved_at} to ${reserved_until}`);
            return;
         }

         // final validate rental date
   
         await api.post('/reservation/create', {
            client_id: data.client,
            book_id: data.book,
            reserved_at: data.reserved_at,
            reserved_until: data.reserved_until,
         });

         formRef.current.setErrors({});

         reset();
         history.push('/reservations');
      } catch(error) {
         if (error instanceof Yup.ValidationError) {
            const errorMessages = {};

            error.inner.forEach(e => {
               errorMessages[e.path] = e.message;
            });

            formRef.current.setErrors(errorMessages);

         }
      }
   }

   return (
      <>
         <Navbar />
         <div className="create-reservation-container">
            <Form ref={formRef} onSubmit={handleSubmit} >
               <h2>Reserve</h2>
               <Select name="client" label="Client" data={clients} />

               <Select name="book" label="Book" data={books} />

               <Input name="reserved_at" label="Reserve in" type="date" />
               <Input name="reserved_until" label="Reserved until" type="date" />

               <button type="submit">Create</button>
            </Form>
         </div>
      </>
   )
}
