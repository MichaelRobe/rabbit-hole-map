import axios from 'axios';
import apiConfig from './apiConfig';
import queryString from 'query-string';
import rateLimit from 'axios-rate-limit';

const axiosClient = rateLimit(axios.create({
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
}), {maxRPS: 100});

export default axiosClient;
