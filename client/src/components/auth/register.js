import React, { Component } from "react";
import axios from "axios";

export class register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
  }

  onChangeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  onChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  onChangePasswordConfirm = e => {
    this.setState({
      passwordConfirm: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.password === this.state.passwordConfirm) {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };

      console.log(newUser);
      axios.post("/api/v1/user", newUser).then(res => console.log(res.data));

      window.location = "/";
    } else {
      alert("password not match");
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              className="form-control"
              autoComplete="off"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              required
              className="form-control"
              autoComplete="off"
              value={this.state.passwordConfirm}
              onChange={this.onChangePasswordConfirm}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default register;
