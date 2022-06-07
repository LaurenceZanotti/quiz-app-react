import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import './Quiz.css'

function Quiz() {
    
    const [questions, setQuestions] = useState([])
    const [page, setPage] = useState(0)
    const [score, setScore] = useState(0)

    const [timer, setTimer] = useState(0)
    const [timerId, setTimerId] = useState(null)
    
    // Obter questões pela API do Open Trivia DB (https://opentdb.com)
    function fetchQuestions() {
        fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                // console.log(data);
            })
    }

    // Quando o componente renderiza (componentDidMount)
    useEffect(() => {
        fetchQuestions()
    }, [])
        
    return (
        <div id="quizz_container">
            <h1>{`Question ${page + 1}`}</h1>
            <Outlet context={[questions, setQuestions]} />
        </div>
    )
}

export default Quiz
