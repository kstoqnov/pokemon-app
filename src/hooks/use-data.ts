import axios, { AxiosError, Method } from "axios";
import { useEffect, useState } from "react";

// replace this to match your backend's error response body
interface IErrorResponse {
  error: { message?: string };
}

// http://localhost:4000 for example
axios.defaults.baseURL = process.env.API_URL;

const useData = <T>(
  url: string,
  method: Method,
  body?: any
): [boolean, string | null, T | null] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // from https://beta.reactjs.org/learn/you-might-not-need-an-effect#fetching-data
    let ignore = false;

    /**
     * used to abort an ongoing request, it will not work with Internet Explorer
     * it can be removed and use just the `ignore` variable
     */
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios({
          url: url,
          method: method,
          data: body,
          signal: controller.signal,
        });

        const data = response?.data;

        if (!ignore) {
          setData(data);
        }
      } catch (err: any) {
        const error = err as Error | AxiosError<IErrorResponse>;
        // replace here with your own error handling
        if (axios.isAxiosError(error)) {
          if (error.code === AxiosError.ERR_CANCELED) {
            console.info("Request was canceled");
            return;
          }
          if (!ignore) {
            setError(error?.response?.data?.error?.message || error.message);
          }
        } else {
          if (!ignore) {
            setError(error.message);
          }
        }

        console.error(err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData().then((r) => r);

    // To fix the race condition, we need to add a cleanup function to ignore stale responses:
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [body, method, url]);

  return [loading, error, data];
};

export default useData;
