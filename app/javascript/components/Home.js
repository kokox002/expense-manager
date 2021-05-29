import React, { useContext } from 'react'
import { ExpenseContext } from './App'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Home = () => {
    const { categories } = useContext(ExpenseContext)

    const categoryRows = categories.map((c) => (
        <Link key={c.id} to={`/categories/${c.id}`} className="btn-link-black mb-3">
            <Card>
                <Card.Body>
                    <Card.Title>{c.title}</Card.Title>
                    <Card.Text>{c.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    {c.expenses.length} expense
                    {c.expenses.length > 1 ? 's' : ''} listed
                </Card.Footer>
            </Card>
        </Link>
    ))

    return (
        <div className="py-3">
            <div className="d-flex mb-4">
                <h1 className="mr-auto">Categories</h1>
                <Button variant="link">+ Add Category</Button>
            </div>
            <div>{categoryRows}</div>
        </div>
    )
}

export default Home
