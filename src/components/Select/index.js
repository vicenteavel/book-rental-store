import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Select( { name, label, data, }) {
   const selectRef = useRef(null);

   const { fieldName, registerField } = useField(name);

   useEffect( () => {
      registerField({
         name: fieldName,
         ref: selectRef.current,
         path: 'value', // property name you want to access in the ref.
      });

   }, [fieldName, registerField]);

   return (
      <>
      {label && <label htmlFor={fieldName}> {label} </label>}
      <select ref={selectRef} id={fieldName}>
         {data.map(
            item => <option key={item.id} value={item.id}>{item.title || item.name}</option>
         )}
      </select>
      </>
   );
}
