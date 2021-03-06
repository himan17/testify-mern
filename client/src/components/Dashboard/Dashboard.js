import React from "react";
import './Dashboard.css';
import Sidebar from "../Sidebar/Sidebar";
import { withRouter } from "../withRouter";

class Dashboard extends React.Component{

    componentDidMount() {
        // login check
        if(!localStorage.getItem('JWT_PAYLOAD')){
            this.props.navigate('/');
        }
    }

    render(){
        return(
            <div className="dashboard-wrapper">
                <div className="sidebar">
                    <Sidebar/>
                </div>

                <div className="main">
                    <div className="top">
                        <div className="left">
                            <div className="header">Statistics</div>        
                        </div>
                        <div className="right">
                            <div className="header">My Quizzes</div>        
                        </div>
                    </div>
                    <div className="bottom">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Dashboard);