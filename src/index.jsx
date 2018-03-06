"use strict";

/******************************
 * Import the HTML and styles *
 ******************************/

import "file-loader?name=index.html!./index.html";
import "./styles/style.scss";

/**************************
 * Import important stuff *
 **************************/

import "bootstrap";
import ReactDOM from "react-dom";
import React from "react";
import Controller from "./js/components/Controller.jsx";

/*******************
 * Start the thing *
 *******************/

ReactDOM.render(<Controller />, document.getElementById("root"));
