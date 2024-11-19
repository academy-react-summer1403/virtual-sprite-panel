import axios from "axios";
import {
  clearStorage,
  getItem,
  removeItem,
} from "../../../@core/components/common/storage.services";
import toast from "react-hot-toast";

// ../../../components/common/storage.services";
const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  return response.data;
};

const onError = (err) => {
  console.log(err);

  if (err.response) {
    if (err.response.status === 401) {
      removeItem("token");
      window.location.pathname = "/";
      toast.error("خطای سمت کلاینت: " + err.response.status);
      console.log("خطای 401");
    }

    if (err.response.status >= 400 && err.response.status < 500) {
      toast.error("خطای سمت کلاینت: " + err.response.status);
    }
  } else {
    console.log("خطای شبکه یا سرور پاسخی نداده");
  }

  return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use((opt) => {
  const token = localStorage.getItem("token");
  // const token = getItem("token") ? JSON.parse(getItem("token")) : "";
  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
  console.log(opt);
});

export default instance;
