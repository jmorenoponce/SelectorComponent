function Ajax () {
}

/**
 * @type {?AjaxManager}
 * @private
 */
Ajax._manager = null;


/**
 * @returns {AjaxManager}
 * @private
 */
Ajax._initialize = function () {

    Ajax._manager = new AjaxManager();

    return Ajax._manager;
};


/**
 * @param {string} url
 * @param {{}} params
 * @param {function} callback
 */
Ajax.get = function (url, params, callback) {

    //if (!Ajax._manager) {
    //    Ajax._initialize()
    //}

    //Ajax._manager.get(url, params, callback);

    (Ajax._manager || Ajax._initialize()).get(url, params, callback);
};


/**
 * @param {string} url
 * @param {{}} params
 * @param {function} callback
 */
Ajax.post = function (url, params, callback) {

    //if (!Ajax._manager) {
    //    Ajax._initialize()
    //}

    //Ajax._manager.post(url, params, callback);

    (Ajax._manager || Ajax._initialize()).post(url, params, callback);
};