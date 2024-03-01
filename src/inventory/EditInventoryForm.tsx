import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SoftDeleteButton from "../components/buttons/SoftDeleteButton";
// api queries
import {
  useUpdateCoinMutation,
  useGetMintsQuery,
  useGetFamilyQuery,
  useGetDenominationQuery,
  useGetCoinTypesQuery,
  useGetGradingCompaniesQuery,
  useGetCoinGradesQuery,
  useGetCoinStrikesQuery,
  useAddCoinMutation,
  useGetPcgsCoinInfoMutation,
} from "./queries/coinApi";

//Components
import SubmitButton from "../components/buttons/SubmitButton";
import InputField from "../components/forms/InputField";

type Inputs = {
  is_deleted: boolean;
  sku: string;
  is_bulk: boolean;
  pcgs_number?: number;
  title: string;
  year: number;
  year2?: number;
  sale_price: number;
  mint: number[];
  description?: string;
  family_of_coin: number;
  denomination_of_coin: number;
  coin_type: number;
  grading: number[];
  grade: string;
  grade2?: string;
  cost: number;
  quantity?: number;
  images?: HTMLImageElement; // <img> = HTMLImageElement, url = String, <input> File
  strike: number;
};

const EditInventoryForm = (props: any) => {
  const coinData = props.coinData;
  const navigate = useNavigate();
  
  const [updateCoin] = useUpdateCoinMutation();

  // state
  const [bulk, setBulk] = useState<boolean>(false);
  const [selectedFamily, setSelectedFamily] = useState<number>(0);
  const [denoms, setDenoms] = useState([]);
  const [selectedDenom, setSelectedDenom] = useState<number>(0);
  const [filteredCoinTypes, setFilteredCoinTypes] = useState([]);
  const [selectedCoinType, setSelectedCoinType] = useState<number>(0);

  const {
    data: getMints,
    error: mintError,
    isLoading,
    mintsLoading,
  } = useGetMintsQuery();
  const {
    data: getFamily,
    error: familyError,
    isLoading: familyLoading,
  } = useGetFamilyQuery();
  const {
    data: getDenominations,
    error: denominationsError,
    isLoading: denominationsLoading,
  } = useGetDenominationQuery();
  const {
    data: getCoinTypes,
    error: coinTypesError,
    isLoading: coinTypesLoading,
  } = useGetCoinTypesQuery();
  const {
    data: getGradingCompanies,
    error: gradingCompaniesError,
    isLoading: gradingCompaniesLoading,
  } = useGetGradingCompaniesQuery();
  const {
    data: getCoinGrades,
    error: coinGradesError,
    isLoading: coinGradesLoading,
  } = useGetCoinGradesQuery();
  const {
    data: getCoinStrikes,
    error: coinStrikesError,
    isLoading: coinStrikesLoading,
  } = useGetCoinStrikesQuery();
  const [addCoin] = useAddCoinMutation();

  useEffect(() => {
    if (selectedFamily === null || selectedFamily === 0) {
      setDenoms([]);
      setSelectedDenom(0);
    }

    if (selectedDenom === null || selectedDenom === 0) {
      setFilteredCoinTypes([]);
    }

    if (getDenominations && selectedFamily !== null) {
      const filteredDenoms = getDenominations.filter(
        (denomination) => denomination.family === selectedFamily
      );
      setDenoms(filteredDenoms);
    } else {
      setDenoms(getDenominations || []);
    }

    if (getCoinTypes && selectedDenom !== null) {
      const filteredCoinTypesResult = getCoinTypes.filter(
        (coinType) => coinType.denominations === selectedDenom
      );

      setFilteredCoinTypes(filteredCoinTypesResult);
    }
  }, [selectedFamily, selectedDenom, getDenominations, getCoinTypes]);

  const handleSelectedFamily = (event) => {
    setSelectedFamily(Number(event.target.value));
  };

  const handleSelectedDenom = (event) => {
    setSelectedDenom(Number(event.target.value));
  };

  const handleSelectedCoinType = (event) => {
    setSelectedCoinType(Number(event.target.value));
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

//   useEffect(() => {
//     if (!coinData.id) {
//       navigate("/coins/inventory", {
//         state: { coin_type: coinData.coin_type },
//       });
//     }
//   }, [coinData, navigate]);

  useEffect(() => {
    if (coinData) {
      setValue("sku", coinData.sku);
      setValue("pcgs_number", coinData.pcgs_number);
      setValue("title", coinData.title);
      setValue("year", coinData.year);
      setValue("cost", coinData.cost);
      setValue("sale_price", coinData.sale_price);
      setValue("quantity", coinData.quantity);
      setValue("grade", coinData.grade);
      setValue("strike", coinData.strike);
      getGradingCompanies.forEach((grading) => {
        coinData.grading.forEach((coinGrading) => {
          if (grading.id === coinGrading[0].id) {
            setValue(`grading.${grading.id}`, true);
          }
        });
      });
      getMints.forEach((mint) => {
        coinData.mint.forEach((m) => {
          if (mint.id === m[0].id) {
            setValue(`mint.${mint.id}`, true);
          }
        });
      });

      getFamily.forEach((family) => {
        if (family.id === coinData.family_of_coin.id) {
          setSelectedFamily(family.id);
          setValue("family_of_coin", family.id);
        }
      });

      getDenominations.forEach((denom) => {
        if (denom.id === coinData.denomination_of_coin) {
          setSelectedDenom(denom.id);
          setValue("denomination_of_coin", denom.id);
        }
      });

      getCoinTypes.forEach((coinType) => {
        if (coinType.id === coinData.coin_type) {
          setSelectedCoinType(coinType.id);
          setValue("coin_type", coinType.id);
        }
      });

      // strike is an array because I was going to have it be a bulk type option but
      // that doesn't make sense anymore. so if the api changes in the future
      // need to update this and the addinventoryform.tsx form
      getCoinStrikes.forEach((strike) => {
        if (strike.id === coinData.strike[0].id) {
          setValue("strike", strike.id);
        }
      });

      if (coinData.is_bulk) {
        //handle bulk coins here
      }
    }
  }, [setValue, coinData]);

  const watchedMints = watch("mint");
  const watchedGradingCompanies = watch("grading");

  const onSubmit = (data) => {
    const checkedMints = Object.keys(watchedMints).filter(
      (id) => watchedMints[id]
    );
    const checkedGradingCompanies = Object.keys(watchedGradingCompanies).filter(
      (id) => watchedGradingCompanies[id]
    );
    data["mint"] = checkedMints;
    data["grading"] = checkedGradingCompanies;
    if (data.pcgs_number === "") {
      data.pcgs_number = null;
    }
    updateCoin({ id: coinData.id, data });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-gray-100 rounded-md"
      >
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            register={register}
            errors={errors}
            name="is_bulk"
            placeholder="Bulk"
            type="checkbox"
            onClick={() => setBulk(!bulk)}
          />
          <InputField
            register={register}
            errors={errors}
            name="pcgs_number"
            placeholder="PCGS Number"
            required={false}
            type="number"
            valNum={true}
          />

          <InputField
            register={register}
            errors={errors}
            name="sku"
            required={true}
            placeholder="SKU"
            type="text"
            id="sku id"
          />

          <InputField
            register={register}
            errors={errors}
            name="title"
            placeholder="Title"
            required={true}
            type="text"
          />
          <InputField
            register={register}
            errors={errors}
            name="year"
            valNum={true}
            placeholder="Year"
            required={true}
            type="number"
          />
          {bulk && (
            <InputField
              register={register}
              errors={errors}
              name="year2"
              valNum={true}
              placeholder="Year 2"
              required={bulk ? true : false}
              type="number"
            />
          )}
          <InputField
            register={register}
            errors={errors}
            valNum={true}
            name="cost"
            placeholder="Cost"
            required={true}
            type="number"
            step="0.01"
          />
          <InputField
            register={register}
            valNum={true}
            errors={errors}
            name="sale_price"
            placeholder="Sale Price"
            type="number"
            step="0.01"
          />
          <InputField
            register={register}
            valNum={true}
            errors={errors}
            name="quantity"
            placeholder="Quantity"
            required={true}
            type="number"
          />
        </div>
        <div className="md:grid grid-cols-2 sm:flex px-4 py-4">
          <div className="md: grid sm:flex sm:flex-col">
            {getMints &&
              getMints.map((mint) => (
                <InputField
                  register={register}
                  errors={errors}
                  valNum={true}
                  name={`mint.${mint.id}`}
                  placeholder={mint.coin_mint}
                  required={false}
                  type="checkbox"
                  key={mint.id}
                  id={mint.id}
                />
              ))}
          </div>
          <div>
            {getGradingCompanies &&
              getGradingCompanies.map((grading) => (
                <InputField
                  register={register}
                  errors={errors}
                  name={`grading.${grading.id}`}
                  type="checkbox"
                  placeholder={grading.name}
                  required={false}
                  key={grading.id}
                  id={grading.id}
                />
              ))}
            <select
              name="grade"
              className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
              {...register("grade", { valueAsNumber: true })}
              required
            >
              <option>Select Coin Grade</option>
              {getCoinGrades &&
                getCoinGrades.map((coinGrade) => (
                  <option
                    key={coinGrade.id}
                    id={coinGrade.id}
                    value={coinGrade.id}
                  >
                    {coinGrade.grade}
                  </option>
                ))}
            </select>
            {bulk && (
              <select
                name="grade2"
                className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
                {...register("grade2", { valueAsNumber: true })}
                required
              >
                <option>Select Coin Grade 2</option>
                {getCoinGrades &&
                  getCoinGrades.map((coinGrade) => (
                    <option
                      key={coinGrade.id}
                      id={coinGrade.id}
                      value={coinGrade.id}
                    >
                      {coinGrade.grade}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
        <div className="grid px-4 py-4">
          <select
            name="family_of_coin"
            className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
            {...register("family_of_coin", { valueAsNumber: true })}
            required
            onChange={(e) => handleSelectedFamily(e)}
          >
            <option>Select Family</option>
            {getFamily &&
              getFamily.map((family) => (
                <option key={family.id} id={family.id} value={family.id}>
                  {family.type}
                </option>
              ))}
          </select>
          <select
            name="denomination_of_coin"
            className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
            {...register("denomination_of_coin", { valueAsNumber: true })}
            required
            onChange={(e) => handleSelectedDenom(e)}
          >
            <option value="0">Select Denomination</option>
            {denoms &&
              denoms.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.denomination_of_coin}
                </option>
              ))}
          </select>
          <select
            name="coin_type"
            className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
            {...register("coin_type", { valueAsNumber: true })}
            onChange={(e) => handleSelectedCoinType(e)}
            required
          >
            <option value="0">Select Coin Type</option>
            {filteredCoinTypes &&
              filteredCoinTypes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.coin_type}
                </option>
              ))}
          </select>
          <select
            name="strike"
            className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
            {...register("strike", { valueAsNumber: true })}
            required
          >
            <option value="0">Select Coin Strike</option>
            {getCoinStrikes &&
              getCoinStrikes.map((strike) => (
                <option key={strike.id} value={strike.id}>
                  {strike.strike}
                </option>
              ))}
          </select>
        </div>
        <SubmitButton />
        <button
          className="bg-gray-400 px-2 py m-2 rounded-lg text-white border border-gray-500 hover:cursor-pointer"
          type="button"
          onClick={() =>
            navigate("/coins/inventory", {
              state: { coin_type: coinData.coin_type },
            })
          }
        >
          Cancel
        </button>
        
      </form>
      {coinData &&
        <SoftDeleteButton id={coinData.id} />}
    </div>
  );
};

export default EditInventoryForm;
