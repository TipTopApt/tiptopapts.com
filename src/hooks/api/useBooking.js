import { toast } from "react-toastify";
import urls from "../../api/urls";
import useAPI from "./useAPI";
import { useState } from "react";

function useBookings() {
  const [configs, setConfigs] = useState({
    cautionDeposite: 0,
    onHoldHours: 0,
    vat: 7,
    serviceCharge: 3,
  });
  const [discount, setDiscount] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { post, isLoading, get } = useAPI();

  const book = async (fdata) => {
    const { error, data } = await post(urls.bookings.baseUrl, fdata);
    if (error) return;
    toast.success(data.message);
    // alert(
    //   `${data.message} copy your booking refrence: ${data.data.booking.code} and proceed to make payment!`
    // );
    return data.data;
  };

  const getReviews = async () => {
    const { data, error } = await get(urls.reviews.baseUrl);
    if (error) return;
    setReviews(data.data.reviews);
  };

  const getDiscountInfo = async (code) => {
    setDiscount(null);
    const { data, error } = await get(urls.bookings.discount + code);
    if (error) return;
    setDiscount(data.data.discount);
  };

  const getConfigs = async () => {
    const { data, error } = await get(urls.bookings.configs);
    if (error) return;
    setConfigs(data.data.configs);
  };

  return {
    isLoading,
    book,
    getReviews,
    reviews,
    discount,
    configs,
    getConfigs,
    getDiscountInfo,
  };
}

export default useBookings;
