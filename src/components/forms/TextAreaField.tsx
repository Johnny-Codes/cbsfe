import ErrorSpan from "./ErrorSpan";

interface TextAreaFieldProps {
  register: any;
  name: string;
  placeholder: string;
  required: boolean;
  errors: any;
}

const TextAreaField: React.FC<TextAreaFieldProps> = (
  { register, errors, name, placeholder, required }) => {
  const capName = name.charAt(0).toUpperCase() + name.slice(1);
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
