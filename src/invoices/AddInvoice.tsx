import { useState } from "react";
import {
  useGetAllSkusQuery,
  useGetCoinInfoBySkuQuery,
} from "../inventory/queries/coinApi";

import { FaTrash } from "react-icons/fa";
const AddInvoice = () => {
  const {
    data: skuData,
    error: skuError,
    isLoading: skuLoading,
  } = useGetAllSkusQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputActive, setInputActive] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  if (skuLoading) return <div>Loading...</div>;
  if (skuError) return <div>Error: {skuError.message}</div>;

  const filteredSkus = skuData
    .filter((sku) => sku.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5);

  const addSkuToInvoice = async (sku) => {
    const coinInfoUrl = import.meta.env.VITE_BASE_URL + `/coins/skus/${sku}/`;

    try {
      const response = await fetch(coinInfoUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const coinInfo = await response.json();
      console.log(coinInfo[0].quantity);
      setInvoiceItems(
        [
          ...invoiceItems,
          {
            sku: sku,
            salesPrice: coinInfo[0].sale_price,
            quantity: 1,
            cost: coinInfo[0].cost,
            inventoryQuantity: coinInfo[0].quantity,
            title: coinInfo[0].title,
          },
        ],
        console.log(invoiceItems)
      );
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const removeInvoiceItem = (index) => {
    const newInvoiceItems = [...invoiceItems];
    newInvoiceItems.splice(index, 1);
    setInvoiceItems(newInvoiceItems);
  };

  const updateInvoiceItem = (index, field, value) => {
    const newInvoiceItems = [...invoiceItems];
    newInvoiceItems[index][field] = value;
    setInvoiceItems(newInvoiceItems);
  };

  const handleSubmitInvoice = () => {
    // gotta add a dummy customer for now
    // and see if we can get this to submit and work
    // id = 4
    const customerId = 4;
    console.log(invoiceItems);
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-4">
                Search Skus
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setInputActive(true)}
                onBlur={() => setTimeout(() => setInputActive(false), 200)}
              />
              {isInputActive && (
                <div className="absolute mt-2 bg-white border border-gray-200 rounded shadow-lg z-10">
                  {filteredSkus.map((sku, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchTerm("");
                        addSkuToInvoice(sku.sku);
                      }}
                    >
                      {sku.sku}
                      <hr />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(e) => e.preventDefault()}
          >
            Search Customers
          </form>
        </div>
        <div className="col-span-5">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="grid grid-cols-6 gap-4 mb-4 items-center font-bold">
              <div className="col-span-1">SKU</div>
              <div className="col-span-1">Quantity</div>
              <div className="col-span-1">Sales Price</div>
              <div className="col-span-1">Cost</div>
              <div className="col-span-1">Profit</div>
              <div className="col-span-1">Remove</div>
            </div>
            {invoiceItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 mb-4 items-center group"
              >
                <div className="col-span-1 text-gray-700 text-sm font-bold relative">
                  <span>{item.sku}</span>
                  {item.title && (
                    <div
                      className="absolute text-xs bg-black text-white p-1 rounded z-10 invisible group-hover:visible"
                      style={{
                        bottom: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {item.title}
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex items-center">
                  <input
                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Quantity..."
                    value={item.quantity}
                    onChange={(e) =>
                      updateInvoiceItem(index, "quantity", e.target.value)
                    }
                  />
                  <span
                    className={`ml-2 ${
                      item.quantity < 1 ? "text-red-600" : ""
                    }`}
                  >
                    / {item.inventoryQuantity}
                  </span>
                </div>
                <input
                  className="col-span-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  placeholder="Sales Price..."
                  value={item.salesPrice}
                  onChange={(e) =>
                    updateInvoiceItem(index, "salesPrice", e.target.value)
                  }
                />
                <div className="col-span-1">{item.cost}</div>
                <div
                  className={`col-span-1 ${
                    item.salesPrice - item.cost > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.quantity * (item.salesPrice - item.cost)}
                </div>
                <button
                  className="col-span-1 text-red-500 font-bold py-2 px-4 rounded"
                  onClick={() => removeInvoiceItem(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            {invoiceItems.length > 0 && (
              <div className="grid grid-cols-6 gap-4 mb-4 items-center font-bold">
                <div className="col-span-1"></div>
                <div className="col-span-1"></div>
                <div className="col-span-1">
                  $
                  {Number(
                    invoiceItems.reduce(
                      (sum, item) =>
                        sum + Number(item.salesPrice) * item.quantity,
                      0
                    )
                  ).toFixed(2)}
                </div>
                <div className="col-span-1">
                  $
                  {Number(
                    invoiceItems.reduce(
                      (sum, item) => sum + Number(item.cost) * item.quantity,
                      0
                    )
                  ).toFixed(2)}
                </div>
                <div className="col-span-1">
                  $
                  {Number(
                    invoiceItems.reduce(
                      (sum, item) =>
                        sum +
                        (Number(item.salesPrice) - Number(item.cost)) *
                          item.quantity,
                      0
                    )
                  ).toFixed(2)}
                </div>
                <div className="col-span-1"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmitInvoice}>Submit</button></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvoice;
