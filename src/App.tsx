import { Route, Routes } from 'react-router-dom';
import SimpleExample from './pages/SimpleExample';
import MiddleExample from './pages/MiddleExample';
import DifficultExample from './pages/DifficultExample';
import DefaultPage from './pages/DefaultPage';
import './App.css';
import TestWS from './pages/TestWS';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<DefaultPage />}></Route>
				<Route path="/simple" element={<SimpleExample />} />
				<Route path="/middle" element={<MiddleExample />} />
				<Route path="/difficult" element={<DifficultExample />} />
				<Route path="/test-ws" element={<TestWS />} />
			</Routes>
		</>
	);
}

export default App;
