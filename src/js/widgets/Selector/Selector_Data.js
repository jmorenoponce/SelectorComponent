'use strict';


export class Selector_Data {


    static _JSON_KEYS = {

        TIMESTAMP: 'timestamp',
        NAME: 'dataSource',
        NOTES: 'notes',
        CATEGORY_KEY: 'categoryKey',
        LAST_SELECTED_IDS: 'lastItemsSelected',
        DATA: 'data'
    }


    constructor() {

        this.data = {};

        this.config_obj = {
            searchable_fields: [],
            categoryKey: '',
            selected_ids: [],

            /**
             * Returns coincidence validation looking for <term> in all value keys of <item>.
             * @param term
             * @param item
             * @returns {boolean}
             */
            filter: function (term, item) {
                return item.first_name.toString().toLowerCase().includes((term)) ||
                    item.last_name.toString().toLowerCase().includes((term)) ||
                    item.department.toString().toLowerCase().includes((term));
            }
        };
    }


    /**
     * Take de values from json data filling owner configuration keys.
     *  <data> and <category_key> are required keys for valid <dataSrc>.
     * @param dataSrc
     * @returns {boolean}
     */
    set_data(dataSrc) {

        // Todo: Si no existe categoryKey no podemos hacer búsqueda agrupada.
        if (!dataSrc.hasOwnProperty(Selector_Data._JSON_KEYS.DATA)
            || !dataSrc.hasOwnProperty(Selector_Data._JSON_KEYS.CATEGORY_KEY)) {
            return false;
        }

        this.data = dataSrc[Selector_Data._JSON_KEYS.DATA];
        this.config_obj.categoryKey = dataSrc[Selector_Data._JSON_KEYS.CATEGORY_KEY];
        this.config_obj.lastSelectedIds = dataSrc[Selector_Data._JSON_KEYS.LAST_SELECTED_IDS] || null;

        return true;
    }


    /**
     *
     * @param dataSrc
     */
    refresh(dataSrc) {

        // Control de versión de los datos con un timestamp?
    }


    /**
     * @param targetId
     * @returns {*}
     */
    getById(targetId) {

        return this.data.find(item => item.id === targetId);
    }


    /**
     * Returns the filtered item list (taking search term as filter seed).
     * @param searchTerm
     * @returns {[]}
     */
    filterItems(searchTerm) {

        let filtered = [];

        for (let item of this.data) {

            if (this.config_obj.filter.apply(null, [searchTerm, item])) {
                filtered.push(item);
            }
        }

        return filtered;
    }


    /**
     * Returns an enumerated array containing the categories of data items.
     * @returns {string[]}
     */
    getItemsGroups() {

        let groups = {};

        for (let item of this.data) {

            let group = item[this.config_obj.categoryKey];
            groups[group] = 1;
        }

        return Object.keys(groups);
    }

}
