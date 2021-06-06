import { FC, useRef } from 'react';
import Layout from '../layouts/Layout';
import useLocalstorage from '../../hooks/useLocalstorage';

const STORAGE_KEY = 'code';

interface FishEditorProps {
	execute: () => void
}

const FishEditor: FC<FishEditorProps> = ({ execute }) => {
	const editor = useRef<HTMLTextAreaElement>(null);

	const localStorage = useLocalstorage();
	const defaultValue = localStorage.get(STORAGE_KEY) || '';

	const submit = () => {
		localStorage.set(STORAGE_KEY, editor.current?.value || '');

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
