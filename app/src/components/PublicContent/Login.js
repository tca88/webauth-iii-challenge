import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleLogin = event => {
    event.preventDefault();

    const endpoint = "http://localhost:5000/api/auth/login";
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log("LOGIN RESPONSE", res);
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(error => {
        console.error("LOGIN ERROR", error);
      });
  };

  handleInputChange = event => {
    const { id, value } = event.target;

    this.setState({ [id]: value });
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleLogin}>
            <h2>LOGIN</h2>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="USERNAME"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="PASSWORD"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <button>LOG IN</button>
            <div>
              <p>or</p>
              <Link to="/signup">Create an Account</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
