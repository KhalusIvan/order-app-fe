import axios from "axios";

const baseURL = process.env.API_URL;

const getAxiosInstance = () => {
  const instance = axios.create({
    baseURL,
    responseType: "json",
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.replace(`/auth/sign-in`);
      }
      throw err;
    }
  );
  return instance;
};

export default getAxiosInstance;
