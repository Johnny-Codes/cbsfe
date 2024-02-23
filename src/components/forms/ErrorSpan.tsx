interface ErrorSpanProps {
  title: string;
}

const ErrorSpan: React.FC<ErrorSpanProps> = ({ title }) => {
  return (
    <span className="bg-red-500/75 text-white p-2 m-2 rounded">
      {title} is required
    </span>
  );
};

export default ErrorSpan;
