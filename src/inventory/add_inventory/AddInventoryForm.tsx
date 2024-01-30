import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// api queries
import {
  useGetSkuQuery,
  useGetMintsQuery,
  useGetFamilyQuery,
  useGetDenominationQuery,
  useGetCoinTypesQuery,
} from "../queries/coinApi";

//Components
import SubmitButton from "../../components/buttons/SubmitButton";
import InputField from "../../components/forms/InputField";
import TextAreaField from "../../components/forms/TextAreaField";
import SelectField from "../../components/forms/SelectField";

type Inputs = {
  is_deleted: boolean;
  sku: string;
  is_bulk: boolean;
  pcgs_number?: number;
  title: string;
  year: number;
  year2?: number;
  mint: object;
  description?: string;
  family_of_coin: string;
  denomination_of_coin: string;
  coin_type: string;
  grading: string[];
  grade: string;
  grade2?: string;
  cost: number;
  quantity?: number;
  images?: HTMLImageElement; // <img> = HTMLImageElement, url = String, <input> File
  strike: string;
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

  // state
  const [bulk, setBulk] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(0);
  const [denoms, setDenoms] = useState([]);
  const [selectedDenom, setSelectedDenom] = useState(0);
  const [filteredCoinTypes, setFilteredCoinTypes] = useState([]);

  useEffect(() => {
    const selectedFamilyNumber = Number(selectedFamily);
    const selectedDenomNumber = Number(selectedDenom);

    if ((selectedFamily === null) | (selectedFamily === 0)) {
      setDenoms([]);
      setFilteredCoinTypes([]);
    }

    // Filter denominations based on selected family
    if (getDenominations && selectedFamily !== null) {
      const filteredDenoms = getDenominations.filter(
        (denomination) => denomination.family === selectedFamilyNumber
      );
      setDenoms(filteredDenoms);
    } else {
      setDenoms(getDenominations || []);
    }

    // Filter coin types based on selected denomination
    if (getCoinTypes && selectedDenom !== null) {
      const filteredCoinTypes = getCoinTypes.filter(
        (coinType) => coinType.denominations === selectedDenomNumber
      );

      setFilteredCoinTypes(filteredCoinTypes);
    }
  }, [selectedFamily, selectedDenom, getDenominations, getCoinTypes]);

  const handleSelectedFamily = (event) => {
    setSelectedFamily(event.target.value);
  };

  const handleSelectedDenom = (event) => {
    setSelectedDenom(event.target.value);
  };

  // react form hooks set up
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log("selected denom", selectedDenom);
  console.log("ffiltered coin types", filteredCoinTypes);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="md:grid grid-cols-3 sm:flex outline px-4 py-4  outline-red-500">
          <div className="md:grid sm:flex sm:flex-wrap outline px-4 py-4  outline-blue-500">
            <InputField
              register={register}
              errors={errors}
              name="pcgs_number"
              placeholder="PCGS Number"
              required={false}
              type="text"
            />
            <InputField
              register={register}
              errors={errors}
              name="is_bulk"
              placeholder="Bulk"
              type="checkbox"
              onClick={() => setBulk(!bulk)}
            />
            {getSku ? (
              <InputField
                register={(...args) => {
                  const ref = register(...args);
                  setValue(args[0], getSku.random_sku);
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
              placeholder="Year"
              required={true}
              type="number"
            />
            {bulk && (
              <InputField
                register={register}
                errors={errors}
                name="year2"
                placeholder="Year 2"
                required={bulk ? true : false}
                type="number"
              />
            )}
          </div>
          <div className="md:grid grid-cols-2 sm:flex px-4 py-4 outline outline-green-500">
            <div className="md: grid sm:flex sm:flex-col">
              {getMints &&
                getMints.map((mint) => (
                  <InputField
                    register={register}
                    errors={errors}
                    name={`mints.${mint.id}`}
                    placeholder={mint.coin_mint}
                    required={false}
                    type="checkbox"
                    key={mint.id}
                    id={mint.id}
                  />
                ))}
            </div>
            <div>
              <p>more check boxes here</p>
            </div>
          </div>
          <div className="grid px-4 py-4 outline outline-cyan-500">
            <select
              name="family_of_coin"
              className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
              {...register("family_of_coin")}
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
              {...register("denomination_of_coin")}
              required
              onChange={(e) => handleSelectedDenom(e)}
            >
              <option>Select Denomination</option>
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
              {...register("coin_type")}
              required
            >
              <option>Select Coin Type</option>
              {filteredCoinTypes &&
                filteredCoinTypes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.coin_type}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* <TextAreaField
          register={register}
          errors={errors}
          name="description"
          placeholder="Product Description"
          required={false}
        /> */}
        <SubmitButton />
      </form>
    </div>
  );
};

export default AddInventoryForm;
