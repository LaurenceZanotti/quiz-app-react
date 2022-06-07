import Modal from "./components/ModalWindow"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import Quizz from "./components/Quizz"
import Question from "./components/Question"

function App() {
	
	return (
		<div>
			<Routes>
				<Route path="/" element={<Modal />} />
				<Route path="/start" element={<Modal />} />
				<Route path="/quizz" element={<Quizz />}>
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
