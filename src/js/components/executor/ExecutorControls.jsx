"use strict";

/**************************
 * Import important stuff *
 **************************/

import React from "react";
import StateView from "./StateView.jsx";

/**********************************
 * The ExecutorControls component *
 **********************************/

class ExecutorControls extends React.Component {
	constructor(props) {
		super(props);

		// Handles for elements
		this.initialStackInput = null;
		this.executionSpeedInput = null;
		this.inputInput = null;

		// Bind methods
		this.onExecutionSpeedChange = this.onExecutionSpeedChange.bind(this);
		this.giveInput = this.giveInput.bind(this);
	}

	/**
	 * Sets the program's initial stack
	 */
	setInitialStack(type) {
		// Get the text
		const text = this.initialStackInput.value;

		// Make a list of it and set it as initial stack
		const list = ExecutorControls.convertToList(text, type);
		this.props.setInitialStack(list);

		// Clear the textarea
		this.initialStackInput.value = "";
	}

	/**
	 * Handles changes to the execution speed input
	 */
	onExecutionSpeedChange() {
		// Calculate the new interval time and set ti
		const newTime = 10**-3 * Number(this.executionSpeedInput.value)**2;
		this.props.changeIntervalTime(newTime);
	}

	/**
	 * Gives the contents of the inputInput to the program
	 *
	 * @param {String} type	How to interpret the input. Either {@link ExecutorControls#TEXT} or {@link ExecutorControls.NUMBERS}
	 */
	giveInput(type) {
		// Get the text
		const text = this.inputInput.value;

		// Make a character list of it and give it to the program
		ExecutorControls.convertToList(text, type)
		  .map((num) => String.fromCharCode(num))
		  .forEach((c) => this.props.giveInput(c));

		// Clear the textarea
		this.inputInput.value = "";
	}

	/**
	 * Converts a string to a list which can be given to the program
	 *
	 * @param {String} text	The text to convert
	 * @param {String} type	How to interpret the input. Either {@link ExecutorControls#TEXT} or {@link ExecutorControls.NUMBERS}
	 *
	 * @returns {String[]}	A list of individual characters which can be given as input or initial stack
	 */
	static convertToList(text, type) {
		// Find out how to treat it
		let list = null;
		if (type === ExecutorControls.TEXT) {
			// Split into individual characters and take their unicode value
			list = text
			  .split("")
			  .map((c) => c.charCodeAt(0));
		} else if (type === ExecutorControls.NUMBERS) {
			// This is a comma separated list of numbers
			list = text
			  // Split it into individual numbers
			  .split(",")
			  // Remove leading and trailing whitespace
			  .map((num) => num.trim())
			  // Convert them all to numbers
			  .map((num) => Number(num));
		}

		return list;
	}

	render() {
		// Shorthands for the props
		const {intervalTime, changeIntervalTime, hasStarted, isPaused, hasTerminated, run, pause, resume, step, reset, edit, inputBuffer, stackSnapshot, output, error, advances} = this.props;

		// Reverse the intervalTime calculation
		const processedIntervalTime = Math.sqrt(10**3 * intervalTime);

		return (
			<div className="fish-program-executor-controls">
				{/* The control buttons */}
				<div>
					<div className="btn-group">
						{!hasTerminated
						  ?
							!hasStarted
							  ? <button type="button" className="btn btn-success" onClick={run}>Start</button>
							  :
								!isPaused
								  ? <button type="button" className="btn btn-primary" onClick={pause}>Pause</button>
								  : [
									<button key="resume" type="button" className="btn btn-success" onClick={resume}>Resume</button>,
									<button key="step" type="button" className="btn btn-primary" onClick={step}>Step</button>,
									<button key="reset" type="button" className="btn btn-danger" onClick={reset}>Reset</button>
								  ]
						  : <button type="button" className="btn btn-danger" onClick={reset}>Reset</button>
						}
						<button type="button" className="btn btn-warning" onClick={edit}>Return to editor</button>
					</div>
				</div>
				{/* The error */}
				{error !== null
				  ? (
					  <div className="error bg-danger col-12">
						<p className="text-white text-center">{error.message}</p>
					  </div>
				  )
				  : null
				}
				{/* Initial stack input */}
				{!hasStarted
				  ? (
					<div>
						<label>Set initial stack</label>
					  	<div>
							<input
					  		  type="text"
							  ref={(input) => this.initialStackInput = input}
							  className="form-control"
							  />
							<div className="btn-group">
								<button type="button" className="btn btn-primary" onClick={this.setInitialStack.bind(this, ExecutorControls.TEXT)}>Interpret as text</button>
								<button type="button" className="btn btn-primary" onClick={this.setInitialStack.bind(this, ExecutorControls.NUMBERS)}>Interpret as array</button>
							</div>
					  	</div>
					</div>
				  )
				  : null
				}
				{/* Execution speed */}
				<div className="execution-speed">
					<label>Execution speed</label>
					<div>
						<input
						  ref={(input) => this.executionSpeedInput = input}
						  className="form-control"
						  type="range"
						  min="0"
						  max="1000"
						  step="0.25"
						  value={processedIntervalTime}
						  onChange={this.onExecutionSpeedChange}
						  />
					</div>
				</div>
				{/* The program state */}
				<StateView
				  output={output}
				  inputBuffer={inputBuffer}
				  stackSnapshot={stackSnapshot}
				  advances={advances}
				  />
				{/* Input stream input */}
				<div>
					<label>Write to input stream</label>
					<div>
						<textarea
						  ref={(textarea) => this.inputInput = textarea}
						  className="form-control"
						  >
						</textarea>
						<div className="btn-group">
							<button type="button" className="btn btn-primary" onClick={this.giveInput.bind(this, ExecutorControls.TEXT)}>Interpret as text</button>
							<button type="button" className="btn btn-primary" onClick={this.giveInput.bind(this, ExecutorControls.NUMBERS)}>Interpret as array</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	/**
	 * Constant meaning input should be handled as text
	 *
	 * @type String
	 *
	 * @constant
	 */
	static get TEXT() {
		return "text";
	}

	/**
	 * Constant meaning input should be handled as a list of comma separated values numbers
	 *
	 * @type String
	 *
	 * @constant
	 */
	static get NUMBERS() {
		return "numbers";
	}
}

/*************
 * Export it *
 *************/

export default ExecutorControls;
export {
	ExecutorControls
};
