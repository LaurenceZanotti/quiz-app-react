import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useOutletContext, useParams } from "react-router-dom"

function Question() {
    const [state, setState] = useOutletContext()
    // let params = useParams()

    // Controle do formulário
    function handleFormChange(event) {
        // Obter id da alternativa
        const alternative_id = parseInt(event.target.id.replace('default-', ''))
        setState(prevState => {
            return {
                ...prevState,
                form: {value: alternative_id}
            }})
    }

    // Controle do envio do formulário
    function handleSubmit(event) {
        event.preventDefault()
        const selected_question = state.question.alternatives[state.form.value]
        if (selected_question == state.question.correct_answer) {
            console.log( selected_question, 'is correct');
        } else {
            console.log(selected_question, 'is incorrect');
        }
    }
    
    return (
        <div id="question">
            <Form >
            {<fieldset>
                <legend>{state.question.question}</legend>
                {state.question.alternatives.map((element, index) => (
                    <div key={`default-${index}`} className="mb-3">
                        <Form.Check 
                            onChange={e => handleFormChange(e)}
                            type={'radio'}
                            id={`default-${index}`}
                            label={`${element}`}
                            name={`question-${state.question.id}`}
                        />
                    </div>
                ))}
                </fieldset>}
            <Button 
                variant="primary" 
                type="submit" 
                onClick={e => handleSubmit(e)}
            >
            Next
            </Button>
            </Form>
        </div>
  )
}

export default Question