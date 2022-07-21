function AjaxManager () {

	/**
	 * @type {number}
	 * @private
	 */
	this._requests_q = 0;
}

/**
 * @param {string} url
 * @param {{}|function} params Ajax settings object or callback
 * @param {function} callback
 */
AjaxManager.prototype.get = function (url, params, callback) {


	if (typeof (callback) == 'undefined' && typeof (params) == 'function') {
		callback = params;
		params = {};
	}

	this._request(url, 'get', params, callback);
};


/**
 * @param {string} url
 * @param {{}|function} params Ajax settings object or callback
 * @param {function} callback
 */
AjaxManager.prototype.post = function (url, params, callback) {

	if (typeof (callback) == 'undefined' && typeof (params) == 'function') {
		callback = params;
		params = {};
	}

	this._request(url, 'post', params, callback);
};


/**
 * @param {string} url
 * @param {string} method
 * @param {{}|function} params Ajax settings object or callback
 * @param {function} callback
 */
AjaxManager.prototype.request = function (url, method, params, callback) {

	if (typeof (callback) == 'undefined' && typeof (params) == 'function') {
		callback = params;
		params = {};
	}

	this._request(url, method, params, callback);
};


/**
 * @param {string} url
 * @param {string} method
 * @param {{}} params
 * @param {function} callback
 */
AjaxManager.prototype._request = function (url, method, params, callback) {

	var _this = this;
	var settings = {
		dataType: 'json'
	};

	if (params) {
		$.extend(true, settings, params);
	}

	if (typeof (method) != 'undefined') {
		settings.method = method || 'get';
	}

	settings.url = url;

	settings.success = function (data, textStatus, ob) {

		_this._on_success(data, textStatus, ob);

		if (callback) {
			callback(data, textStatus, ob);
		}
	};

	var _cached_error_callback = settings.error || false;

	settings.error = function (jqXHR, textStatus, errorThrown) {

		_this._on_error(jqXHR, textStatus, errorThrown);

		if (_cached_error_callback) {
			_cached_error_callback(jqXHR, textStatus, errorThrown);
		}
	};

	$.ajax(settings);
};


/**
 * @param data
 * @param textStatus
 * @param ob
 * @private
 */
AjaxManager.prototype._on_success = function (data, textStatus, ob) {

	this._requests_q++;
};


/**
 * @param jqXHR
 * @param textStatus
 * @param errorThrown
 * @private
 */
AjaxManager.prototype._on_error = function (jqXHR, textStatus, errorThrown) {


};