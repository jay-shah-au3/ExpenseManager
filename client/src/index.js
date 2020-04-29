import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<Provider store = {store}>
			<App/>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// serviceWorker.unregister();