import React, { Component } from "react";
import loading from "../img/loading.gif";
import "./Loading.css";

class Loading extends Component {
  render() {
    return (
      <div className="loading-spinner">
        <img
          src={loading}
          width="54"
          height="54"
          alt="loading"
          title="loading"
        />
      </div>
    );
  }
}

export default Loading;
