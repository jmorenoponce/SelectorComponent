'use strict';


export class SelectorData {


    static _JSON_KEYS = {

        NAME: 'dataSource',
        NOTES: 'notes',
        CATEGORY_KEY: 'categoryKey',
        LAST_SELECTED_IDS: 'lastItemsSelected',
        DATA: 'data'
    }


    constructor() {

        this.data = {};

        this.configObj = {
            categoryKey: '',
            lastSelectedIds: [],
            filter: function (term, item) {
                return Object.values(item).toString().toLowerCase().includes((term));
            }
        };
    }


    /**
     * Take de values from json data filling owner configuration keys.
     *  <data> and <category_key> are required keys.
     * @param dataSrc
     * @returns {boolean}
     */
    load(dataSrc) {

        if (!dataSrc.hasOwnProperty(SelectorData._JSON_KEYS.DATA) ||
            !dataSrc.hasOwnProperty(SelectorData._JSON_KEYS.CATEGORY_KEY)) {
            return false;
        }

        this.data = dataSrc[SelectorData._JSON_KEYS.DATA];
        this.configObj.categoryKey = dataSrc[SelectorData._JSON_KEYS.CATEGORY_KEY];

        let tmpLastSelectedIds = dataSrc[SelectorData._JSON_KEYS.LAST_SELECTED_IDS];
        tmpLastSelectedIds ? this.configObj.lastSelectedIds = tmpLastSelectedIds : false;

        return true;
    }


    /**
     *
     * @param dataSrc
     */
    reload(dataSrc) {

        // Control de versión de los datos con un timestamp?
    }


    /**
     * Returns the filtered item list (taking search term as filter seed)
     * @param searchTerm
     * @returns {[]}
     */
    filterItems(searchTerm) {

        let filtered = [];

        for (let item of this.data) {

            if (this.configObj.filter.apply(null, [searchTerm, item])) {
                filtered.push(item);
            }
        }

        return filtered;
    }


    /**
     * Returns an enumerated array containing the categories of data items
     * @returns {string[]}
     */
    getItemsGroups() {

        let groups = {};

        for (let item of this.data) {

            let group = item[this.configObj.categoryKey];
            groups[group] = 1;
        }

        return Object.keys(groups);
    }


    isValidData() {

        return this._isValidData;
    }
}
