# 72-hr React Coding Challenge (REMWaste)

## Contents

- [Goal](#goal)
- [Approach](#approach)
    - [Object Creation](#object-creation)
        - [WasteType](#wastetype)
        - [Serialiser Classes](#serialiser-classes)
            - [Address](#address)
            - [Order](#order)
        - [Configuration](#configuration)
    - [Context Creation](#context-creation)
        - [Order Data](#order-data)
        - [Order Progress](#order-progress)
        - [Skip Selection](#skip-selection)
    - [Progress Navigation](#progress-navigation)
        - [Navigation on Desktop](#navigation-on-desktop)
        - [Navigation on Smaller Devices](#navigation-on-smaller-devices)
        - [Navbar Movement](#navbar-movement)
        - [Empty Component](#empty-component)
    - [Skip Type Selection](#skip-type-selection)
        - [No Selection](#no-selection)
        - [Hover](#hover)
        - [Selected](#selected)
    - [Skip Details View](#skip-details-view)
        - [Information Blocks](#information-blocks)
        - [Desktop View](#desktop-view)
        - [Tablet View](#tablet-view)
        - [Mobile View](#mobile-view)

## Goal

![Original Site Screenshot](readme/origionalSite.jpg)

Your goal is to redesign the whole page to look completely different from the original page. You should keep its functionality intact.

 

Focus on clean, maintainable react code, responsiveness, and UI/UX improvements.
You need to incorporate the page to display correctly on mobile web browser and desktop
Use the data from this link to populate the skip options https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft


## Approach

Goal: Recreating the given page using pure React (no other ui/ux tools or external dependancies)

The aim here is to redesign the given page with simplicity and minimalism in mind. This is to help guide the customer through key steps in an intuitive manour, without overloading them. Overall, the design focuses on efficency; reducing the number of interactions needed to complete the same task whilst keeping the customer informed. 

Given the age range of potential customers, its assumed that not everyone will have implicit technical knowledge. As such, is it not assumed that a user will know to click on the navigation panel at the top of the old website. Whilst this "going back" functionality has been retained, an additonal "back" button has been incorperated: providing users with clear navigation. 

On the subject of the navigation panel; this was changed to more accurately show which step is currently being worked on. In the websites current version, it is conceiveable a user might assume they are on a previous tab given there is no real indication which is really selected. The updated version boasts minimalistic colour differences to clearly indicate which parts have been visited, which is currently being worked on, and what is left to complete. When space becomes an issue (smaller screen widths), all text is dropped from the navigation bar; besides the current window. This ensures that the user is never confused about the stage of their order process.

The solution designed should also be one which maintains the given development goals of Clean Code, Maintainability and Responsiveness. With this, designs should also be efficent in both space and speed. Addtionally, components should be broken down into their logical groupings: Process Bar / Process Navigator and the step currently being completed. The current step (in this case, Skip Selection), may also be made up of sub components. 

Contributing to the goal of maintainability is [**order_process.js**](src/components/order_process.js). This file is responsible for controlling which steps are in the order process, and which is currently being displayed. Simply adding a new component into the list will make it instantly appear in the navigator, without any updates to other parts of the order process. 

Quick Overview 
=
<video controls src="readme/quickoverview.mp4" title="Quick Overview of the features"></video>

### Object Creation

I started by creating some basic objects, allowing for better modulation, consistency and deployability. These consisted of Classes designed to boost efficency and assist in future development. Additionally, a needed configuration file is created; allowing for easy management of components in the order process. 

#### WasteType

This is a simple JavaScript style `enum` which holds the possible WasteTypes in string format. This is to help with consistency; ensuring the same string is always used. 

![WasteType Class](readme/WasteType.png)

#### Serialiser Classes
Serialiseable classes are incredibly useful when dealing with a frontend->backend relationship. With this, classes are defined to hold essential data that will eventually be translated to the backend. Thes classes come equipped with nested `toJSON()` functions, which return a data structure capable of being easily transferred using backend API. Additionally, these clases can also be initialised with a JSON structure; allowing for bi-directional data transfer. A side benefit of these front-end serialisation classes is the integration with a potential back-end database ORM.
> Whilst not included, these classses could also include validation functions- for example, ensuring that a skip size is selected before.

##### **Address**
The `Address` class holds typical location data (postcode, street, city, county). This object isnt used in the Skip Selection page, but is a demonstration of how the serialiser would behave in a wider setting.

![Address class](readme/Address.png)

##### **Order**
Similarly to the `Address`, `Order` holds the excess information like `skipSize`. This is where the selected skip in the Skip Selection comopnent is stored.

![Order Class](readme/Order.png)


#### Configuration
The Configuration setup allows for new components to be easily added to the system. Simply adding it in the list, with the ID being the order of the steps (1= The first step, 6= The Last Step). The Title is then used to populate the Progress bar, with the component being loaded once the navigator selects it.

![Configuration Object (orderProcess)](readme/orderProcessOBJ.png)

### Context Creation

The use of these context windows is to provide a localised scope, giving access to variables and functions in multiple positions. The benefits of combining storage like this is that data remains consistent across the application.

#### Order Data:
`OrderContext` - [order_data.jsx](src/context/order_data.jsx): Providing an `Order` object to the necessasary components. 
This is accompanied by two functions, `setOrder` and `updateOrderField`; allowing the Order to be updated as a whole, or by individual feature. 
> An example of `updateOrderField` can be seen in [option.jsx](src/components/select_skip/option.jsx): line 22. Here, `skipSize` is updated to the size of the selected skip. 

![Example of updating skipSize](readme/updateOrderField.png)


#### Order Progress:
`OrderProgressContext` - [order_progress.jsx](src\context\order_progress.jsx): Providing two variables and three functions, this context is responsible for handling component changes using the `orderProcess` configuration. 

The `current_step` defines which component is loaded. Every time this value is updated, a `useEffect` hook changes `current_component` to the updated JSON structure in `orderProcess`. An added benefit of proceeding with this method is that by default, it only responds to changes in the step; meaning same value submissions are automatically ignored- reducing the number of times a component needs to be rendered. 

![Change componenent useEffect](readme/orderprocessUE.png)

The three functions accompanying these variables in the context are `nextStep`, `prevStep`, and `updateStep`. These provide clipping; ensuring crashes do not occur as a result of exiting the bounds of `orderProcess`.


#### Skip Selection:
`SkipSelectionContext` - [skip_selection.jsx](src/context/skip_selection.jsx): Providing two key variables and one function, this context passes informaiton regarding the available skips to the necessasary components. This context window is not only responsible for getting the availble skips from the API route, but also handles the navigation between which skip is currently selected in the sub-menu. 

`skips_Data` holds all of the JSON data received from the API route. This is then passed through the context to avoid unnecessasary calls to the backend whenever this data is needed.

`skipSelection` defines which skip option is currently selected. This is a `useState` which holds the JSON data regarding the skip which is currently selected in the menu.

`updateSkipSelection(neewSelection:number)` is a function which takes the container ID provided in its JSON, finds it's corrisponding JSON structure in the `skips_Data` and sets the new `skipSelection` via its `useState` `setSkipSelection()` function. 

> Whilst this function could make use of expanding the list of JSON strctures into a map using the skip ID, given the number of skips in the array it isnt required. This could be easily updated in the future if a significant number of skips were introduced; but for now, the volume isnt great enough to consider a race condition. ![updateSkipSelection()](readme/updateSkipSelection.png)

### Progress Navigation

Next, i started work on the creation of the new [progress navigation bar](src/components/process_nav.jsx); allowing the user to navigate backwards. I stripped the icons, aiming to provide a sleek finish which blends together. This is inspired by a minimilistic interpertation of a slider effect, showing the left side of the active window as completed and the right side as "upcomming and unseen". 


#### Navigation on Desktop
![progress navigation](readme/image.png)


#### Navigation on Smaller Devices
![Small devices ](readme/smd-process-nav.png)


#### Navbar Movement

<video src="readme/navbar effect.mp4" controls width="600">
    ```markdown
        ![Download Movement Video](readme/navbar%20effect.mp4)
    ```
</video>


#### Empty Component
The empty component is used to facilitate the Navbar, and is what is referenced as the "main component" shown from switching the navigation. This simply has a continue button inside it, and displays the selected skip size.

![Empty Component](readme/empty-component.png)


### Skip Type Selection
This component offers an easy overview of all skip sizes offered. This comes complete with a hover and selected skip style; giving clear indicators. This can be particularly helpful with regards to potential clients with dyslexia by highlighting information.


#### No Selection
##### DESKTOP
![No selected skip](readme/Select-a-skip.png)

##### MOBILE
![No selected skip](readme/Select-a-skip-Mobile.png)
#### Hover
![Hover](readme/hovered-skip.png)

#### Selected
![Selected](readme/selected-skip.png)

### Skip Details View

#### Information Blocks
Information blocks are used as a way to quickly convey information. There are two types, Info blocks and Warning blocks. These present slightly differently, with warning blocks adding a checkbox. This checkbox acts as a way of the customer acknologing that the skip cannot be stored on the road and occasionally cannot store heavy waste.

**Info Block:**

![Info Block](readme/Info-block.png)

**Warning block** *(Desktop)* **:**

![Warning Block](readme/Warning-Block.png)

**Warning block** *(Mobile)* **:**

![Warning Block Mobile](readme/Warning-Block-Mobile.png)

#### Desktop View
![Desktop View](readme/DesktopView.png)

#### Tablet View
![Tablet View](readme/TabletView.png)

#### Mobile View
![Mobile View](readme/MobileView.png)