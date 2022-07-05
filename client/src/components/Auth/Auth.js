import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import axios from "axios";
import store from "../../Store/index";
import Toast from "../Toast/Toast";
import { withRouter } from "../withRouter";
import "../Auth/auth.css";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // signin/signup
      tab: "signin",
      // post submit (toast)
      showToast: false,
      toastMsg: ''
    };
  }
  signIn = (email, password) => {
    axios
      .post("/api/users/login", { email, password })
      .then((res) => {
        if (res.data.success) {
        // for saving jwt token and id of user in local storage
        // dispatched to store's reducer
          store.dispatch({
            // action
            type: "login",
            _id: res.data.user._id,
            user: res.data.user,
            token: res.data.token,
          });
          console.log(store.getState());
          // render dashboard
          this.props.navigate("/dashboard");
        }
        // success: false login attempt - Show toast for 3 sec
        else {
          this.setState({
            showToast: true
          });
          this.setState({
            toastMsg: "Invalid Credentials"
          })
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  signUp = (firstName, lastName, email, password) => {
    axios
      .post("api/users/register", { firstName, lastName, email, password })
      .then((res) => {
        if (res.data.success) {
          // after creating profile ask them to signin
          this.setState({ tab: "signin" });
        }
        else{
            this.setState({
                showToast: true
            });
            let msg = res.data.errors.message;
            this.setState({
                toastMsg: msg
            })
            setTimeout(() => {
                this.setState({ showToast: false });
            }, 3000);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  // changes from sign in <--> sign up
  changeTab = () => {
    this.setState({
      tab: this.state.tab === "signup" ? "signin" : "signup"
    });
  };
  render() {
    let page =
      this.state.tab === "signin" ? (
        <SignIn signIn={this.signIn} />
      ) : (
        <SignUp signUp={this.signUp} />
      );
    return (
      <div className="auth-wrapper">
        <Toast
          model={this.state.showToast}
          message={this.state.toastMsg}
          backgroundColor="red"
        />
        <div className="left">
          <img
            src="https://i.ibb.co/ZgGvDfN/image-removebg-preview-2.png"
            alt="home-page-img"
          ></img>
        </div>
        <div className="right">
          <div className="header">Testify</div>
          <div className="sub-header">Welcome to Testify</div>
          {page}
          <div className="new" onClick={this.changeTab}>
            {this.state.tab === "signin"
              ? "New to Testify? Sign up here"
              : "Already on Testify? Sign in here"}
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Auth);
