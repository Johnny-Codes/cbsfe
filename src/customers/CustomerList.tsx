import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCustomersQuery } from "../customers/queries/customersApi";

const CustomerList = () => {
  const { data, error, isLoading } = useGetCustomersQuery();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const filteredData = data.filter(
    (customer) =>
      customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        className="border border-gray-300 rounded-md p-2 mb-4 float-right"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-left">Business</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((customer, index) => (
            <tr
              key={customer.id}
              className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
            >
              <td className="border border-gray-300 p-2 text-left">
              {customer.last_name}, {customer.first_name}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {customer.email}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {customer.business_name}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                View | Invoice | <Link to={`/customers/edit/${customer.id}`} className="text-blue-500 underline">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
