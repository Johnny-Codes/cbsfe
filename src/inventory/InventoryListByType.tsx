import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InventoryListByType = (props) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSort = (field) => {
    let direction = 'asc';
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortField(field);
    setSortDirection(direction);
  };

  let sortedData = [...props.coinData];
  if (sortField !== null) {
    sortedData.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  if (props.coinData && props.coinData.length === 0) {
    return (
      <div>
        <h1>No coins found</h1>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr>
              <th onClick={() => handleSort('sku')} className="hover:cursor-pointer px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th onClick={() => handleSort('title')}  className="hover:cursor-pointer px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th onClick={() => handleSort('cost')}  className="hover:cursor-pointer px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th onClick={() => handleSort('sale_price')} className="hover:cursor-pointer px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Sale Price
              </th>
              <th onClick={() => handleSort('quantity')}  className="hover:cursor-pointer px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white" >
            {props.coinData &&
              sortedData.map((coin, index) => (
                <tr
                  key={coin.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                    {coin.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                    {coin.title}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                    {coin.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                    {coin.sale_price}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                    {coin.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                    <button className="bg-slate-400 px-2 py m-2 rounded-lg text-white border border-slate-500 hover:cursor-pointer"

                    onClick={() =>
                      navigate(`/coins/edit/${coin.sku}`, {
                        state: { id: coin.id },
                      })
                    }
                  >
                    Edit
                  </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryListByType;
