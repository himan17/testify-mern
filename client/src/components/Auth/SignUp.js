import React from "react";
import "../Auth/auth.css";

export default class SignUp extends React.Component {
  // state
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <div className="sign-in-wrapper">
        <div className="form">
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
            ></input>
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
            ></input>
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            ></input>
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            ></input>
          </div>
          <div
            className="btn"
            // When user clicks on signup then these parameters gets 
            // passed to signUp function defined in auth.js for creating an account
            onClick={() => {
              this.props.signUp(
                this.state.firstName,
                this.state.lastName,
                this.state.email,
                this.state.password
              );
            }}
          >
            Sign Up
          </div>
        </div>
      </div>
    );
  }
}
