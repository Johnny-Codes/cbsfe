import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import SubmitButton from "../components/buttons/SubmitButton";
import {
  useUploadImagesMutation,
  useGetImageQuery,
  useDeleteImageMutation,
} from "./queries/coinApi";
import { TiDelete } from "react-icons/ti";

const Image = ({ id }) => {
  const { data, error, isLoading } = useGetImageQuery(id);
  const [deleteImage] = useDeleteImageMutation();

  const handleDelete = () => {
    deleteImage(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="relative inline-block group text-4xl">
      <img src={data.image} alt={`Image ${id}`} />
      <button
        onClick={handleDelete}
        className="absolute top-0 right-0 bg-red-500 text-white opacity-0 group-hover:opacity-100"
      >
        <TiDelete />
      </button>
    </div>
  );
};

const AddImagesForm = (props: any) => {
  const { register, handleSubmit, control } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "images",
  });

  const [uploadImages] = useUploadImagesMutation();

  const onSubmit = (data) => {
    // Create a new FormData object
    const formData = new FormData();

    // Add the coin_id to the form data
    formData.append("coin_id", props.coinData.id);

    // Add each file to the form data
    data.images.forEach((image, index) => {
      if (image.image.length > 0) {
        // If multiple files were selected, add each one separately
        for (let i = 0; i < image.image.length; i++) {
          formData.append(`images[${index}].image`, image.image[i]);
        }
      } else {
        // If only one file was selected, add it directly
        formData.append(`images[${index}].image`, image.image);
      }
    });

    // Now you can send formData to your server
    uploadImages(formData);
  };

  return (
    <div className="px-4 mx-auto">
      {props.coinData && props.coinData.images.length > 0 && (
        <div>
          <div>Images</div>
          {props.coinData.images.map((id) => (
            <Image key={id} id={id} />
          ))}
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => (
            <div key={item.id}>
              <input
                type="file"
                {...register(`images.${index}.image`)}
                multiple
              />
            </div>
          ))}
          <div>
            <button type="button" onClick={() => append({ image: "" })}>
              Add another image
            </button>
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};
export default AddImagesForm;
