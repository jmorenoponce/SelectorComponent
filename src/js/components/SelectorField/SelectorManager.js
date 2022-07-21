'use strict'


class SelectorManager {


    constructor() {

        this._id = undefined;
        this._components = 0;
        this._componentsObj = {};
        this._selectors = {
            observable_items: '.ux-select-observe'
        };

        this._initialize();
    }


    _initialize() {

        this._id = this._generateId();
    }


    newComponent() {

        let _tmpId = this._generateId();
        let _tmpObj = new SelectorComponent(this._id, _tmpId);

        this._components++;

        return _tmpObj;
    }


    getAllComponents() {

        // Devolver un array de objetos?
    }


    get amountComponents() {

        return this._components;
    }


    get id() {

        return this._id;
    }


    _generateId() {

        return Date.now();
    }
}
