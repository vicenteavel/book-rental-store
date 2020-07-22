import React, { useState, useEffect } from 'react'
import { FiPlusCircle, FiEye, FiEdit, FiTrash2} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Navbar from '../../components/Navbar';

import './styles.css';

// export const books = [
//    { id: 1, id_client: 1, title: "Moby-Dick", author: "Herman Melville" },
//    { id: 2, id_client: null, title: "A Tale of Two Cities", author: "Charles Dickens" },
//    { id: 3, id_client: null, title: "Pride and Prejudice", author: "Jane Austen" },
//    { id: 4, id_client: null, title: "The Catcher in the Rye", author: "J. D. Salinger" },
//    { id: 5, id_client: null, title: "Nineteen Eighty-Four", author: "George Orwell" }, 
// ];

export default function Books() {
   const [books, setBooks] = useState([]);
   const history = useHistory();

   useEffect(() => {
      api.get('/books').then(response => {
         setBooks(response.data);
      })
   }, [books]);

   async function handleDelete(id) {
      if(window.confirm("Are you sure you want to delete?")) {
         await api.delete(`/book/${id}`);
         setBooks([]); // to call the useEffect again
      }
   }

   return (
      <>
         <Navbar />
         <div className="book-container">
            <header>
               <h2>Books</h2>
               <FiPlusCircle 
                  size={32}
                  color="green"
                  className="button"
                  onClick={() => history.push('/book/create')}
               />
            </header>

            <ul className="books">
               {books.map(book => (
                  <li key={book.id} >
                     <p> <b>Title: </b> {book.title}</p> 
                     <p> <b>Author: </b> {book.author}</p> 

                     <div className="actions">
                        <FiEye 
                           size={20} 
                           className="button"
                           onClick={() => {history.push(`/book/${book.id}`)}}
                        />
                        <FiEdit
                           size={20}
                           className="button"
                           onClick={() => history.push(`/book/edit/${book.id}`)}
                        />
                        <FiTrash2 
                           size={20}
                           color="red"
                           className="button"
                           onClick={() => handleDelete(book.id)}
                        />
                     </div>
                  </li>
               ))}
               
            </ul>
         </div>
      </>
   );
}
