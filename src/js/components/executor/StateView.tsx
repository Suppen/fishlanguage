import { FC } from 'react';
import BufferView from './BufferView';
import OutputView from './OutputView';
import { Mode } from '../../enum';

interface StateViewProps {
	inputBuffer: string[]
	stackSnapshot: number[]
	output: string
	advances: number
}

const StateView: FC<StateViewProps> = ({ inputBuffer, stackSnapshot, output, advances }) => {
	return (
		<div className="row">
			<BufferView
				buffer={inputBuffer.map((c) => c.charCodeAt(0))}
				initialViewMode={Mode.Text}
				label="Input queue"
				className="col-6"
			/>
			<BufferView
				buffer={stackSnapshot}
				initialViewMode={Mode.Number}
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
};

export default StateView;
