'use strict';


import $ from "jquery";


let selectorManager = new SelectorManager();


//  Users Selector Component
let userSelectorComponent = selectorManager.newComponent();

userSelectorComponent.bind($('app-user-selector'), {
    active: true,
    editable: true,
    dataSrc: './data-src/users-src.json'
});
userSelectorComponent.init();


// Another Selector Component for testing
let anotherSelectorComponent = selectorManager.newComponent();

anotherSelectorComponent.bind(document.getElementsByClassName("app-another-selector"), {
    // Example for some problems with a not valid config, course the component must show problem status.
    active: true,
    editable: true,
    dataSrc: './data-src/this-file-not-exist.json'
});
anotherSelectorComponent.init();


// Some test for functionality
console.log(selectorManager.id);
console.log(selectorManager.amountComponents);
console.log(selectorManager.getAllComponents);