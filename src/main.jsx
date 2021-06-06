import './styles/style.scss';
import 'bootstrap';
import ReactDOM from 'react-dom';
import React from 'react';
import Controller from './js/components/Controller.jsx';

ReactDOM.render(
	<React.StrictMode>
		<Controller />
	</React.StrictMode>,
	document.getElementById('root'));
