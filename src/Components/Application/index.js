import React, { Component } from "react";

import WebGLApplication from "../WebGL";

import "./application.css";

export default class Application extends Component {
  constructor(props) {
    super(props);

    this._canvas = React.createRef();
    this._webgl = null;
  }

  componentDidMount() {
    this._webgl = new WebGLApplication({
      canvas: this._canvas.current,
      debug: window.location.hash === "#debug"
    });
  }

  render() {
    return <canvas ref={this._canvas}></canvas>;
  }
}
