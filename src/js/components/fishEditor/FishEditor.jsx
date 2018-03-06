"use strict";

/**************************
 * Import important stuff *
 **************************/

import React from "react";
import Layout from "../layouts/Layout.jsx";

/****************************
 * The FishEditor component *
 ****************************/

class FishEditor extends React.Component {
	constructor(props) {
		super(props);

		// Handles for the elements
		this.editor = null;

		// Bind methods
		this.submit = this.submit.bind(this);

		// Set the default value
		this.defaultValue = this.getDefaultValue();
	}

	/**
	 * Finds out what should be shown in the editor by default
	 *
	 * @returns {String}
	 */
	getDefaultValue() {
		return localStorage.code !== undefined ? localStorage.code : "";
	}

	/**
	 * Submits the code
	 */
	submit(e) {
		// Get the code
		const code = this.editor.value;

		// Store it
		localStorage.code = code;

		// Load up the executor
		this.props.execute();
	}

	render() {
		return (
			<Layout>
				<div className="fish-code-editor col">
					<textarea
					  className="form-control"
					  ref={(textarea) => this.editor = textarea}
					  defaultValue={this.defaultValue}
					  placeholder={"Write your ><> code here"}
					  >
					</textarea>
					<div className="btn-group">
						<button type="button" className="btn btn-primary" onClick={this.submit}>Submit</button>
					</div>
				</div>
			</Layout>
		);
	}
}

/*************
 * Export it *
 *************/

export default FishEditor;
export {
	FishEditor
};
