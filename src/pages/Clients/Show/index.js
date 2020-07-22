import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import api from '../../../services/api';

import Navbar from '../../../components/Navbar';

import './styles.css';

export default function Show() {
   const [client, setClient] = useState({});
   const { id }  = useParams();

   useEffect( () => {
      api.get(`/client/${id}`).then(response => {
         setClient(response.data);
      })
   }, [id]);

   return (
      <>
         <Navbar />

         {client && 
            <div className="show-client-container">
                  <h2>Client</h2>
                  <div className="fields">
                     <div className="field">
                        <strong>ID: </strong> 
                        <p> {client.id}</p>
                     </div>

                     <div className="field">
                        <strong>Name: </strong> 
                        <p> {client.name}</p>
                     </div>

                     <div className="field">
                        <strong>E-mail: </strong> 
                        <p> {client.email}</p>
                     </div>
                  </div>
            </div>
         }
      </>
   )
}
