'use strict';


import {v4 as uuidv4} from 'uuid';


export class UtilityClass {


    constructor() {

        this.request_q = 0;
    }


    // Puedo escuchar un evento para saber las llamadas a los métodos de esta clase?
    // this.request_q++;

    print(msg, result) {

        let _tmpString = '[' + msg + ']';
        _tmpString += result;

        console.log(_tmpString);
    }


    generateUuid() {

        return uuidv4();
    }
}