import { FC, useEffect, useRef, useState } from 'react';
// @ts-ignore
import FishExecutor from 'fish-interpreter';
import Layout from '../layouts/Layout';
import CodeView from './CodeView';
import ExecutorControls from './ExecutorControls';

interface FishExecutorViewProps {
	source: string
	edit: () => void
	initialStack?: number[]
}

interface FishExecutorViewState {
	grid: number[][]
	instructionPointer: { x: number, y: number }
	inputBuffer: string[]
	stackSnapshot: number[]
	output: string
	error: Error | null
	intervalTime: number
	hasStarted: boolean
	isPaused: boolean
	hasTerminated: boolean
	advances: number
}

const FishExecutorView: FC<FishExecutorViewProps> = ({ source, initialStack, edit }) => {
	const [state, setState] = useState<FishExecutorViewState>({
		grid: [],
		instructionPointer: { x: 0, y: 0 },
		inputBuffer: [],
		stackSnapshot: [],
		output: '',
		error: null,
		intervalTime: 0,
		hasStarted: false,
		isPaused: false,
		hasTerminated: false,
		advances: 0,
	});

	const extractData = (executor: FishExecutor) => {
		// Update the state
		setState({
			grid: executor.grid,
			instructionPointer: executor.instructionPointer,
			inputBuffer: executor.inputBuffer,
			stackSnapshot: executor.stackSnapshot,
			output: executor.output,
			error: executor.error,
			intervalTime: executor.intervalTime,
			hasStarted: executor.hasStarted,
			isPaused: executor.isPaused,
			hasTerminated: executor.hasTerminated,
			advances: executor.advances,
		});
	};

	const changeIntervalTime = (newInterval: number) => {
		// Tell the executor
		executor.current.intervalTime = newInterval;

		// Update the state
		setState(prev => ({
			...prev,
			intervalTime: newInterval,
		}));
	};

	const [localInitialStack, setLocalInitialStack] = useState<number[]>([]);
	const executor = useRef<FishExecutor>();

	const reset = (newInitialStack: number[]) => {
		// XXX This whole method is quite hacky, but it works

		// Store the initial stack for next reset
		setLocalInitialStack(newInitialStack);

		// Keep the input from the previous one if it has not yet started
		let input: number[] = [];
		if (executor.current && !executor.current.hasStarted) {
			input = executor.current.inputBuffer;
		}

		// Create the executor
		executor.current = new FishExecutor(source, newInitialStack);

		// Give it the input
		input.forEach((c) => executor.current.giveInput(c));

		// Initialize the state
		extractData(executor.current);

		// Subscribe to updates in the executor
		executor.current.onUpdate(extractData);
	};

	useEffect(() => {
		reset(initialStack || []);
	}, []);

	if (!executor.current) {
		return null;
	}

	return (
		<Layout>
			<div className="fish-code-executor-view col">
				<CodeView
					grid={state.grid}
					instructionPointer={state.instructionPointer}
				/>
				<ExecutorControls
					intervalTime={state.intervalTime}
					changeIntervalTime={changeIntervalTime}
					hasStarted={state.hasStarted}
					isPaused={state.isPaused}
					hasTerminated={state.hasTerminated}
					run={executor.current.run}
					pause={executor.current.pause}
					resume={executor.current.resume}
					step={executor.current.step}
					giveInput={executor.current.giveInput}
					reset={reset.bind(this, localInitialStack)}
					edit={edit}
					setInitialStack={reset}
					inputBuffer={state.inputBuffer}
					stackSnapshot={state.stackSnapshot}
					output={state.output}
					advances={state.advances}
					error={state.error}
				/>
			</div>
		</Layout>
	);
};

export default FishExecutorView;
