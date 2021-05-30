import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ExpenseContext } from './App'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const CategoryModal = ({ isModalOpen, handeModalClose, category }) => {
    const { token, addCategory, editCategory } = useContext(ExpenseContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isValidated, setIsValidated] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (category) {
            setTitle(category.title)
            setDescription(category.description)
        }
    }, [category])

    const handleClose = () => {
        setIsValidated(false)
        setTitle('')
        setDescription('')
        handeModalClose()
    }

    const submitCategory = () => {
        setIsLoading(true)
        axios({
            method: 'post',
            url: `/v1/${category ? 'edit_category' : 'add_category'}`,
            data: {
                authenticity_token: token,
                category: {
                    id: category ? category.id : null,
                    title,
                    description,
                },
            },
        })
            .then((res) => {
                if (res.data.success) {
                    const newCategory = {
                        id: category ? category.id : res.data.id,
                        title,
                        description,
                        expenses: category ? category.expenses : [],
                    }
                    if (category) {
                        editCategory(newCategory)
                    } else {
                        addCategory(newCategory)
                    }
                    handleClose()
                } else {
                    setErrorMessage(res.data.message)
                }
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setErrorMessage(
                    'Sorry something went wrong, please try again later.'
                )
                setIsLoading(false)
            })
    }

    const handleSubmit = () => {
        setIsValidated(true)
        setErrorMessage('')
        if (title) {
            submitCategory()
        }
    }

    return (
        <Modal show={isModalOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <h4 className="pl-2 mb-0">
                    {category ? 'Edit' : 'Add'} category
                </h4>
            </Modal.Header>
            <Modal.Body className="p-5">
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter title"
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                        isInvalid={isValidated && !title}
                        disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide title.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isLoading}
                />
            </Modal.Body>
            <Modal.Footer style={{ borderTop: 'none' }}>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    disabled={isLoading}
                    onClick={isLoading ? null : handleSubmit}
                >
                    {isLoading ? 'Loading…' : 'Ok'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CategoryModal
