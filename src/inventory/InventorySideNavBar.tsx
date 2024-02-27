import { useState } from 'react';
import {
  useGetFamilyQuery,
  useGetDenominationQuery,
  useGetCoinTypesQuery,
} from "./queries/coinApi";

const InventorySideNavBar = (props: any) => {
  const {
    data: familyData,
    isLoading: familyLoading,
    error: familyError,
  } = useGetFamilyQuery();
  const {
    data: denominationData,
    isLoading: denominationLoading,
    error: denominationError,
  } = useGetDenominationQuery();
  const {
    data: coinTypesData,
    isLoading: coinTypesLoading,
    error: coinTypesError,
  } = useGetCoinTypesQuery();

  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedDenomination, setSelectedDenomination] = useState(null);

  return (
    <div className="p-5 bg-gray-100">
      {familyData &&
        familyData.map((family: any) => (
          <div key={family.id} className="mb-4">
            <h1 className="text-xl font-bold cursor-pointer" onClick={() => setSelectedFamily(family.id)}>{family.type}</h1>
            {selectedFamily === family.id && denominationData &&
              denominationData
                .filter((denomination: any) => denomination.family === family.id)
                .map((denomination: any) => (
                  <div key={denomination.id} className="ml-4 mt-2">
                    <h2 className="text-lg cursor-pointer" onClick={() => setSelectedDenomination(denomination.id)}>{denomination.denomination_of_coin}</h2>
                    {selectedDenomination === denomination.id && coinTypesData &&
                      coinTypesData
                        .filter((coinType: any) => coinType.denominations === denomination.id)
                        .map((coin: any) => (
                          <div key={coin.id} className="ml-4 mt-2">
                            <h3 onClick={() => props.setSelectedCoinType(coin.id)} className="text-base cursor-pointer">{coin.coin_type}</h3>
                          </div>
                        ))}
                  </div>
                ))}
          </div>
        ))}
    </div>
  );
};

export default InventorySideNavBar;