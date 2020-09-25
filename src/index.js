import { ref, watch } from 'vue';
import axios from 'axios';
import { rexios } from 'rexios';

const axillo = (config = {}) => {
  const baseURL = config.baseURL;

  if (!baseURL) {
    throw new Error('must be parameter `baseURL` must be defined');
  }

  const apiClient = config.apiClient || axios;
  const params = ref({});
  const result = ref(null);
  const loading = ref(false);
  let onSuccess = () => {};
  let onFail = () => {};

  function request(defaultMethod, data) {
    const { method, args } = rexios({
      method: defaultMethod,
      baseURL,
      ...config,
      params: data
    });
    loading.value = true;
    return apiClient[method](...args)
      .then(response => {
        loading.value = false;
        result.value = response;
        onSuccess(response);
      })
      .catch(error => {
        onFail(error)
      });
  }

  function query(queryParams = {}) {
    return request('get', queryParams);
  }

  function mutate(mutateParams = {}) {
    return request('post', mutateParams);
  }

  watch(params, value => {
    query(value);
  });

  function onDone(callback) {
    onSuccess = callback;
    return onSuccess;
  }

  function onError(callback) {
    onFail = callback;
    return onFail;
  }

  return {
    query,
    mutate,
    params,
    loading,
    result,
    onDone,
    onError,
  };
}


export default axillo;
