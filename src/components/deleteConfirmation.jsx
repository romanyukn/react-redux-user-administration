import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

function DeleteConfirmation(props) {
    const {id, onDelete, show, hide} = props;

    return(
        <Modal
        show={show}
        onHide={hide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >

        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Confirm delete
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="container">
                <Row>
                    <Col sm={6}>

                        <Form>
                            <p>Do you really want to delete this user?</p>

                            <Form.Group>
                                <Button onClick={() => onDelete(id)}>
                                    Delete
                                </Button>{' '}
                                <Button variant="secondary"onClick={hide}>Cancel</Button>

                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Modal.Body>
    </Modal>
    )
}

export default DeleteConfirmation;


/* <div className="modal fade show" tabIndex="-1" role="dialog">
        //     <div className="modal-dialog" role="document">
        //         <div className="modal-content">
        //         <div className="modal-header">
        //             <h5 className="modal-title">Delete user</h5>
        //             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        //             <span aria-hidden="true">&times;</span>
        //             </button>
        //         </div>
        //         <div className="modal-body">
        //             <p>Are you sure you want to delete this user?</p>
        //         </div>
        //         <div className="modal-footer">
        //             <button type="button" className="btn btn-primary" onClick={() => onDelete(id)}>Delete</button>
        //             <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        //         </div>
        //         </div>
        //     </div>
        // </div> */