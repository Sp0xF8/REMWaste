import '../../styles/skip_option.css';

import React from 'react';
import { SkipSelectionContext } from '../../context/skip_selection';
import { OrderContext } from '../../context/order_data';
import { OrderProgressContext } from '../../context/order_progress';
function SkipOption(){
    const { skipSelection } = React.useContext(SkipSelectionContext);
    const { updateOrderField } = React.useContext(OrderContext);
    const { nextStep } = React.useContext(OrderProgressContext);

    // React.useEffect(() => {
    //     if (skipSelection) {
    //         console.log("Selected skip:", skipSelection.id);
    //     }
    // }, [skipSelection]);


    const handleContinue = (e) => {
        e.preventDefault();
        if (skipSelection) {
            updateOrderField('skipSize', skipSelection.size);
        }
        nextStep();
    }

    return skipSelection && skipSelection.id ? (
        <div className="skip-selected-container">
                <div className='skip-selected'>
                    <div className='skip-selected-header'>
                        <h2>Selected Skip</h2>
                    </div>
                    <form onSubmit={handleContinue}>

                        <div className='skip-selected-body'>
                            <div className='skip-selected-body-col1'>
                                <div className='skip-selected-body-col1-row'>
                                    <div className='skip-selected-col1-row-label'><span>Size:</span></div>
                                    <div className='skip-selected-col1-row-value'><span>{skipSelection.size} cubic yards</span></div>
                                </div>
                                <div className='skip-selected-body-col1-row'>
                                    <div className='skip-selected-col1-row-label'><span>Hire Length:</span></div>
                                    <div className='skip-selected-col1-row-value'><span>{skipSelection.hire_period_days} days</span></div>
                                </div>
                                <div className='skip-selected-body-col1-row'>
                                    <div className='skip-selected-col1-row-label'><span>Price:</span></div>
                                    <div className='skip-selected-col1-row-value'><span>£{(skipSelection.price_before_vat).toFixed(2)}</span></div>
                                </div>
                                <div className='skip-selected-body-col1-row'>
                                    <div className='skip-selected-col1-row-label'><span>Price <span className="vatInc">(vat inc.)</span></span></div>
                                    <div className='skip-selected-col1-row-value'><span>£{(skipSelection.price_before_vat * (1 + (skipSelection.vat / 100))).toFixed(2)}</span></div>
                                </div>
                                <hr />
                                {skipSelection.transport_cost || skipSelection.per_tonne_cost ? (
                                    <div className='skip-selected-body-col1-row additional-costs'>
                                        <span>Additional Costs</span>
                                    </div>
                                ) : (<></>)}
                                {skipSelection.transport_cost ? (
                                    <div className='skip-selected-body-col1-row'>
                                        <div className='skip-selected-col1-row-label'><span>Transport Cost:</span></div>
                                        <div className='skip-selected-col1-row-value'><span>£{(skipSelection.transport_cost).toFixed(2)}</span></div>
                                    </div>
                                ) : (<></>)}

                                {skipSelection.per_tonne_cost ? (
                                    <div className='skip-selected-body-col1-row'>
                                        <div className='skip-selected-col1-row-label'><span>Per Tonne Cost:</span></div>
                                        <div className='skip-selected-col1-row-value'><span>£{(skipSelection.per_tonne_cost).toFixed(2)}</span></div>
                                    </div>
                                ) : (<></>)}

                                <div className={`skip-selected-body-col1-row ${skipSelection.allows_heavy_waste ? 'info-row' : 'warning-row'}`}>
                                    <div className='skip-selected-col1-row-label'><span>{skipSelection.allows_heavy_waste ? 'Holds heavy waste' : 'Does not hold heavy waste'}</span></div>
                                    {skipSelection.allows_heavy_waste ? (<></>) : (
                                        <div className='skip-selected-col1-row-value checkbox-container'>
                                            <span>Accept</span>
                                            <input type='checkbox' required/>
                                        </div>
                                    )}
                                </div>
                                <div className={`skip-selected-body-col1-row ${skipSelection.allowed_on_road ? 'info-row' : 'warning-row'}`}>
                                    <div className='skip-selected-col1-row-label'><span>{skipSelection.allowed_on_road ? 'Allowed on the road' : 'Not allowed on the road'}</span></div>
                                    {skipSelection.allowed_on_road ? (<></>) : (
                                        <div className='skip-selected-col1-row-value checkbox-container'>
                                            <span>Accept</span>
                                            <input type='checkbox' required/>
                                        </div>
                                    )}
                                </div>


                                
                            </div>
                            <div className='skip-selected-body-col2'>
                                <div className='skip-selected-image-container'>
                                    <img className='skip-selected-image' src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skipSelection.size}-yarder-skip.jpg`} alt={`Skip size ${skipSelection.size}`} />
                                </div>

                                <button className='skip-selected-body-col2-button' type='submit'>Continue</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
        ) : (<></>)
    
        


}

export default SkipOption;


