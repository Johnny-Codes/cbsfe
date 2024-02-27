interface LabelForInputProps {
  forInput: string;
  labelText: string;
}

const LabelForInput: React.FC<LabelForInputProps> = ({ forInput, labelText }) => {
  return (
    <label htmlFor={`${forInput}`} className="p-2">
      {labelText}
    </label>
  );
};

export default LabelForInput;
