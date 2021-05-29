import React, { createContext, useReducer } from 'react'
import AppRouter from './AppRouter'

const token = document
    .querySelector('meta[name=csrf-token]')
    .getAttribute('content')

const initialState = {
    categories: [],
}

const actions = {
    SET_CATEGORIES: 'SET_CATEGORIES',
    ADD_CATEGORY: 'ADD_CATEGORY',
    ADD_EXPENSE: 'ADD_EXPENSE',
    EDIT_CATEGORY: 'EDIT_CATEGORY',
    EDIT_EXPENSE: 'EDIT_EXPENSE',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    DELETE_EXPENSE: 'DELETE_EXPENSE',
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case actions.SET_CATEGORIES:
            return { ...state, categories: payload }
        case actions.ADD_CATEGORY:
            return { ...state, categories: state.categories.concat(payload) }
        case actions.ADD_EXPENSE:
            return {
                ...state,
                categories: state.categories.map((c) =>
                    c.id === payload.categoryId ? c.expenses.concat(payload) : c
                ),
            }
        case actions.EDIT_CATEGORY:
            return {
                ...state,
                categories: state.categories.map((c) =>
                    c.id === payload.id ? payload : c
                ),
            }
        case actions.EDIT_EXPENSE:
            return {
                ...state,
                categories: state.categories.map((c) =>
                    c.id === payload.categoryId
                        ? c.expenses.map((e) =>
                              e.id === payload.id ? payload : e
                          )
                        : c
                ),
            }
        case actions.DELETE_CATEGORY:
            return {
                ...state,
                categories: state.filter.map((c) => c.id !== payload.id),
            }
        case actions.DELETE_EXPENSE:
            return {
                ...state,
                categories: state.categories.map((c) =>
                    c.id === payload.categoryId
                        ? c.expenses.filter((e) => e.id !== payload.id)
                        : c
                ),
            }
        default:
            return state
    }
}

export const ExpenseContext = createContext()

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = {
        token,
        categories: state.categories,
        setCategories: (payload) =>
            dispatch({ type: actions.SET_CATEGORIES, payload }),
        addCategory: (payload) =>
            dispatch({ type: actions.ADD_CATEGORY, payload }),
        addExpense: (payload) =>
            dispatch({ type: actions.ADD_EXPENSE, payload }),
        editCategory: (payload) =>
            dispatch({ type: actions.EDIT_CATEGORY, payload }),
        editExpense: (payload) =>
            dispatch({ type: actions.EDIT_EXPENSE, payload }),
        deleteCategory: (payload) =>
            dispatch({ type: actions.DELETE_CATEGORY, payload }),
        deleteExpense: () =>
            dispatch({ type: actions.DELETE_EXPENSE, payload }),
    }

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}

const App = () => (
    <ContextProvider>
        <AppRouter />
    </ContextProvider>
)

export default App
