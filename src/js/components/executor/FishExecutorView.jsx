"use strict";

/**************************
 * Import important stuff *
 **************************/

import React from "react";
import Layout from "../layouts/Layout.jsx";
import FishExecutor from "fish-interpreter";
import CodeView from "./CodeView.jsx";
import ExecutorControls from "./ExecutorControls.jsx";

/**********************************
 * The FishExecutorView component *
 **********************************/

class FishExecutorView extends React.Component {
	constructor(props) {
		super(props);

		// Bind methods
		this.extractData = this.extractData.bind(this);
		this.changeIntervalTime = this.changeIntervalTime.bind(this);
		this.reset = this.reset.bind(this);
	}

	componentWillMount() {
		this.reset(this.props.initialStack);
	}

	/**
	 * Resets the executor
	 *
	 * @param {Integer[]} initialStack	Initial stack to give the program
	 */
	reset(initialStack = []) {
		// XXX This whole method is quite hacky, but it works

		// Store the initial stack for next reset
		this.initialStack = initialStack;

		// Keep the input from the previous one if it has not yet started
		let input = [];
		if (this.executor && !this.executor.hasStarted) {
			input = this.executor.inputBuffer;
		}

		// Create the executor
		this.executor = new FishExecutor(this.props.source, initialStack);

		// Give it the input
		input.forEach((c) => this.executor.giveInput(c));

		// Initialize the state
		this.extractData(this.executor);

		// Subscribe to updates in the executor
		this.executor.onUpdate(this.extractData);
	}

	/**
	 * Extracts data from the executor and puts it on the state
	 *
	 * @param {FishExecutor} e	The executor
	 */
	extractData(e) {
		// Update the state
		this.setState({
			grid: e.grid,
			instructionPointer: e.instructionPointer,
			inputBuffer: e.inputBuffer,
			stackSnapshot: e.stackSnapshot,
			output: e.output,
			error: e.error,
			intervalTime: e.intervalTime,
			hasStarted: e.hasStarted,
			isPaused: e.isPaused,
			hasTerminated: e.hasTerminated,
			advances: e.advances
		});
	}

	/**
	 * Changes the timeout interval, e.g. execution speed
	 *
	 * @param {Integer} newInterval	New interval timeout to use
	 */
	changeIntervalTime(newInterval) {
		// Tell the executor
		this.executor.intervalTime = newInterval;

		// Update the state
		this.setState({intervalTime: this.executor.intervalTime});
	}

	render() {
		return (
			<Layout>
				<div className="code-executor-view col">
					<CodeView
					  grid={this.state.grid}
					  instructionPointer={this.state.instructionPointer}
					  />
					<ExecutorControls
					  intervalTime={this.state.intervalTime}
					  changeIntervalTime={this.changeIntervalTime}
					  hasStarted={this.state.hasStarted}
					  isPaused={this.state.isPaused}
					  hasTerminated={this.state.hasTerminated}
					  run={this.executor.run}
					  pause={this.executor.pause}
					  resume={this.executor.resume}
					  step={this.executor.step}
					  giveInput={this.executor.giveInput}
					  reset={this.reset.bind(this, this.initialStack)}
					  setInitialStack={this.reset}
					  inputBuffer={this.state.inputBuffer}
					  stackSnapshot={this.state.stackSnapshot}
					  output={this.state.output}
					  advances={this.state.advances}
					  error={this.state.error}
					  />
				</div>
			</Layout>
		);
	}
}

/*************
 * Export it *
 *************/

export default FishExecutorView;
export {
	FishExecutorView
};
