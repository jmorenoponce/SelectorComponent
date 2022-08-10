'use strict';


export class Selector {

	static _id_counter = 1;
	static MODE_GROUP_GROUPED = 1;
	static MODE_GROUP_UNGROUPED = 2;

	constructor() {

		// Programaticaly...

		this._id = ++Selector._id_counter;

		this._data = {};
		this._config = {
			categoryKey: 'department',
			dataProvider: function () {},
			filter: function (term, item) {
				return item.name.toLowerCase().includes(term);
			}
		};

		this._selectedIds = [];

		this._mode_group = Selector.MODE_GROUP_UNGROUPED;
		this._attr_extended_view = false;

		this._searchTerm = '';
	}


	/**
	 * Returns the filtered item list (taking search term as filter seed)
	 * @return {}
	 */
	_filterItems () {

		let filtered = [];

		for (let item of this._data) {

			if (this._config.filter.apply(null, [this._searchTerm, item])) {
				filtered.push(item);
			}
		}

		return filtered;
	}


	/**
	 * Returns an enumerated array containing the categories of data items
	 * @private
	 */
	_getItemsGroups (data) {

		let groups = {};

		for (let item of data) {

			let group = item[this._config.categoryKey];
			groups[group] = 1;
		}

		return Object.keys(groups);
	}


	get id () {

		return this._id;
	}


	setSearchTerm (text) {

		this._setSearchTerm(text);

		this.update();
	}


	_setSearchTerm (term) {

		this._searchTerm = (String(text)).toLowerCase();

		// TODO Replace accents
	}


	update () {

	}


	refresh () {

	}


	open () {

	}

	close () {

	}


	loadData () {

	}


	reloadData () {

	}


	setData () {

	}


	/**
	 * Render main component
	 */
	render () {

	}


	renderList_ungrouped () {

	}


	renderList_grouped () {

	}


	setSelection (targetId) {

		this._selectedIds = [...(typeof (targetId) == 'object' ? targetId : [targetId])];
	}


	selectItem (targetId) {

		const ids = typeof (targetId) == 'object' ? targetId : [targetId];
		let k;

		for (id of ids) {

			if (!this._selectedIds.contains(id)) {

				this._selectedIds.push(id);
			}
		}

		this._refreshSelection();
	}


	unselectItem (targetId) {

		const ids = typeof (targetId) == 'object' ? targetId : [targetId];
		let k;

		for (id of ids) {

			if ((k = this._selectedIds.indexOf(id)) !== -1) {
				this._selectedIds.splice(k, 1);
			}
		}

		this._refreshSelection();
	}

	unselectAll () {

		this._selectedIds = [];

		this._refreshSelection();
	}


	_refreshSelection () {

		this._updateNativeValue();
	}


	/**
	 * Updates native select value
	 */
	_updateNativeValue () {

		let _opts = '';

		let _prev_value = this.$select.html();

		for (id of this._selectedIds) {
			_opts += '<option value="' + id + '" selected="selected"></option>';
		}

		this.$select.html(_opts);

		// Fire native select on change event
		if (_opts != _prev_value) {
			this.$select.trigger('change');
		}
	}
}