import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios(url, options);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [options, url]);

  return { response, error, isLoading };
};

export default useAxios;
