import React, {useState, useEffect} from 'react';
import { OrderProgressContext } from '../context/order_progress.jsx';

import { orderProcess } from './order_process.js';
import '../styles/order_process_nav.css';

function OrderProcessNav(){

    const { current_step, prevStep, updateStep } = React.useContext(OrderProgressContext);

    const [navOptions, setNavOptions] = useState([]);

    

    useEffect(() => {


        let html = orderProcess.map((step, index) => {
            return (
                <div
                    key={index}
                    className={`nav-option ${current_step > index ? 'under' : current_step === index ? 'active' : 'disabled'}`}
                    onClick={current_step > index ? () => updateStep(index) : undefined}
                >
                    <span>{step.title}</span>
                </div>
            );
        });

        setNavOptions(html);

    }, [current_step]);


    return (
        <div className='order-process-nav-container'>
            <div className='go-back' onClick={prevStep}>
                <span className='back-arrow'>&#8592;</span>
                <span>Go Back</span>
            </div>
            <div className="order-process-nav">
                {navOptions}
            </div>
        </div>
    );



}

export default OrderProcessNav;