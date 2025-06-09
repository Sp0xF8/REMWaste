// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import OrderProcessNav from './components/process_nav'

import { orderProcess } from './components/order_process'

import { OrderProgressContext } from './context/order_progress'

import React, { useContext } from 'react'
function App() {

  const { current_step } = useContext(OrderProgressContext)


  const currentComponent = orderProcess[current_step]
  const CurrentComponent = currentComponent.component

  return (
    <>
      <OrderProcessNav />
      <div className='order-process-container'>
        <CurrentComponent />
      </div>

    </>
  )
}

export default App
