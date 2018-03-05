"use strict";

/**************************
 * Import important stuff *
 **************************/

import React from "react";
import BufferView from "./BufferView.jsx";
import OutputView from "./OutputView.jsx";

/***************************
 * The StateView component *
 ***************************/

function StateView({inputBuffer, stackSnapshot, output, advances}) {
	return (
		<div className="row">
			<BufferView
			  buffer={inputBuffer.map((c) => c.charCodeAt(0))}
			  initialViewMode={BufferView.CHARACTERS}
			  label="Input queue"
			  className="col-6"
			  />
			<BufferView
			  buffer={stackSnapshot}
			  initialViewMode={BufferView.NUMBERS}
			  label="Stack"
			  className="col-6"
			  />
			<OutputView
			  output={output}
			  className="col-6"
			  />
			<div className="col-6">
				<label>Steps taken</label>
				<p>{advances}</p>
			</div>
		</div>
	);
}

/*************
 * Export it *
 *************/

export default StateView;
export {
	StateView
};
