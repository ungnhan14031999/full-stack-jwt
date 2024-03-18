import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalDelete = (props) => {
    return (
        <Modal 
            show={props.show} 
            onHide={props.handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are your sure to delete this url role: <b>{props.dataModalDelete.url}</b></Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="secondary" 
                    onClick={props.handleClose}
                >
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    onClick={props.confirmDeleteRole}
                >
                    Confirm
                </Button>
            </Modal.Footer>
    </Modal>
    );
}

export default ModalDelete;