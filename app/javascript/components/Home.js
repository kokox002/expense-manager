import React, { useContext } from 'react'
import { ExpenseContext } from './App'
import Card from 'react-bootstrap/Card'

const Home = () => {
    const { categories } = useContext(ExpenseContext)

    const categoryRows = categories.map((c) => (
        <Card>
            <Card.Body>
                <Card.Title>{c.title}</Card.Title>
                <Card.Text>{c.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                {c.expenses.length} expense{c.expenses.length > 1 ? 's' : ''}{' '}
                listed
            </Card.Footer>
        </Card>
    ))

    return (
        <div className="py-3">
            <h1 className="mb-4">Categories</h1>
            <div>{categoryRows}</div>
        </div>
    )
}

export default Home
