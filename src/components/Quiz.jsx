import { useState, useEffect } from "react"
import { Outlet, useParams} from "react-router-dom"
import './Quiz.css'

function Quiz() {
    let params = useParams()
    
    const [state, setState] = useState({
        questions: [],
        question: {
            id: null,
            question: '',
            alternatives: [],
            correct_answer: ''
        },
        form: {
            value: 0
        },
        functions: {
            handleFormChange: e => handleFormChange(e),
            handleSubmit: e => handleSubmit(e)
        }
    })

    const [page, setPage] = useState(0)
    // const [score, setScore] = useState(0)
    
    // const [timer, setTimer] = useState(0)
    // const [timerId, setTimerId] = useState(null)
    
    // Obter questões pela API do Open Trivia DB (https://opentdb.com)
    function fetchQuestions() {
        fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    setState(prevState => {
                        return {
                            ...prevState, 
                            questions: data.results
                        }
                    })
                }
            })
            .catch(e => {
                console.error('API error: ', e);
            })
    }

    // Ao obter questões, renderizar uma questão por vez
    useEffect(() => {
        // Selecionar a questão o array pelo índice usando parâmetro da URL
        state.questions.forEach((element, index) => {
            if (index == params.questionIndex) {
                const selected_question = {
                    id: index,
                    question: element.question,
                    alternatives: element.incorrect_answers.concat(element.correct_answer),
                    correct_answer: element.correct_answer
                }
                setState(prevState => {
                    return {
                        ...prevState,
                        question: selected_question
                    }
                })
            }
        });
    }, [state.questions])

    // Quando o componente renderiza (componentDidMount)
    useEffect(() => {
        fetchQuestions()
    }, [])
    
    return (
        <div id="quizz_container">
            <h1>{`Question ${page + 1}`}</h1>
            <Outlet context={[state, setState]} />
        </div>
    )
}

export default Quiz
