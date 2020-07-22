import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Input( { name, label, ...rest }) {
   const inputRef = useRef(null);

   const { fieldName, registerField, defaultValue = "", error } = useField(name);

   useEffect( () => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value', // property name you want to access in the ref.
      });

   }, [fieldName, registerField]);

   return (
      <>
         {label && <label htmlFor={fieldName}> {label} </label>}

         <input 
            ref={inputRef}
            id={fieldName}
            defaultValue={defaultValue}
            {...rest}
         />

         {error && <span style={{color: '#f00'}}>{error}</span>}
      </>
   )
}
