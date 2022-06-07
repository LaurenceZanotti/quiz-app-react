import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function ModalWindow() {
    const [show, setShow] = useState(true)
    
    const handleClose = () => {
        setShow(false)
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Welcome to Quizz App!</Modal.Title>
            </Modal.Header>
            <Modal.Body>This quiz is about front-end technologies. Let's see if you've been practicing!</Modal.Body>
            <Modal.Footer>
                <Link to="/quiz/0">
                    <Button variant="primary">
                        Start
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalWindow