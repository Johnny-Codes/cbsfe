import { useState } from "react";
import { useCreateCustomerMutation } from "./queries/customersApi";
import { useForm } from "react-hook-form";
//Components
import SubmitButton from "../components/buttons/SubmitButton";
import InputField from "../components/forms/InputField";
//Queries
import { useGetBusinessesQuery } from "../customers/queries/customersApi";

type CustomerInputs = {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: number;
  business_id: number | null;
};

const AddCustomer = () => {
  const { register, handleSubmit, errors, reset } = useForm<CustomerInputs>();
  const [createCustomer, { isSuccess, isError }] = useCreateCustomerMutation();
  const { data: businessData, error, isLoading } = useGetBusinessesQuery();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onSubmit = (data) => {
    createCustomer(data)
      .unwrap()
      .then(() => {
        console.log("Customer creation successful");
        setShowSuccess(true);
        reset();
      })
      .catch((error) => {
        setShowFailure(true);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-white shadow-md rounded-md"
      >
        {showSuccess && (
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md my-4 flex items-center">
            <button
              onClick={() => setShowSuccess(false)}
              className="flex items-center focus:outline-none"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </button>
            Customer created successfully!
          </div>
        )}
        {showFailure && (
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-md my-4 flex items-center">
            <button
              onClick={() => setShowFailure(false)}
              className="flex items-center focus:outline-none"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            Customer not created!
          </div>
        )}
        <div className="space-y-4">
          <div className="flex space-x-4">
            <InputField
              register={register}
              errors={errors}
              name="first_name"
              placeholder="First Name"
              type="text"
            />
            <InputField
              register={register}
              errors={errors}
              name="last_name"
              placeholder="Last Name"
              type="text"
            />
          </div>
          <InputField
            register={register}
            errors={errors}
            name="email"
            placeholder="Email"
            type="email"
          />

          <div className="flex items-center space-x-4">
            <label htmlFor="business_id" className="px-2 font-medium">
              Business
            </label>
            <select
              id="business_id"
              className="flex-1 p-2 border border-gray-300 rounded-md"
              {...register("business_id", {
                required: false,
                valueAsNumber: true,
              })}
            >
              <option value="">Select a business</option>
              {businessData.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.id} - {business.name}
                </option>
              ))}
            </select>
          </div>
          <InputField
            register={register}
            errors={errors}
            name="address_1"
            placeholder="Address 1"
            type="text"
          />
          <InputField
            register={register}
            errors={errors}
            name="address_2"
            placeholder="Address 2"
            type="text"
          />
          <div className="flex space-x-4">
            <InputField
              register={register}
              errors={errors}
              name="city"
              placeholder="City"
              type="text"
            />
            <InputField
              register={register}
              errors={errors}
              name="state"
              placeholder="State"
              type="text"
            />
            <InputField
              register={register}
              errors={errors}
              name="zip"
              placeholder="Zip"
              type="number"
            />
          </div>
          <SubmitButton
            type="button"
            text="Add Customer"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
