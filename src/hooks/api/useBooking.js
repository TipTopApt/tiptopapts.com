import { toast } from "react-toastify";
import urls from "../../api/urls";
import useAPI from "./useAPI";

function useBookings() {
  const { post, isLoading } = useAPI();

  const book = async (fdata) => {
    const { error, data } = await post(urls.bookings.baseUrl, fdata);
    if (error) return;
    toast.success(data.message);
    alert(
      `${data.message} copy your booking refrence: ${data.data.booking.code} and proceed to make payment!`
    );
    return data.data;
  };

  return { isLoading, book };
}

export default useBookings;
