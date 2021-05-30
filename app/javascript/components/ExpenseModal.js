import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ExpenseContext } from './App'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const ExpenseModal = ({
    isModalOpen,
    handeModalClose,
    expense,
    categoryId,
}) => {
    const { token, addExpense, editExpense } = useContext(ExpenseContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isValidated, setIsValidated] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (expense) {
            setTitle(expense.title)
            setDate(expense.date)
            setValue(expense.value)
            setDescription(expense.description)
        }
    }, [expense])

    const handleClose = () => {
        setIsValidated(false)
        setTitle('')
        setDate('')
        setValue('')
        setDescription('')
        handeModalClose()
    }

    const submitExpense = () => {
        setIsLoading(true)
        axios({
            method: 'post',
            url: `/v1/${expense ? 'edit_expense' : 'add_expense'}`,
            data: {
                authenticity_token: token,
                expense: {
                    id: expense ? expense.id : null,
                    title,
                    date,
                    value,
                    description,
                    category_id: categoryId,
                },
            },
        })
            .then((res) => {
                if (res.data.success) {
                    const newExpense = {
                        id: expense ? expense.id : res.data.id,
                        title,
                        date,
                        value,
                        description,
                        categoryId,
                    }
                    if (expense) {
                        editExpense(newExpense)
                    } else {
                        addExpense(newExpense)
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
        if (title && date && value) {
            submitExpense()
        }
    }

    return (
        <Modal show={isModalOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <h4 className="pl-2 mb-0">
                    {expense ? 'Edit' : 'Add'} expense
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
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder="Enter date"
                        defaultValue={date}
                        onChange={(e) => setDate(e.target.value)}
                        isInvalid={isValidated && !date}
                        disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide date.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Value</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Enter value"
                        defaultValue={value}
                        onChange={(e) => setValue(e.target.value)}
                        isInvalid={isValidated && !value}
                        disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide value.
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

export default ExpenseModal
