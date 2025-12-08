import { Route, Routes } from 'react-router-dom';
import SimpleExample from './SimpleExample';
import MiddleExample from './MiddleExample';
import DifficultExample from './DifficultExample';
import DefaultPage from './DefaultPage';
import './App.css';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<DefaultPage />}></Route>
				<Route path="/simple" element={<SimpleExample />} />
				<Route path="/middle" element={<MiddleExample />} />
				<Route path="/difficult" element={<DifficultExample />} />
			</Routes>
		</>
	);
}

export default App;
