import React from 'react';
import $ from 'jquery';

export default class Dialog extends React.Component {

    constructor(props) {
        super(props);
        // this ref is set to theChild and we use it to show/hide functions according to the prop of dialogue
        this.modalRef = React.createRef()
    }

    componentDidMount() {
        // by default Dialogue will be hidden
        $(this.modalRef.current).hide();
    }

    hideScreen = () => {
        $(this.modalRef.current).fadeIn(200);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }

    showScreen = () => {
        $(this.modalRef.current).fadeOut(200);
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }

    render() {
        let theChild = undefined;
        // model comes from prop of Dialogue.. if its true then dialogue will show up - we have mapped this
        // boolean prop to the add question button in create quiz.js
        if(this.props.model === true) {
            this.hideScreen();
        } else {
            this.showScreen();
        }
            theChild = <div ref={this.modalRef} style={{overflow: 'scroll', position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', zIndex: this.props.zIndex ? this.props.zIndex : 20, width: '100vw', backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{backgroundColor: this.props.noBg ? '' : 'white', borderRadius: '20px', padding: '20px'}}>
                    {this.props.children}
                </div>
            </div>
        return (
            <div>
                {theChild}
            </div>
        )
    }
}