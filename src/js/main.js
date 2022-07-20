
"use strict"

const mySelectorManager = new SelectorManager();

const mySelectorComponent1 = mySelectorManager.newInstance();
const mySelectorComponent2 = mySelectorManager.newInstance();

mySelectorComponent1.bind(document.getElementsByClassName("ux-selector-observer"), {});
mySelectorComponent1.init();

mySelectorComponent2.bind(document.getElementsByClassName("ux-selector-observer"), {});
mySelectorComponent2.init();
