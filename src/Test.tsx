import { useGetCoinQuery } from "./inventory/queries/coinApi";

const Test = () => {
  const { data, error, isLoading } = useGetCoinQuery(1);

  console.log("data: ", data);
};

export default Test;
