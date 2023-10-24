import Page from './routes';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HeadButtons from './components/head-buttons';

function App() {
	return (
		<>
			<HeadButtons />
			<Toaster />
			<Routes>
				<Route exact path="/pessoas" element={<Page.Home />} />

				<Route exact path="/pessoa/new" element={<Page.PersonForm />} />

				<Route exact path="/pessoa/:id" element={<Page.PersonDetails />} />

				<Route exact path="/pessoa/edit/:id" element={<Page.PersonForm />} />

				<Route path="*" element={<Navigate to="/pessoas" replace />} />
			</Routes>
		</>
	);
}

export default App;
