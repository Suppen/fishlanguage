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
import FishExecutorView from "./js/components/executor/FishExecutorView.jsx";

const source = `0voa          \u0000                 ~/?=0:\\
 voa            oooo'Buzz'~<     /
 >1+:aa*1+=?;::5%:{3%:@*?\\?/'zziF'oooo/
 ^oa                 n:~~/`;

/*******************
 * Start the thing *
 *******************/

ReactDOM.render(<FishExecutorView source={source} />, document.getElementById("root"));
