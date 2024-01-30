import ErrorSpan from "./ErrorSpan";
import LabelForInput from "./LabelForInput";

const InputField = ({
  register,
  name,
  placeholder,
  required,
  errors,
  type,
  onClick,
  id,
  valNum,
}) => {
  const capName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div>
      <span>
        <LabelForInput forInput={name} labelText={placeholder} />
        <input
          // key={key_prop && key_prop}
          id={id && id}
          className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
          type={type}
          {...register(name, {
            required: required,
            ...(valNum && { valueAsNumber: true }),
          })}
          placeholder={placeholder}
          onClick={onClick}
        />
        {errors && errors[name] && <ErrorSpan title={capName} />}
      </span>
    </div>
  );
};

export default InputField;

{
  /* 
  <InputField
          register={register}
          errors={errors}
          name="name"
          placeholder="placeholder"
          required={true or false}
          type="text or number or checkbox"
        /> 
*/
}
