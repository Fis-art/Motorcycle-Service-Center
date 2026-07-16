import { useState, useCallback } from 'react';
import api from '../config/api';

export function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, options = {}) => {
    const { onSuccess, onError, ...axiosOptions } = options;
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(axiosOptions);
      setData(response.data);
      onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Terjadi kesalahan';
      setError(errorMessage);
      onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url, config) => execute(() => api.get(url, config)), [execute]);
  const post = useCallback((url, data, config) => execute(() => api.post(url, data, config)), [execute]);
  const put = useCallback((url, data, config) => execute(() => api.put(url, data, config)), [execute]);
  const patch = useCallback((url, data, config) => execute(() => api.patch(url, data, config)), [execute]);
  const del = useCallback((url, config) => execute(() => api.delete(url, config)), [execute]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, get, post, put, patch, delete: del, reset };
}