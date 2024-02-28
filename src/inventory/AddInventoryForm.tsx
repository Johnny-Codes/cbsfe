import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// api queries
import {
  useGetSkuQuery,
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

const AddInventoryForm = () => {
  // api queries
  const {
    data: getSku,
    error: skuError,
    isLoading: skuLoading,
  } = useGetSkuQuery();
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

  // state
  const [bulk, setBulk] = useState<boolean>(false);
  const [selectedFamily, setSelectedFamily] = useState<number>(0);
  const [denoms, setDenoms] = useState([]);
  const [selectedDenom, setSelectedDenom] = useState<number>(0);
  const [filteredCoinTypes, setFilteredCoinTypes] = useState([]);
  const [selectedCoinType, setSelectedCoinType] = useState<number>(0);
  const [sku, setSku] = useState<string>("");

  useEffect(() => {
    if (getSku && getSku.random_sku) {
      setSku(getSku.random_sku);
    }
  }, [getSku]);

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
    addCoin(data);
    // had to setSku because setValue wasn't working in the useEffect of pcgsData
    setSku(getSku.random_sku);
    reset();
  };

  const [
    getPcgsCoinInfo,
    { data: pcgsData, error: pcgsDataError, isLoading: pcgsDataLoading },
  ] = useGetPcgsCoinInfoMutation();

  const getPcgsInfo = (event) => {
    event.preventDefault();
    const pcgs_no = event.target.pcgs_no.value;
    getPcgsCoinInfo({ pcgs_no });
  };

  useEffect(() => {
    if (pcgsData) {
      setValue("pcgs_number", pcgsData.pcgs_number);
      setValue("title", pcgsData.title);
      setValue("year", pcgsData.year);
      if (pcgsData.sku) {
        setSku(pcgsData.sku);
      }
      setValue("sale_price", pcgsData.sale_price);
      setValue("quantity", 1)
      setValue("grade", pcgsData.grade);
      setValue("strike", pcgsData.strike);
      getGradingCompanies.forEach(grading => {
        setValue(`grading.${grading.id}`, pcgsData.grading === grading.id);
      });
      getMints.forEach(mint => {
        setValue(`mint.${mint.id}`, pcgsData.mint === mint.id);
      });
      setValue("family_of_coin", pcgsData.family);
      setSelectedFamily(pcgsData.family);
      if (getDenominations && pcgsData.family !== null) {
        const filteredDenoms = getDenominations.filter(
          (denomination) => denomination.family === pcgsData.family
        );
        setDenoms(filteredDenoms);
        setValue("denomination_of_coin", pcgsData.denomination);
        setSelectedDenom(pcgsData.denomination);
      } else {
        setDenoms(getDenominations || []);
      }
    }
    if (getCoinTypes && pcgsData && pcgsData.denominations !== null && selectedFamily !== null) {
      const filteredCoinTypesResult = getCoinTypes.filter(
        (coinType) => coinType.denominations === pcgsData.denomination
      );
      setFilteredCoinTypes(filteredCoinTypesResult);
      setValue("coin_type", pcgsData.coin_type);
      setSelectedCoinType(pcgsData.coin_type);
    }
    if (pcgsDataError) {
      console.error("Failed to fetch PCGS info", pcgsDataError);
    }
  }, [pcgsData, pcgsDataError, setValue, selectedFamily, selectedDenom, setSku]);



  return (
<div className="max-w-4xl mx-auto">
      {/* PCGS Info Form */}
      <form onSubmit={getPcgsInfo} className="p-4 flex justify-between items-center space-x-4 bg-gray-100 rounded-md">
        {/* PCGS Number Input */}
        {/* <InputField
          register={register}
          errors={errors}
          name="pcgs_no"
          placeholder="PCGS Cert or Scan PCGS/NGC"
          required={false}
          type="number"
          valNum={true}
          className="flex-grow"
        /> */}
        <input type="number" placeholder="Hello" required={false} />
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Info
        </button>
      </form>

      {/* Loading Indicator */}
      {pcgsDataLoading && (
        <div className="flex items-center justify-center space-x-2 bg-gray-100 p-4 rounded-md">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Getting your coin information...</p>
        </div>
      )}
      {/* Main Inventory Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-gray-100 rounded-md">
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
            {getSku ? (
              <InputField
                register={(...args) => {
                  const ref = register(...args);
                  setValue(args[0], sku);
                  return ref;
                }}
                errors={errors}
                name="sku"
                required={true}
                placeholder="SKU"
                type="text"
                id="sku id"
              />
            ) : (
              <input id="sku" placeholder="Sku Loading" />
            )}
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
              valNum={true}
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
                valNum={true}
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
              placeholder="Cost"
            />
            <InputField
              register={register}
              valNum={true}
              errors={errors}
              name="sale_price"
              placeholder="Sale Price"
              type="number"
              step="0.01"
              placeholder="Sale Price"
            />
            <InputField
              register={register}
              valNum={true}
              errors={errors}
              name="quantity"
              placeholder="Quantity"
              required={true}
              type="number"
              placeholder="Quantity"
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
      </form>
    </div>
  );
};

export default AddInventoryForm;