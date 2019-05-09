import React, { Component } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import { NavLink, Link, withRouter } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    console.log("hihihi");

    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        this.setState({ users: res.data });
        console.log("res", res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.users.length)
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    return (
      <div>
        <div />
        <div>
          {this.state.users.map(user => (
            <div key={user.id}>
              <h2>{user.username}</h2>
              <h3>{user.departments}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default axiosWithAuth(Users);
