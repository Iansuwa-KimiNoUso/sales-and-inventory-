import axios from "axios";
import { items, users } from "./mocks";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
  transformRequest: [
    function (data, headers) {
      // Do whatever you want to transform the data

      return data;
    },
  ],
  transformResponse: [
    function (data) {
      // Do whatever you want to transform the data

      return data;
    },
  ],
});

instance.interceptors.request.use((config) => {
  return new Promise((resolve) => setTimeout(() => resolve(config), 2000));
});

// mocking for api responses
instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.config.method === "get" && error.config.url === "/items") {
      return {
        data: items,
        status: 200,
        statusText: "OK",
        headers: {},
        config: error.config,
        isMock: true,
      };
    }

    if (error.config.method === "get" && error.config.url === "/users") {
      return {
        data: users,
        status: 200,
        statusText: "OK",
        headers: {},
        config: error.config,
        isMock: true,
      };
    }
  }
);

export default instance;
