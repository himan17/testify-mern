import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import './PublicQuizzes.css';
import Toast from '../Toast/Toast';
import { withRouter } from '../withRouter';

class PublicQuizzes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            showToast: false,
            message: ''
        }
    }

    componentDidMount() {
        axios.get('/api/quizzes/all-quizzes').then(res => {
            this.setState({
                quizzes: res.data
            })
        })
    }

    // quizId is default _id of a particular quiz
    likeQuiz = (quizId) => {
        // end point for handling like post requests
        axios.post('/api/quizzes/like-quiz', {quizId: quizId, userId: localStorage.getItem('_ID')}).then(res => {
            if (res.data) {
                // toast update
                this.setState({showToast: true, message: res.data.message});
                // refreshing the quizzes in Public Quizzes
                axios.get('/api/quizzes/all-quizzes').then(resp => {
                    this.setState({
                        quizzes: resp.data
                    })
                })
                // timeout for toast
                setTimeout(() => {
                    this.setState({showToast: false, message: res.data.message});
                }, 3000);
            }
        })
    }
    takeQuiz = (quizId) => {
        this.props.navigate('/view-quiz?id=' + quizId);
    }

    render() {
        // the toast here displays message when added to likes - message comes from backend
        return (
            <div className="public-quizzes-wrapper">
                <Toast model={this.state.showToast} message={this.state.message} />
                <div>
                    <Sidebar />
                </div>
                <div className="body">
                    <div className="header-top">Public Quizzes</div>
                    <div className="quizzes-wrapper">
                        {this.state.quizzes.map((quiz, idx) => (
                            <div key={idx} className="quiz-card card">
                                <img src={quiz.imgUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'} />
                                <div className="quiz-name">{quiz.name}</div>
                                <div className="category">{quiz.category}</div>
                                <div className="questions">{quiz.questions.length} Questions</div>
                                <div className="take-quiz btn" onClick={() => this.takeQuiz(quiz._id)}>Take Quiz</div>

                                <div className="top-section">
                                    <div className="likes">{quiz.likes} <img style={{cursor: 'pointer', padding: '5px'}} onClick={() => this.likeQuiz(quiz._id)} src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png" /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PublicQuizzes);