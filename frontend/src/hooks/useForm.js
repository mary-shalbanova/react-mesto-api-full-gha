import {React, useState} from 'react';

export function useForm(inputValues) {
  const [formValues, setFormValues] = useState(inputValues);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }
  return {formValues, setFormValues, handleChange};
}
