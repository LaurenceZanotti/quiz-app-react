import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

function Quiz() {
    
    const [questions, setQuestions] = useState([])
    const [page, setPage] = useState(0)
    const [score, setScore] = useState(0)

    const [timer, setTimer] = useState(0)
    const [timerId, setTimerId] = useState(null)
    
    // Começar timer
    function handleTimer(action="start") {
        let id = null
        if (action === "start") {
            id = setInterval(setTimer(timer + 1), 1000)
            setTimerId(id)
        } else if (action === "stop") {
            clearInterval(timerId)
        }
    }

    // Obter questões pela API do Open Trivia DB (https://opentdb.com)
    function getQuestions() {
        fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                // console.log(data);
            })
    }

    // Quando o componente renderiza (componentDidMount)
    useEffect(() => {
        getQuestions()
        handleTimer('start')
    }, [])

    return (
        <div>
            <div>
            {/* {questions.map((question, index) => (
                <Question 
                    key={index} 
                    correct_answer={question.correct_answer} 
                    wrong_answers={question.wrong_answers} 
                />
            ))} */}
            </div>
            <Outlet context={[questions, setQuestions]} />
        </div>
    )
}

export default Quiz
