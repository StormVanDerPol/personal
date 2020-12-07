import useSWR from "swr";
import { dodoFlight } from "arashi-utils";

const useBible = (verse) => {
  const { data, error } = useSWR(`https://bible-api.com/${verse}`, dodoFlight);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useBible;
