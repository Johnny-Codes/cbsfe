import ErrorSpan from "./ErrorSpan";

const TextAreaField = ({ register, errors, name, placeholder, required }) => {
  return (
    <>
      <textarea
        {...register(name, { required: required })}
        className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
        name={name}
        placeholder={placeholder}
        required={required && required}
      />
      {errors && errors[name] && <ErrorSpan title={capName} />}
    </>
  );
};

export default TextAreaField;
