import axios from "axios";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import MyQuizzes from "./components/MyQuizzes/MyQuizzes";
import PublicQuizzes from "./components/PublicQuizzes/PublicQuizzes";
import ViewQuiz from "./components/ViewQuiz/ViewQuiz";
import TakeQuiz from "./components/TakeQuiz/TakeQuiz";
import Profile from "./components/Profile/Profile";
import ViewResults from "./components/ViewResults/ViewResults";
import store from "./Store";

export default class App extends React.Component {
  componentDidMount() {
    // if user has logged in then only localstorage will have his ID
    // if logged in then we fetch user detailes by axios and run action set_user
    if (localStorage.getItem("_ID")) {
      axios
        .get("./api/users/" + localStorage.getItem("_ID"))
        .then((res) => {
          store.dispatch({
            user: res.data.user,
            // action
            type: "set_user"
          });
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/my-quizzes" element={<MyQuizzes />} />
            <Route path="/all-quizzes" element={<PublicQuizzes />} />
            <Route path="/view-quiz" element={<ViewQuiz />} />
            <Route path="/take-quiz" element={<TakeQuiz />} />
            <Route path="/view-results" element={<ViewResults />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
