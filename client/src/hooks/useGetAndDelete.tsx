import { useState } from "react";
import Helpers from "@/config/Helpers";

type ApiMethod = (url: string, config: { headers: any }) => Promise<any>;

const useGetAndDelete = (method: ApiMethod) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const callApi = async (path: string, auth: boolean, fileHeaders: boolean) => {
    setLoading(true);
    setError(null);
    const url = `${Helpers.apiUrl}${path}`;
    let headers;

    if (auth) {
      headers = fileHeaders
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };
    } else {
      headers = fileHeaders
        ? {
          "Content-Type": "multipart/form-data",
          token: `${localStorage.getItem("token")}`,
        }
        : {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        };
    }
    try {
      const res = await method(url, { headers });
      const data = res?.data;
      console.log(data)
      setResponse(data);
      setError(null);
      return data;
    } catch (err) {
      setResponse(null);
      setError(err);
      return err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, response, error };
};

export default useGetAndDelete;
