import React, { useContext } from 'react'
import { ExpenseContext } from './App'
import Card from 'react-bootstrap/Card'
import { currencyFormat } from './utils'

const Reports = () => {
    const { categories } = useContext(ExpenseContext)
    const categoriesWithAMonthOldExpenses = categories.map((c) => {
        const today = new Date()
        const aMonthAgo = new Date(new Date().setDate(today.getDate() - 30))
        return {
            ...c,
            expenses: c.expenses.filter(
                (e) =>
                    new Date(e.date) >= aMonthAgo && new Date(e.date) <= today
            ),
        }
    })
    const categoriesTotalExpenseInAMonth = categoriesWithAMonthOldExpenses.map(
        (c) => {
            return {
                id: c.id,
                title: c.title,
                total: c.expenses.reduce(
                    (acc, curr) => acc + Number(curr.value),
                    0
                ),
            }
        }
    )
    const totalExpenseInAMonth = categoriesTotalExpenseInAMonth.reduce(
        (acc, curr) => acc + curr.total,
        0
    )
    const categoriesInAMonthReportRows =
        categoriesWithAMonthOldExpenses.length > 0
            ? [...categoriesTotalExpenseInAMonth]
                  .sort((a, b) => b.total - a.total)
                  .map((c) => (
                      <Card body key={c.id} className="mb-3">
                          <Card.Title>{c.title}</Card.Title>
                          <Card.Text>
                              Php {currencyFormat(c.total)} (
                              {((c.total / totalExpenseInAMonth) * 100).toFixed(
                                  2
                              )}
                              %)
                          </Card.Text>
                      </Card>
                  ))
            : 'No expenses in the last 30 days.'

    return (
        <div className="py-3">
            <h1 className="mb-4">Top expenses in the last 30 days</h1>
            {categoriesInAMonthReportRows}
        </div>
    )
}

export default Reports
