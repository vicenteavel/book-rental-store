import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import api from '../../../services/api';

import Navbar from '../../../components/Navbar';

import './styles.css';

export default function Show() {
   const [book, setBook] = useState({});
   const { id }  = useParams();

   useEffect( () => {
      api.get(`/book/${id}`).then(response => {
         setBook(response.data);
      })
   }, [id]);

   return (
      <>
         <Navbar />

         {book && 
            <div className="show-book-container">
                  <h2>Book</h2>
                  <div className="fields">
                     <div className="field">
                        <strong>ID: </strong> 
                        <p> {book.id}</p>
                     </div>

                     <div className="field">
                        <strong>Title: </strong> 
                        <p> {book.title}</p>
                     </div>

                     <div className="field">
                        <strong>Author: </strong> 
                        <p> {book.author}</p>
                     </div>

                     <div className="field">
                        <strong>Value: </strong> 
                        <p> $ {book.value}</p>
                     </div>
                  </div>
            </div>
         }
      </>
   )
}
