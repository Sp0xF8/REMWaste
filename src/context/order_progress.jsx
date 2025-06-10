import React, {createContext, useState, useEffect} from "react";
import { orderProcess } from "../components/order_process";

const OrderProgressContext = createContext();

// context/OrderProgressContext.jsx

export const OrderProgressProvider = ({ children }) => {
    const [current_step, setCurrentStep] = useState(1);

    const [current_componet, setCurrentComponent] = useState(orderProcess[1]); // starts on the "Waste type" section to demonstrate changing components

    useEffect(() => {
        setCurrentComponent(orderProcess[current_step]);
    }, [current_step]);

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, orderProcess.length - 1));
    };
    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const updateStep = (step) => {
        if (step >= 0 && step < orderProcess.length) {
            setCurrentStep(step);
        }
    };

    return (
        <OrderProgressContext.Provider value={{ 
            current_step, 
            current_componet, 
            nextStep, 
            prevStep,
            updateStep 
        }}>
            {children}
        </OrderProgressContext.Provider>
    );

}


export { OrderProgressContext};
