import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'

import AppLayout from "./components/App";

import Home from './components/pages/Home'
import Concerts from './components/pages/Concerts'
import Comedy from './components/pages/Comedy'
import SingleEvent from './components/singleEvent/SingleEvent'
import Login from './components/auth/Login'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import Signup from './components/auth/Signup'
import TicketsHistory from './components/user/TicketsHistory'
import UserProfile from './components/user/UserProfile'

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/concerts",
                element: <Concerts />
            },
            {
                path: "/comedy",
                element: <Comedy />
            },
            {
                path: "/event",
                element: <SingleEvent />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "/reset-password/:token",
                element: <ResetPassword />
            },
            {
                path: "/create-account",
                element: <Signup />
            },
            {
                path: "/user/",
                element: <UserProfile />
            },
            {
                path: "/user/tickets-history",
                element: <TicketsHistory />
            },
            {
                path: "/user/user-details",
                element: <UserProfile />
            },

        ],
        errorElement: <h1>Error</h1>
    },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)