import React, { useContext, useState } from 'react'
import axios from 'axios'
import { ExpenseContext } from './App'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CategoryModal from './CategoryModal'
import ConfirmationModal from './ConfirmationModal'
import { Edit, Trash } from 'react-feather'
import { currencyFormat } from './utils'

const Home = () => {
    const { token, categories, deleteCategory } = useContext(ExpenseContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleEdit = (category) => {
        setSelectedCategory(category)
        setIsModalOpen(true)
    }

    const handleDelete = (category) => {
        setSelectedCategory(category)
        setIsConfirmModalOpen(true)
    }

    const handleConfirmDelete = () => {
        setIsDeleteLoading(true)
        axios({
            method: 'post',
            url: `/v1/delete_category`,
            data: {
                authenticity_token: token,
                category: {
                    id: selectedCategory.id,
                },
            },
        })
            .then((res) => {
                if (res.data.success) {
                    deleteCategory(selectedCategory)
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

    const categoryRows =
        categories.length > 0
            ? categories.map((c) => (
                  <div
                      key={c.id}
                      className="mb-3"
                      style={{ position: 'relative' }}
                  >
                      <Link
                          to={`/categories/${c.id}`}
                          className="btn-link-black block-link"
                      />
                      <Card>
                          <Card.Body className="d-flex">
                              <div className="mr-auto">
                                  <Card.Title>{c.title}</Card.Title>
                                  <Card.Text>{c.description}</Card.Text>
                              </div>
                              <a
                                  className="btn-link-black block-link-link"
                                  onClick={() => handleEdit(c)}
                                  style={{ marginTop: '-2px' }}
                              >
                                  <Edit size={18} />
                              </a>
                              <a
                                  className="btn-link-black block-link-link"
                                  onClick={() => handleDelete(c)}
                                  style={{ marginTop: '-2px' }}
                              >
                                  <Trash size={18} />
                              </a>
                          </Card.Body>
                          <Card.Footer className="d-flex">
                              <div className="mr-auto">
                                  {c.expenses.length} expense
                                  {c.expenses.length > 1 ? 's' : ''} listed
                              </div>
                              <div>
                                  Php{' '}
                                  {currencyFormat(
                                      c.expenses.reduce(
                                          (acc, curr) =>
                                              acc + Number(curr.value),
                                          0
                                      )
                                  )}
                              </div>
                          </Card.Footer>
                      </Card>
                  </div>
              ))
            : 'There are currently no categories.'

    return (
        <div className="py-3">
            <div className="d-flex flex-wrap mb-4">
                <h1 className="mr-auto">Categories</h1>
                <Button variant="link" onClick={() => setIsModalOpen(true)}>
                    + Add Category
                </Button>
            </div>
            <CategoryModal
                isModalOpen={isModalOpen}
                handeModalClose={() => setIsModalOpen(false)}
                category={selectedCategory}
            />
            <ConfirmationModal
                isModalOpen={isConfirmModalOpen}
                handeModalClose={handleConfirmModalClose}
                handleSubmit={handleConfirmDelete}
                confirmationMessage="Are you sure you want to delete this category? This will also delete all expenses under it."
                isLoading={isDeleteLoading}
                errorMessage={errorMessage}
            />
            <div>{categoryRows}</div>
        </div>
    )
}

export default Home
