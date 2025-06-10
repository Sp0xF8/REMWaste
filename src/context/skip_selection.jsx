import React from "react";


const SkipSelectionContext = React.createContext();


export const SkipSelectionProvider = ({ children }) => {
    const [skipSelection, setSkipSelection] = React.useState({});
    const [skips_Data, setSkipsData] = React.useState([]);


    
    const get_skip_data = async () => {
        try {
            const response = await fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const skips_available = await response.json();

            if (skips_available && skips_available.length > 0) {
                return skips_available;
            } else {
                console.error("No skips available for this location.");
                return [];
            }
        } catch (error) {
            console.error("Error fetching skip data:", error);
            return [];
        }
    };

    React.useEffect(() => {
        get_skip_data().then(setSkipsData);
    }, []);


    const updateSkipSelection = (newSelection) => {
        for (let i = 0; i < skips_Data.length; i++) {
            if (skips_Data[i].id === newSelection) {
                setSkipSelection(skips_Data[i]);
                break;
            }
        }
    }

    return (
        <SkipSelectionContext.Provider value={{ 
            skipSelection, 
            updateSkipSelection,
            skips_Data
        }}>
            {children}
        </SkipSelectionContext.Provider>
    );



}

export { SkipSelectionContext };

