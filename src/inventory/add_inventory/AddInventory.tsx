import { useForm, SubmitHandler } from "react-hook-form";

//Components
import SubmitButton from "../../components/buttons/SubmitButton";

type Inputs = {
  is_deleted: boolean;
  sku: string;
  is_bulk: boolean;
  pcgs_number?: number;
  title: string;
  year: number;
  year2?: number;
  mint: string[];
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

const AddInventory = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example"), watch("exampleRequired"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("example")} />
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <SubmitButton />
    </form>
  );
};

export default AddInventory;
