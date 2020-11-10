import { toast } from "react-toastify";

export const infoToast = (msg) => {
    return toast.info(msg);
};

export const errorToast = (msg) => {
    return toast.error(msg);
};

export const successToast = (msg) => {
    return toast.success(msg);
};



