import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { OrderProvider } from './context/order_data.jsx'
import { OrderProgressProvider } from './context/order_progress.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderProvider>
      <OrderProgressProvider>
        <App />
      </OrderProgressProvider>
    </OrderProvider>
  </StrictMode>,
)
