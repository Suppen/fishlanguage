import { FC, useState } from 'react';
import { Mode } from '../../enum';

interface BufferViewProps {
	className: string
	label: string
	initialViewMode: Mode
	buffer: number[]
}

const BufferView: FC<BufferViewProps> = ({ className, label, initialViewMode, buffer }) => {
	const [viewMode, setViewMode] = useState(initialViewMode);

	const toggleViewMode = () => {
		setViewMode((prev) => prev === Mode.Text ? Mode.Number : Mode.Text);
	};

	const convertedBuffer = viewMode === Mode.Text
		? buffer.map((num) => String.fromCharCode(num))
		: buffer
	;

	return (
		<div className={className}>
			<label>
				<button type="button" className="btn btn-secondary btn-sm" onClick={toggleViewMode}>
					{viewMode === Mode.Text ? 'A' : '#'}
				</button>
				<span>{label}</span>
			</label>
			<div className="buffer-view">
				{convertedBuffer.length === 0
					? <p>Empty</p>
					: (
						<table>
							<tbody>
							<tr>
								{convertedBuffer.map((value, i) => {
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

};

export default BufferView;
