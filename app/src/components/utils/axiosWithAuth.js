import React from "react";
import axios from "axios";

// axios interceptors are like middleware. We want to automate the process to allocate every component that requires authentication.
// axios.defaults.baseURL = "http://localhost:5000/";

// axios.interceptors.request.use(function(requestConfig) {
//   requestConfig.headers.username = localStorage.getItem("username");
//   requestConfig.headers.password = localStorage.getItem("password");
//   console.log("Header", requestConfig);
//   return requestConfig;
// });

axios.defaults.baseURL = "http://localhost:5000/";

axios.interceptors.request.use(
  function(config) {
    config.headers.authorization = localStorage.getItem("jwt");

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("jwt");
      const notLoggedIn = <h3>Please login to see users</h3>;

      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
