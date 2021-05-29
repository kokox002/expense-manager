import React, { Fragment, useEffect, useContext, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import { ExpenseContext } from './App'
import Spinner from 'react-bootstrap/Spinner'
import AppNav from './AppNav'
import Home from './Home'
import Reports from './Reports'

const AppRouter = () => {
    const { token, setCategories } = useContext(ExpenseContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const result = await axios({
                method: 'get',
                url: '/v1/categories',
                data: {
                    auth: token,
                },
            })

            setCategories(result.data.categories)
            setIsLoading(false)
        }

        fetchData()
    }, [])

    return (
        <Fragment>
            <Router>
                <AppNav />
                <div
                    className="container-fluid d-flex align-stretch flex-column px-lg-8"
                    style={{ minHeight: 'calc(100vh - 56px)' }}
                >
                    {isLoading ? (
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ flex: '1' }}
                        >
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Switch>
                            <Route path="/reports" component={Reports} />
                            <Route path="/" component={Home} />
                        </Switch>
                    )}
                </div>
            </Router>
        </Fragment>
    )
}

export default AppRouter
