import { useLocation } from "react-router-dom";
import EditInventoryForm from "./EditInventoryForm";
import AddImagesForm from "./AddImagesForm";
import {useGetCoinQuery} from "./queries/coinApi";

const EditInventoryPage = () => {
    const location = useLocation();
    const coinId = location.state ? location.state.id : null;

    const {
        data: coinData,
        isLoading: coinLoading,
        error: coinError,
      } = useGetCoinQuery(coinId);

    if (!coinId) {
      return (
        <div>
          <h1>No coin id</h1>
        </div>
      );
    }
  return (
  <div className="grid grid-cols-4">
    <div className="col-span-2">
      <EditInventoryForm coinData={coinData}/>
    </div>
    <div className="col-span-1">
      <h1><AddImagesForm coinData={coinData} /></h1>
    </div>
    <div className="col-span-1">
      <h1>This will be the description section</h1>
    </div>
  </div>);
};

export default EditInventoryPage;
