import { FC } from 'react';

interface CodeViewProps {
	grid: number[][]
	instructionPointer: { x: number, y: number }
}

const CodeView: FC<CodeViewProps> = ({ grid, instructionPointer }) => (
	<table className="fish-program-code-view text-center">
		<tbody>
		{grid.map((row, y) => (
			<tr key={y}>
				{row.map((cell, x) => {
					// Check if this is where the instruction pointer is
					let className = null;
					if (Math.max(instructionPointer.x, 0) === x && instructionPointer.y === y) {	// XXX The IP starts at x = -1, but will never go there again
						className = 'active';
					}
					return (<td key={x} className={'fish-code-cell ' + className}>{String.fromCharCode(cell)}</td>);
				})}
			</tr>
		))}
		</tbody>
	</table>
);

export default CodeView;
