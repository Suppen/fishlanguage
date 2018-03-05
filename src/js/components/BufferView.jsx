"use strict";

/**************************
 * Import important stuff *
 **************************/

import React from "react";

/****************************
 * The BufferView component *
 ****************************/

class BufferView extends React.Component {
	constructor(props) {
		super(props);

		// Set initial state
		this.state = {
			viewMode: this.props.initialViewMode
		};

		// Bind methods
		this.toggleViewmode = this.toggleViewmode.bind(this);
	}

	/**
	 * Toggles between displaying the buffer as numbers and characters
	 */
	toggleViewmode() {
		// Find the opposite value
		const newMode = this.state.viewMode === BufferView.CHARACTERS
		  ? BufferView.NUMBERS
		  : BufferView.CHARACTERS
		;

		// Update the state
		this.setState({viewMode: newMode});
	}

	render() {
		// The buffer is initially numbers. Check if it should be converted to chars for display
		const buffer = this.state.viewMode === BufferView.CHARACTERS
		  ? this.props.buffer.map((num) => String.fromCharCode(num))
		  : this.props.buffer
		;

		return (
			<div className={this.props.className}>
				<label>
					<button type="button" className="btn btn-secondary btn-sm" onClick={this.toggleViewmode}><span className="fas fa-eye"></span></button>
					<span>{this.props.label}</span>
				</label>
				<div className="buffer-view">
					{buffer.length === 0
					  ? <p>Empty</p>
					  : (
						<table>
							<tbody>
								<tr>
									{buffer.map((value, i) => {
										return (<td key={i}>{value}</td>);
									})}
								</tr>
							</tbody>
						</table>
					  )
					}
				</div>
			</div>
		);
	}

	/**
	 * Constant meaning buffer should be displayed as characters
	 *
	 * @type String
	 *
	 * @constant
	 */
	static get CHARACTERS() {
		return "chars";
	}

	/**
	 * Constant meaning buffer should be displayed as numbers
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

export default BufferView;
export {
	BufferView
};
