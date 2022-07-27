'use strict';


import {v4 as uuidv4} from 'uuid';


export class UtilityClass {


    static request_q = 0; // Some extra functionality for my learning process


    constructor() {

        console.log(this.getMethods(this));
    }


    getMethods = (obj) => {

        let _currentObj = obj;
        let _properties = new Set();

        do {
            Object.getOwnPropertyNames(_currentObj).map(item => _properties.add(item));
        } while ((_currentObj = Object.getPrototypeOf(_currentObj)));

        return [..._properties.keys()].filter(item => typeof obj[item] === 'function');
    }


    testEnumerableDinamicMethod() {

        // This method is created for listing properties comparison
    }


    static print(msg, result) {

        let _tmpString = '[' + msg + ']';
        _tmpString += result;

        console.log(_tmpString);
    }


    static loadFromFile(path) {

        async function fetchData() {
            return await fetch(path)
                .then(response => response.json())
                .then((value) => {
                    return value;
                });
        }

        return fetchData();
    }


    static generateUuid() {

        return uuidv4();
    }
}