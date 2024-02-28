import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const Test = () => {
  const { register, handleSubmit, control } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "images"
  });

  const onSubmit = (data) => {
    console.log(data);
    // Now you can send data to your server
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <div key={item.id}>
          <input 
            type="file" 
            {...register(`images.${index}.image`)} 
            multiple 
          />
        </div>
      ))}
      <button type="button" onClick={() => append({ image: "" })}>
        Add another image
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Test;