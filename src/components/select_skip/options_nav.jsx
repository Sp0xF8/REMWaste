
import React, { useState, useEffect } from "react";
import { SkipSelectionContext } from "../../context/skip_selection";

import "../../styles/skip_options_nav.css";

function SkipNavigation(){

    const [skips, setSkips] = useState([]);
    const { updateSkipSelection, skips_Data } = React.useContext(SkipSelectionContext);

    useEffect(() => {
        let html = skips_Data.map((skip, index) => {
            return (
                <div key={index} className="skip-option" onClick={() => updateSkipSelection(skip.id)}>
                    <span>{skip.size} cubic yards</span>
                    <span>£{skip.price_before_vat * (1 + (skip.vat /100))}</span>
                </div>
            );
        });

        setSkips(html);

    }, [updateSkipSelection, skips_Data]);

    return (
        <div className="skip-navigation">

            <h2>Select a Skip</h2>
            <div className="skip-options-container">
                {skips}
            </div>


        </div>
    )


}

export default SkipNavigation;