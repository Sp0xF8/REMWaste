import React, {createContext, useState, useEffect} from "react";
import { orderProcess } from "../components/order_process";

const OrderProgressContext = createContext();

// context/OrderProgressContext.jsx

export const OrderProgressProvider = ({ children }) => {
    const [current_step, setCurrentStep] = useState(2);

    const [current_componet, setCurrentComponent] = useState(orderProcess[2]); // starts on the "Select Skip" section

    useEffect(() => {
        setCurrentComponent(orderProcess[current_step]);
    }, [current_step]);

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, orderProcess.length - 1));
    };
    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    return (
        <OrderProgressContext.Provider value={{ 
            current_step, 
            current_componet, 
            nextStep, 
            prevStep 
        }}>
            {children}
        </OrderProgressContext.Provider>
    );

}


export { OrderProgressContext};
