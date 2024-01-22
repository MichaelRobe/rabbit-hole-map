import axios from 'axios';
import apiConfig from './apiConfig';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  paramsSerializer: {
    serialize: params => {
      const combinedParams = {
        ...params,
        ...apiConfig.baseParams
      };
      return queryString.stringify(combinedParams);
    }
  }
});

export default axiosClient;
