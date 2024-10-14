import axios, { AxiosInstance, AxiosResponse } from "axios";

export const setErrorCallback = (callback: (message: string) => void) => {
  axiosInstance.interceptors.response.use(
    async (response: AxiosResponse) => response,
    async (error: any) => {
      console.error("Axios error:", error); // Log the error for debugging
      try {
        if (error.response?.status === 401) {
          callback("Unauthorized: Please check your credentials");
        } else if (error.response?.data?.message) {
          callback(error.response.data.message);
        } else {
          callback("An error occurred. Please try again later.");
        }
      } catch (err) {
        callback("An unexpected error occurred.");
      }
      throw error;
    },
  );
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const privateKey = process.env.REACT_APP_PRIVATE_KEY;

    if (privateKey) {
      config.headers = {
        ...config.headers,
        authorization: `${privateKey}`,
      };
    }
    return config;
  },
  async (error: any) => {
    throw error;
  },
);

export default axiosInstance;
