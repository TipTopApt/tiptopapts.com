import { toast } from "react-toastify";
import urls from "../../api/urls";
import useAPI from "./useAPI";

function useContact() {
  const { post, isLoading } = useAPI();

  const sendMessage = async (fdata) => {
    const { error, data } = await post(urls.contact.baseUrl, fdata);
    if (error) return;
    toast.success(data.message);
  };

  return { isLoading, sendMessage };
}

export default useContact;
