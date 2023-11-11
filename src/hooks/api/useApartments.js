import urls from "../../api/urls";
import { useState } from "react";
import useAPI from "./useAPI";

function useApartments() {
  const [apartments, setApartments] = useState([]);
  const { get, isLoading } = useAPI();

  const getApartments = async () => {
    const { error, data } = await get(urls.apartments.baseUrl);
    if (error) return;
    setApartments(data.data.apartments);
  };

  return { isLoading, getApartments, apartments };
}

export default useApartments;
