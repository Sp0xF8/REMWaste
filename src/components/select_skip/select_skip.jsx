import React from "react";

import { SkipSelectionProvider } from "../../context/skip_selection";
import SkipNavigation from "./options_nav";
import SkipOption from "./option";
import "../../styles/skip_selection_nav.css";

function SelectSkip() {


    return (
        <SkipSelectionProvider>
            <div className="select-skip-container">
                <SkipNavigation />

                <SkipOption />
            </div>
        </SkipSelectionProvider>
    );
}

export default SelectSkip;