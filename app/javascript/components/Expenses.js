import React, { Fragment, useContext, useState } from 'react'
import axios from 'axios'
import { ExpenseContext } from './App'
import { useParams, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ExpenseModal from './ExpenseModal'
import ConfirmationModal from './ConfirmationModal'
import { Edit, Trash } from 'react-feather'
import { currencyFormat } from './utils'

const Expenses = () => {
    const { id } = useParams()
    const { token, categories, deleteExpense } = useContext(ExpenseContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedExpense, setSelectedExpense] = useState(null)
    const category = categories.find((c) => c.id === id)

    const handleEdit = (expense) => {
        setSelectedExpense(expense)
        setIsModalOpen(true)
    }

    const handleDelete = (expense) => {
        setSelectedExpense(expense)
        setIsConfirmModalOpen(true)
    }

    const handleConfirmDelete = () => {
        setIsDeleteLoading(true)
        axios({
            method: 'post',
            url: `/v1/delete_expense`,
            data: {
                authenticity_token: token,
                expense: {
                    id: selectedExpense.id,
                },
            },
        })
            .then((res) => {
                if (res.data.success) {
                    deleteExpense(selectedExpense)
                    setIsConfirmModalOpen(false)
                } else {
                    setErrorMessage(res.data.message)
                }
                setIsDeleteLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setErrorMessage(
                    'Sorry something went wrong, please try again later.'
                )
                setIsDeleteLoading(false)
            })
    }

    const handleConfirmModalClose = () => {
        setErrorMessage('')
        setIsConfirmModalOpen(false)
    }

    const expenseRows =
        category && category.expenses.length > 0
            ? category.expenses.map((e) => (
                  <Card key={e.id} className="mb-3">
                      <Card.Body className="d-flex">
                          <div className="mr-auto">
                              <Card.Title>{e.title}</Card.Title>
                              <Card.Subtitle>{e.date}</Card.Subtitle>
                              <Card.Text>{e.description}</Card.Text>
                          </div>
                          <a
                              className="btn-link-black block-link-link"
                              onClick={() => handleEdit(e)}
                              style={{ marginTop: '-2px' }}
                          >
                              <Edit size={18} />
                          </a>
                          <a
                              className="btn-link-black block-link-link"
                              onClick={() => handleDelete(e)}
                              style={{ marginTop: '-2px' }}
                          >
                              <Trash size={18} />
                          </a>
                      </Card.Body>
                      <Card.Footer className="d-flex">
                          <span className="mr-auto font-weight-bold">
                              Amount
                          </span>
                          <span className="font-weight-bold">
                              Php {currencyFormat(e.value)}
                          </span>
                      </Card.Footer>
                  </Card>
              ))
            : 'There are currently no expenses.'

    return (
        <Fragment>
            {category && (
                <div className="py-3">
                    <div className="mb-2">
                        <Link to="/home">Back</Link>
                    </div>
                    <div className="d-flex flex-wrap mb-4">
                        <h1 className="mr-auto">{category.title}</h1>
                        <Button
                            variant="link"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Add Expense
                        </Button>
                    </div>
                    <ExpenseModal
                        isModalOpen={isModalOpen}
                        handeModalClose={() => setIsModalOpen(false)}
                        expense={selectedExpense}
                        categoryId={category.id}
                    />
                    <ConfirmationModal
                        isModalOpen={isConfirmModalOpen}
                        handeModalClose={handleConfirmModalClose}
                        handleSubmit={handleConfirmDelete}
                        confirmationMessage="Are you sure you want to delete this expense?"
                        isLoading={isDeleteLoading}
                        errorMessage={errorMessage}
                    />
                    <div>{expenseRows}</div>
                </div>
            )}
        </Fragment>
    )
}

export default Expenses
