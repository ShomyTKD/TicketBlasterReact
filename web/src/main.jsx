import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'

import { BrowserRouter } from 'react-router-dom';
import UserProvider from './Context/UserProvider'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <App />
            </UserProvider>
        </BrowserRouter>
    </StrictMode>
)
