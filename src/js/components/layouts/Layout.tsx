import { FC } from 'react';

const Layout: FC = ({ children }) => {
	return (
		<div className="layout container bg-white">
			<div className="row">
				<h1 className="col text-center">{'The Online ><> Interpreter'}</h1>
			</div>
			<div className="row">
				<small className="col text-center">
					Source code available on <a href="https://github.com/Suppen/fishlanguage.com">GitHub</a>
				</small>
			</div>
			<div className="row">
				{children}
			</div>
		</div>
	);
};

export default Layout;
