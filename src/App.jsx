import Modal from "./components/ModalWindow"
import { Routes, Route, Link } from "react-router-dom"
import "./App.css"
import Quiz from "./components/Quiz"
import Question from "./components/Question"

function App() {
	
	return (
		<div>
			<Routes>
				<Route path="/" element={<Modal />} />
				<Route path="/start" element={<Modal />} />
				<Route path="/quiz" element={<Quiz />}>
					<Route path=":questionIndex" element={<Question />} />
				</Route>
				<Route
					path="*"
					element={
						<main style={{ padding: "1rem" }}>
						<p>There's nothing here!</p>
						</main>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
