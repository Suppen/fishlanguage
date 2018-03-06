"use strict";

/**************************
 * Import important stuff *
 **************************/

import React from "react";

/****************************
 * The OutputView component *
 ****************************/

class OutputView extends React.Component {
	constructor(props) {
		super(props);

		// Set initial state
		this.state = {
			viewMode: OutputView.TEXT
		};

		// Bind methods
		this.toggleViewmode = this.toggleViewmode.bind(this);
	}

	/**
	 * Toggles between displaying the output as text and hex
	 */
	toggleViewmode() {
		// Find the opposite value
		const newMode = this.state.viewMode === OutputView.TEXT
		  ? OutputView.HEX
		  : OutputView.TEXT
		;

		// Update the state
		this.setState({viewMode: newMode});
	}

	render() {
		// The text to display
		const displayText = this.state.viewMode === OutputView.TEXT
		  ? this.props.output
		  : OutputView.convertToHex(this.props.output)
		;

		return (
			<div className={this.props.className + " output-view"}>
				<label>
					<button type="button" className="btn btn-secondary btn-sm" onClick={this.toggleViewmode}>{this.state.viewMode === OutputView.TEXT ? "A" : "x"}</button>
					<span>Output</span>
				</label>
				<pre className="bg-light">{displayText}</pre>
			</div>
		);
	}

	static convertToHex(text) {
		// Make a hexstring out of it
		const hexstring = text
		  .split("")
		  .map((c) => c.charCodeAt(0))
		  .map((num) => num.toString(16))
		  .map((num) => num.padStart(2, "0"))
		  .join("");

		// Split it into two and two characters
		const bytelist = [];
		for (let i = 0; i < hexstring.length; i += 2) {
			bytelist.push(hexstring.slice(i, i+2));
		}

		// Split those again into chunks of 16
		const bytelistlist = [];
		for (let i = 0; i < bytelist.length; i += 16) {
			bytelistlist.push(bytelist.slice(i, i+16));
		}

		// Join the inner lists with spaces and the outer with newlines
		return bytelistlist
		  .map((bytelist) => bytelist.join(" "))
		  .join("\n");
	}

	/**
	 * Constant for the text view mode
	 *
	 * @type String
	 *
	 * @constant
	 */
	static get TEXT() {
		return "text";
	}

	/**
	 * Constant for the hex view mode
	 *
	 * @type String
	 *
	 * @constant
	 */
	static get HEX() {
		return "hex";
	}
}

/*************
 * Export it *
 *************/

export default OutputView;
export {
	OutputView
};
