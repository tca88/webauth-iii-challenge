import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    departments: ""
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSignup}>
            <h2>SIGNUP</h2>
            <input
              value={this.state.username}
              onChange={this.handleInputChange}
              id="username"
              type="text"
              placeholder="USERNAME"
            />
            <input
              value={this.state.password}
              onChange={this.handleInputChange}
              id="password"
              type="password"
              placeholder="PASSWORD"
            />

            <input
              value={this.state.departments}
              onChange={this.handleInputChange}
              id="departments"
              type="text"
              placeholder="DEPARTMENT"
            />

            <button>CREATE ACCOUNT</button>
            <div>
              <p>
                Already have an account? <Link to="/">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  handleSignup = event => {
    event.preventDefault();

    const register = {
      username: this.state.username,
      password: this.state.password,
      departments: this.state.departments
    };

    const endpoint = "http://localhost:5000/api/auth/register";
    axios
      .post(endpoint, register)
      .then(res => {
        axios
          .post("http://localhost:5000/api/auth/login", this.state)
          .then(res => {
            console.log("LOGIN RESPONSE", res);
            localStorage.setItem("jwt", res.data.token);
            this.props.history.push("/users");
          });
      })
      .catch(error => {
        console.error("REGISTER ERROR", error);
      });
  };

  handleInputChange = event => {
    const { id, value } = event.target;

    this.setState({ [id]: value });
  };
}
