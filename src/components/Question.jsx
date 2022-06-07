import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useOutletContext, useParams } from "react-router-dom"

function Question(props) {
    const [questions, setQuestions] = useOutletContext()
    let params = useParams()
    const [question, setQuestion] = useState({
        id: null,
        question: '',
        alternatives: [],
        correct_answer: ''
    })
    const [form, setForm] = useState({value: 0})

    // Controle do formulário
    function handleFormChange(event) {
        // Obter id da alternativa
        const alternative_id = parseInt(event.target.id.replace('default-', ''))
        setForm(alternative_id)
    }

    // Controle do envio do formulário
    function handleSubmit(event) {
        event.preventDefault()
        const selected_question = question.alternatives[form]
        if (selected_question == question.correct_answer) {
            console.log( selected_question, 'is correct');
        } else {
            console.log(selected_question, 'is incorrect');
        }
    }

    // Ao obter questões, renderizar uma questão por vez
    useEffect(() => {
        // Selecionar a questão o array pelo índice usando parâmetro da URL
        questions.forEach((element, index) => {
            if (index == params.questionIndex) {
                const selected_question = {
                    id: index,
                    question: element.question,
                    alternatives: element.incorrect_answers.concat(element.correct_answer),
                    correct_answer: element.correct_answer
                }
                setQuestion(selected_question)

                // console.log(selected_question);
            }
        });
    }, [questions])

    return (
        <div id="question">
            <Form >
            <fieldset>
                <legend>{question.question}</legend>
                {question.alternatives.map((element, index) => (
                    <div key={`default-${index}`} className="mb-3">
                        <Form.Check 
                            onChange={e => handleFormChange(e)}
                            type={'radio'}
                            id={`default-${index}`}
                            label={`${element}`}
                            name={`question-${question.id}`}
                        />
                    </div>
                ))}
            </fieldset>
            <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>Next</Button>
            </Form>
        </div>
  )
}

export default Question