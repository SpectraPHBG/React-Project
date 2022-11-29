import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export function ErrorModal({error}){
    const [show, setShow] = useState(false);

    useEffect(()=> {
        if(error.length>0){
            handleShow()
        }
    },[error])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    );
}
