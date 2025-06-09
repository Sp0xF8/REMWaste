import '../../styles/skip_option.css';

import React from 'react';
import { SkipSelectionContext } from '../../context/skip_selection';

function SkipOption(){
    const { skipSelection } = React.useContext(SkipSelectionContext);


    React.useEffect(() => {
        if (skipSelection) {
            console.log("Selected skip:", skipSelection.id);
        }
    }, [skipSelection]);

    return (
        <div className="skip-selected">
            <h2>Selected Skip</h2>
            {skipSelection ? (
                <div>
                    <p>Size: {skipSelection.size} cubic yards</p>
                    <p>Price: £{skipSelection.price}</p>
                    <p>Location: {skipSelection.location}</p>
                </div>
            ) : (
                <p>No skip selected.</p>
            )}
        </div>
    );


}

export default SkipOption;


