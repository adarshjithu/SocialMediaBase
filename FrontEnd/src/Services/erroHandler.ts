import { AxiosError } from "axios"
import toast from "react-hot-toast";
import axios from "axios";

const errorHandler = async (error:any) => {
    if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message)
   } else {
        console.error("Unexpected Error:", error);
   }

}

export default errorHandler