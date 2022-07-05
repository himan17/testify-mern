import React from "react";
import store from "../../Store";
import { withRouter } from "../withRouter";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

class Sidebar extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // console.log(store.getState());
    if (store.getState().user) {
      let image = '';
      if(store.getState().user.avatar){
        image = store.getState().user.avatar.url;
      }
      return (
        <div className="sidebar-wrapper">
          <div className="header">Testify</div>

          <div className="user">
            <div
              className="avatar"
              style={{
                backgroundImage:  image ? 'url('+image+')' : 'url("https://i.ibb.co/4NLtBbG/user.png")'
              }}
            ></div>
            <div className="name">
              {store.getState().user.firstName +
                " " +
                store.getState().user.lastName}
            </div>
          </div>

          <div className="links">
            <NavLink to="/dashboard">
              <div className="link">Dashboard</div>
            </NavLink>
            <NavLink to="/account">
              <div className="link">Account</div>
            </NavLink>
            <NavLink to="/my-quizzes">
              <div className="link">My quizzes</div>
            </NavLink>
            <NavLink to="/create-quiz">
              <div className="link">Create quiz</div>
            </NavLink>
            <NavLink to="/all-quizzes">
              <div className="link">Public quizzes</div>
            </NavLink>
            <div className="link" onClick={()=> {
              localStorage.clear();
              this.props.navigate('/');
            }}>Logout</div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default withRouter(Sidebar);