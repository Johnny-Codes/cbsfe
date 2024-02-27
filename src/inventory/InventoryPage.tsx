import { useState } from "react";
import InventorySideNavBar from "./InventorySideNavBar";
import { useGetCoinsByTypeQuery } from "./queries/coinApi";
import InventoryListByType from "./InventoryListByType";

const InventoryPage = () => {
  const [selectedCoinType, setSelectedCoinType] = useState(0);
  const {
    data: coinData,
    isLoading: coinLoading,
    error: coinError,
  } = useGetCoinsByTypeQuery(selectedCoinType);
  console.log("inv page data", selectedCoinType, coinData)

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <InventorySideNavBar setSelectedCoinType={setSelectedCoinType} />
      </div>
      <div className="col-span-10">
        <InventoryListByType coinData={coinData}/>
      </div>
    </div>
  );
};

export default InventoryPage;
