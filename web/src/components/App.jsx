import Header from './layout/Header'
import Footer from './layout/Footer'

import { StrictMode } from 'react'
import UserProvider from '../Context/UserProvider'
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <StrictMode>
            <UserProvider>
                <div id='container'>
                    <Header />
                    <div id="content">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </UserProvider>
        </StrictMode>
    )
}

export default AppLayout;