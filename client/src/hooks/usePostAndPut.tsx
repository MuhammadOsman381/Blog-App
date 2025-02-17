import { useState } from "react";
import Helpers from "@/config/Helpers";
import toast from "react-hot-toast";

type ApiMethod = (url: string, data: any, config: { headers: any }) => Promise<any>;

const usePostAndPut = (method: ApiMethod) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const callApi = async (
        path: string,
        data: any,
        auth: boolean,
        fileHeaders: boolean,
        showMessage: boolean
    ) => {
        setLoading(true);
        setError(null);

        console.log(data)

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
            const res = await method(url, data, { headers });
            setResponse(res);
            setError(null)
            showMessage && toast.success(res.data.message)
            return res
        } catch (err: any) {
            setResponse(null);
            setError(err);
            showMessage && toast.error(err.response.data.message)
            return err
        } finally {
            setLoading(false);
        }
    };

    return { callApi, loading, response, error };
};

export default usePostAndPut;
