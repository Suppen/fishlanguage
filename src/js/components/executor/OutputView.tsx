import { FC, useState } from 'react';
import { convertToHex } from '../../utils';
import { Mode } from '../../enum';

interface OutputViewProps {
	className: string
	output: string
}

const OutputView: FC<OutputViewProps> = ({ className, output }) => {
	const [viewMode, setViewMode] = useState(Mode.Text);

	const toggleViewMode = () => {
		setViewMode((prev) => prev === Mode.Text ? Mode.Number : Mode.Text);
	};

	const displayText = viewMode === Mode.Text
		? output
		: convertToHex(output);

	return (
		<div className={`${className} output-view`}>
			<label>
				<button
					type="button"
					className="btn btn-secondary btn-sm"
					onClick={toggleViewMode}
				>
					{viewMode === Mode.Text ? 'A' : 'x'}
				</button>
				<span>Output</span>
			</label>
			<pre className="bg-light">{displayText}</pre>
		</div>
	);
};

export default OutputView;
