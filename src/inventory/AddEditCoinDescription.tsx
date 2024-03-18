import { useState, useEffect } from "react";
import SubmitButton from "../components/buttons/SubmitButton";
import { 
  useUpdateCoinMutation, 
  useGetProductDescriptionFromTextQuery, } 
  from "./queries/coinApi";
const AddEditCoinDescription = (props) => {
  const coinData = props.coinData;
  const [updateCoin] = useUpdateCoinMutation();
  const [coinDescription, setCoinDescription] = useState("");
  useEffect(() => {
    if (coinData && coinData.description) {
      setCoinDescription(coinData.description);
    }
  }
  , [coinData])

  const getTextDesc = async (e) => {
    e.preventDefault();
    await fetch(import.meta.env.VITE_BASE_URL + `/coins/${coinData.id}/textdesc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setCoinDescription(data.description);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateCoin({ id: coinData.id, data: { description: coinDescription } });
  };
  return (
    <div className="m-2">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-96 border-2 border-gray-300 rounded-md p-2"
          placeholder={
            coinData && coinData.description
              ? `${coinData.description}`
              : "Add a description"
          }
          value={coinDescription}
          onChange={e => setCoinDescription(e.target.value)}
        />
        <SubmitButton />
      </form>
      <button onClick={getTextDesc}>AI Description</button>
      <p>AI Description with Photos</p>
    </div>
  );
};

export default AddEditCoinDescription;
