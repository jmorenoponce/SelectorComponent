
class SelectorManager {

    constructor(test1, test2) {

        let _instances = null;
        let _manager = null;

        return this._initialize();
    }

    _initialize () {

        return this._newInstance();
    }

    newInstance () {

        this._manager = new SelectorComponent(test1, test2);

        return this._manager;
    }

    getInstances () {

        return this._instances;
    }

    _setInstances (amount) {

        this._instances = amount;
    }


}
