import EmptyComponent from "./empty_component"
import SelectSkip from "./select_skip/select_skip"

export const orderProcess = [
    {
        id: 1,
        title: 'Postcode',
        component: EmptyComponent,
    },
    {
        id: 2,
        title: 'Waste Type',
        component: EmptyComponent,
    },
    {
        id: 3,
        title: 'Select Skip',
        component: SelectSkip,
    },
    {
        id: 4,
        title: 'Permit Check',
        component: EmptyComponent,
    },
    {
        id: 5,
        title: 'Choose Date',
        component: EmptyComponent,
    },
    {
        id: 6,
        title: 'Payment',
        component: EmptyComponent,
    }
]