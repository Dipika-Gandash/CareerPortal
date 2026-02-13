import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import HeroPage from './pages/HeroPage'
import Browse from './pages/Browse'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children : [
            {
                index: true,
                element: <HeroPage />

            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <SignUp />
            },
            {
                path: "/browse",
                element: <Browse />
            }
        ]
    }
])