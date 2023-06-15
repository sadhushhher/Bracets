import axios from '../__mocks__/api.mock';
import queryString from 'query-string';

class AxiosApi {
  async get(url, query) {
    const jsonToQuery = queryString.stringify(query);
    return await axios.get(url, jsonToQuery);
  }
}

export default AxiosApi;
