'use strict'

class SelectorManager {


    constructor() {

        this._id = undefined;
        this._instances = null;
        this._selectors = {
            observable_items: '.ux-select-observe'
        };

        this._initialize();

        return this._id;
    }


    _initialize() {

        this._id = this._generateId();
        this._instances = 0;
    }


    _generateId() {

        return Date.now();
    }


    getId() {

        return this._id;
    }


    newInstance() {

        let _tmpId = this._generateId();
        this._instances++;

        return new SelectorComponent(this._id, _tmpId);
    }


    getInstances() {

        return this._instances;
    }
}
