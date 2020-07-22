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
            title: Yup.string().required('The title is required'),
            author: Yup.string().required('The author is required'),
            value: Yup.number().typeError('Value must be a number').required('The value is required'),
         });

         await schema.validate(data, { abortEarly: false });
   
         await api.post('/book/create', data);

         formRef.current.setErrors({});

         reset();
         history.push('/books');
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
         <div className="create-book-container">
            <Form ref={formRef} onSubmit={handleSubmit} >
               <h2>Create Book</h2>
               <Input name="title" label="Title" />
               <Input name="author" label="Author" />
               <Input name="value" label="Value" />

               <button type="submit">Create</button>
            </Form>
         </div>
      
      </>
   )
}
