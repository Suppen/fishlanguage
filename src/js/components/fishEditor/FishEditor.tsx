import { FC, useRef } from 'react';
import Layout from '../layouts/Layout';

const STORAGE_KEY = 'code';

interface FishEditorProps {
	execute: () => void
}

const FishEditor: FC<FishEditorProps> = ({ execute }) => {
	const editor = useRef<HTMLTextAreaElement>(null);

	const defaultValue = localStorage.getItem(STORAGE_KEY) ?? '';

	const submit = () => {
		localStorage.setItem(STORAGE_KEY, editor.current?.value ?? '');

		execute();
	};

	return (
		<Layout>
			<div className="fish-code-editor col">
				<textarea
					className="form-control"
					ref={editor}
					defaultValue={defaultValue}
					placeholder={'Write your ><> code here'}
				/>
				<div className="btn-group">
					<button type="button" className="btn btn-primary" onClick={submit}>Submit</button>
				</div>
			</div>
		</Layout>
	);
};

export default FishEditor;
