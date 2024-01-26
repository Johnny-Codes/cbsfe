const LabelForInput = ({ forInput, labelText }) => {
  return (
    <label htmlFor={`${forInput}`} className="p-2">
      {labelText}
    </label>
  );
};

export default LabelForInput;
