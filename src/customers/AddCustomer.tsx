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
  business_id: number;
};

const AddCustomer = () => {
  const { register, handleSubmit, errors } = useForm<CustomerInputs>();
  const [createCustomer] = useCreateCustomerMutation();

  const { data: businessData, error, isLoading } = useGetBusinessesQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onSubmit = (data) => {
    createCustomer(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-gray-100 rounded-md"
    >
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
      <InputField
        register={register}
        errors={errors}
        name="email"
        placeholder="Email"
        type="email"
      />

      <label htmlFor="business_id" className="p-2">
        Business
      </label>
      <select
        // name="business"
        id="business_id"
        className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
        {...register("business_id", { required: false, valueAsNumber: true })}
      >
        <option value="">Select a business</option>
        {businessData.map((business) => (
          <option key={business.id} value={business.id}>
            {business.id} - {business.name}
          </option>
        ))}
      </select>
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
      <SubmitButton type="button" text="Add Customer" />
    </form>
  );
};

export default AddCustomer;
