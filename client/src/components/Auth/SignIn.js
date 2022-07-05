import React from "react";
import "../Auth/auth.css";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
            // onClicking sign in these parameters get passed 
            // to signIn function defined in auth.js
            onClick={() => {
              this.props.signIn(this.state.email, this.state.password);
            }}
          >
            Sign In
          </div>
        </div>
      </div>
    );
  }
}
