import { useGetCustomerDetailsQuery } from "./queries/customersApi";
import { useParams } from "react-router-dom";

{/* 
TODO:

Make the actual form to edit the customer details.
Gotta link to a business also.

*/}

const EditCustomer = () => {
    const { id } = useParams<{id: string}>();
    console.log("id", id);
    const { data, error, isLoading } = useGetCustomerDetailsQuery(id);
    console.log("data", data);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div>
            <h1>Edit Customer</h1>
            <p>Name: {data.first_name} {data.last_name}</p>
            <p>Email: {data.email}</p>
            <p>Business: {data.business_name}</p>
        </div>
    )
};


export default EditCustomer