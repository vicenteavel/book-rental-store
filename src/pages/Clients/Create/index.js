import React, { useRef } from 'react'
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom'

import api from '../../../services/api';

import Navbar from '../../../components/Navbar';
import Input from '../../../components/Input';

import './styles.css';

export default function Create() {
   const formRef = useRef(null);
   const history = useHistory();

   async function handleSubmit(data, { reset }) {
      try {

         const schema = Yup.object().shape({
            name: Yup.string().required('The name is required'),
            email: Yup.string().email('Enter an e-mail address').required('The e-mail is required'),
         });

         await schema.validate(data, { abortEarly: false });
   
         await api.post('/client/create', data);

         formRef.current.setErrors({});

         reset();
         history.push('/clients');
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
         <div className="create-client-container">
            <Form ref={formRef} onSubmit={handleSubmit} >
               <h2>Create Client</h2>
               <Input name="name" label="Full name" />
               <Input name="email" type="email" label="E-mail" />

               <button type="submit">Create</button>
            </Form>
         </div>
      
      </>
   )
}
