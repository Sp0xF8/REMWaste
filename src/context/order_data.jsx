import React, { createContext, useState} from 'react';

import { Order } from '../objects/order';

const OrderContext = createContext();

// context/OrderContext.jsx
export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState(new Order());

    const updateOrderField = (key, value) => {
        setOrder(prev => {
            const updated = new Order();
            Object.assign(updated, prev);
            updated[key] = value;
            return updated;
        });
    };

    return (
        <OrderContext.Provider value={{ order, setOrder, updateOrderField }}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContext};