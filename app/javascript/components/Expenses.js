import React, { Fragment, useContext } from 'react'
import { ExpenseContext } from './App'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { currencyFormat } from './utils'

const Expenses = () => {
    const { id } = useParams()
    const { categories } = useContext(ExpenseContext)
    const category = categories.find((c) => c.id === id)

    const expenseRows =
        category && category.expenses.length > 0
            ? category.expenses.map((e) => (
                  <Card key={e.id} className="mb-3">
                      <Card.Body>
                          <Card.Title>{e.title}</Card.Title>
                          <Card.Subtitle>{e.date}</Card.Subtitle>
                          <Card.Text>{e.description}</Card.Text>
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
                    <div className="d-flex mb-4">
                        <h1 className="mr-auto">{category.title}</h1>
                        <Button variant="link">+ Add Expense</Button>
                    </div>
                    <div>{expenseRows}</div>
                </div>
            )}
        </Fragment>
    )
}

export default Expenses
