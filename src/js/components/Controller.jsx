"use strict";

/**************************
 * Import important stuff *
 **************************/

import React from "react";
import FishEditor from "./fishEditor/FishEditor.jsx";
import FishExecutorView from "./executor/FishExecutorView.jsx";

/****************************
 * The Controller component *
 ****************************/

class Controller extends React.Component {
	constructor(props) {
		super(props);

		// Set initial state
		this.state = {
			activity: Controller.EDITING
		};
	}

	/**
	 * Changes the activity
	 *
	 * @param {String} changeTo	The activity to change to
	 */
	changeActivity(changeTo) {
		this.setState({activity: changeTo});
	}

	render() {
		return this.state.activity === Controller.EDITING
		  ? <FishEditor execute={this.changeActivity.bind(this, Controller.EXECUTING)} />
		  : <FishExecutorView source={localStorage.code} edit={this.changeActivity.bind(this, Controller.EDITING)} />
		;
	}

	/**
	 * Constant indicating the user is editing code
	 *
	 * @type String
	 *
	 * @constant
	 */
	static get EDITING() {
		return "editing";
	}

	/**
	 * Constant indicating the user is executing code
	 *
	 * @type String
	 *
	 * @constant
	 */
	static get EXECUTING() {
		return "executing";
	}
}

/*************
 * Export it *
 *************/

export default Controller;
export {
	Controller
};
