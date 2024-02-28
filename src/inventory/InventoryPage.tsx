import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InventorySideNavBar from "./InventorySideNavBar";
import { useGetCoinsByTypeQuery } from "./queries/coinApi";
import InventoryListByType from "./InventoryListByType";

const InventoryPage = () => {
  const location = useLocation();
  // location comes from EditInventoryForm cancel button
  const locationCoinType = location.state ? location.state.coin_type : null;
  const [selectedCoinType, setSelectedCoinType] = useState(0);

  useEffect(() => {
    if (location.state !== null && location.state.coin_type) {
      setSelectedCoinType(locationCoinType);
    }
  }, [locationCoinType]);

  const {
    data: coinData,
    isLoading: coinLoading,
    error: coinError,
  } = useGetCoinsByTypeQuery(selectedCoinType);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <InventorySideNavBar setSelectedCoinType={setSelectedCoinType} />
      </div>
      <div className="col-span-10">
        <InventoryListByType coinData={coinData} />
      </div>
    </div>
  );
};

export default InventoryPage;
