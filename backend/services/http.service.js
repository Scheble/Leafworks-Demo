import axios from 'axios';

export default class HttpService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path, headers = {}, params = {}) {
    const { data } = await axios.get(`${this.baseUrl}/${path}`, {
      headers,
      params,
    });
    return data;
  }

  async put(path, headers, body) {
    const { data } = await axios.put(`${this.baseUrl}/${path}`, body, {
      headers,
    });
    return data;
  }
}
