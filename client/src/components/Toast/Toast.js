import React from "react";
import $ from "jquery";

// Toast is displayed when we want to show a pop up kind of thing
export default class Toast extends React.Component {
  constructor(props) {
    super(props);
    // Refs provide a way to access React elements created in the render method.
    // here this is accessing toast div
    this.toastRef = React.createRef();
  }

  componentDidMount() {
    $(this.toastRef.current).hide();
  }

  hideScreen = () => {
    $(this.toastRef.current).fadeIn(200);
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
  };

  showScreen = () => {
    $(this.toastRef.current).fadeOut(200);
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  };
  // Toast has 4 props .. one is a boolean model which shows/hides the toast
  // Second is message which is to be displayed there
  // third - zIndex 4th - bgcolor
  render() {
    let theChild = undefined;
    if (this.props.model === true) {
    // initially toast was faded out due to showScreen.. when model is true run hideScreen to fade in 
      this.hideScreen();
    } else {
      this.showScreen();
    }
    theChild = (
      <div
        ref={this.toastRef}
        style={{
          overflow: "auto",
          position: "fixed",
          top: "15px",
          right: "15px",
          zIndex: this.props.zIndex ? this.props.zIndex : 20,
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : "#30D158",
          widht: "fit-content",
          color: "white",
          borderRadius: "5px",
          padding: "20px 30px"
        }}
      >
        {this.props.message}
      </div>
    );
    return <div>{theChild}</div>;
  }
}
