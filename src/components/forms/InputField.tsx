import ErrorSpan from "./ErrorSpan";
import LabelForInput from "./LabelForInput";

interface InputFieldProps {
  register: any; 
  name: string;
  placeholder: string;
  required: boolean;
  errors: any; 
  type: string;
  onClick?: () => void;
  id?: string;
  valNum?: boolean;
  step?: number;
  value?: string | number;
}

const InputField: React.FC<InputFieldProps> = ({
  register,
  name,
  placeholder,
  required,
  errors,
  type,
  onClick,
  id,
  valNum,
  step,
  value
}) => {
  const capName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div>
      <span>
        <LabelForInput forInput={name} labelText={placeholder} />
        <input
          id={id && id}
          className="p-2 border my-2 rounded focus:ring-2 focus:outline-none focus:ring-slate-300"
          type={type}
          {...register(name, {
            required: required,
            ...(valNum && { valueAsNumber: true }),
          })}
          placeholder={placeholder}
          onClick={onClick}
          step={step}
          value={value}
        />
        {errors && errors[name] && <ErrorSpan title={capName} />}
      </span>
    </div>
  );
};

export default InputField;