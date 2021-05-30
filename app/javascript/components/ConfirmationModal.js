import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const ConfirmationModal = ({
    isModalOpen,
    handeModalClose,
    handleSubmit,
    confirmationMessage,
    isLoading,
    errorMessage,
}) => {
    return (
        <Modal show={isModalOpen} onHide={handeModalClose}>
            <Modal.Header closeButton />
            <Modal.Body className="p-5">
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {confirmationMessage}
            </Modal.Body>
            <Modal.Footer style={{ borderTop: 'none' }}>
                <Button
                    variant="secondary"
                    disabled={isLoading}
                    onClick={isLoading ? null : handleSubmit}
                >
                    {isLoading ? 'Loading…' : 'Yes'}
                </Button>
                <Button variant="secondary" onClick={handeModalClose}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal
