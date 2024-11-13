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
import UserDetails from "./components/user/UserDetails";
import UserPage from "./components/user/UserPage";

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
                path: "/user",
                element: <UserPage />,
                children: [
                    {
                        path: "tickets-history",
                        element: <TicketsHistory />
                    },
                    {
                        path: "user-details",
                        element: <UserDetails />
                    }
                ]
            },

        ],
        errorElement: <h1>Error</h1>
    },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)