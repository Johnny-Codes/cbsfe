import { useGetCoinQuery } from "./inventory/queries/coinApi";

const Test = () => {
  const { data, error, isLoading } = useGetCoinQuery(1);

  console.log("data: ", data);
  return <h1>This is the testing element</h1>
};


export default Test;
