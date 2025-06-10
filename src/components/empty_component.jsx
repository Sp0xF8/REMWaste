
import React from 'react';
import { OrderProgressContext } from '../context/order_progress';
import { OrderContext } from '../context/order_data';

function EmptyComponent() {
  const { nextStep } = React.useContext(OrderProgressContext);
  const { order } = React.useContext(OrderContext);
  return (
    <div className="empty-component">
      <h1>Empty Component</h1>
      <p>This component is intentionally left empty.</p>

      <h2>Skip Size Selected : {order.skipSize}</h2>

      <button onClick={nextStep} className="continue-button">
        Continue
      </button>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />


      <p>Data recorded in Order object:</p>
      {order && (
        <ul>
          {Object.entries(order).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {JSON.stringify(value)}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default EmptyComponent;