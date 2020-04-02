import React, { Component } from "react";

export class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

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

  onSubmit = e => {
    e.preventDefault();

    const loginUser = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(loginUser);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
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
            <input type="submit" className="btn btn-primary" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default login;
