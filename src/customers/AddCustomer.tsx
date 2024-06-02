import { useState, useEffect } from 'react';
import { useCreateCustomerMutation } from './queries/customersApi';
import { useForm } from 'react-hook-form';
//Components
import SubmitButton from "../components/buttons/SubmitButton";
import InputField from "../components/forms/InputField";


type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
  };

const AddCustomer = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [createCustomer] = useCreateCustomerMutation();



  const onSubmit = (data) => {
    console.log("data ", data);
    createCustomer(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-gray-100 rounded-md">
        <InputField register={register}
        errors={errors}
        name="first_name"
        placeholder="First Name"
        type="text"
        />
        <InputField register={register}
        errors={errors}
        name="last_name"
        placeholder="Last Name"
        type="text"
        />
        <InputField register={register}
        errors={errors}
        name="email"
        placeholder="Email"
        type="email"
        />
        <InputField register={register}
        errors={errors}
        name="address_1"
        placeholder="Address 1"
        type="text"
        />
        <InputField register={register}
        errors={errors}
        name="address_2"
        placeholder="Address 2"
        type="text"
        />
        <InputField register={register}
        errors={errors}
        name="city"
        placeholder="City"
        type="text"
        />
        <InputField register={register}
        errors={errors}
        name="state"
        placeholder="State"
        type="text"
        />
        <InputField register={register}
        errors={errors}
        name="zip"
        placeholder="Zip"
        type="number"
        />
        <SubmitButton
        type="button"
        text="Add Customer"
        />
    </form>
  );
};

export default AddCustomer;