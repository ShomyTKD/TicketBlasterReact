import Header from './layout/Header'
import Footer from './layout/Footer'
import Hero from './hero/Hero'
import Events from './events/Events'
import Concerts from './pages/Concerts'
import Comedy from './pages/Comedy'
import SingleEvent from './singleEvent/SingleEvent'
import Login from './auth/Login'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import Signup from './auth/Signup'
import TicketsHistory from './user/TicketsHistory'
import UserProfile from './user/UserProfile'

import { Route, Routes } from 'react-router-dom';

export default function App() {
    return (
        <div id='container'>
            <Header />
            <div>
                <Routes>
                    <Route path='/' element={
                        <>
                            <Hero />
                            <Events />
                        </>
                    } />
                    <Route path='/concerts' element={<Concerts />}></Route>
                    <Route path='/comedy' element={<Comedy />}></Route>
                    <Route path='/event' element={<SingleEvent />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/forgot-password' element={<ForgotPassword />}></Route>
                    <Route path='/reset-password/:token' element={<ResetPassword></ResetPassword>}></Route>
                    <Route path='/create-account' element={<Signup />}></Route>
                    <Route path='/user/' element={<UserProfile />}>
                        <Route path='tickets-history' element={<TicketsHistory />}></Route>
                        <Route path='user-details' element={<UserProfile />}></Route>
                    </Route>

                </Routes>
            </div>
            <Footer />
        </div>
    )
}