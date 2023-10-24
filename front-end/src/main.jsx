import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<MantineProvider>
			<App />
		</MantineProvider>
	</BrowserRouter>,
);
