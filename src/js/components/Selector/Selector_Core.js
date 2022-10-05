'use strict';


import {UI_Template_Handler} from "./UI_Template_Handler.js";
import {Utility} from "../../utils/Utility.js";


export class Selector_Core {


	static _for_test_with_jest () {

		return true;
	}


	static __id_counter = 0;


	static _tpl_pointers = {

		SELECTOR_BASE: 			"cmp-selector-base",
		SELECTOR_DROPDOWN: 		"cmp-selector-dropdown",
		SELECTOR_RESULT_ITEM: 	"cmp-selector-result-item",
		SELECTOR_RESULT_GROUP: 	"cmp-selector-result-group"
	};


	static _ux_pointers = {

		NATIVE_FIELD_CNT: 		".ux-selector-native-field-cnt",
		INPUT_FIELD: 			".ux-selector-input-field",
		DROPDOWN_CNT: 			".ux-selector-dropdown-cnt",
		DROPDOWN_TRIGGER: 		".ux-selector-dropdown-trigger",
		SEARCH_FIELD: 			".ux-selector-search-field",
		VIEW_MODE_CNT: 			".ux-selector-view-mode-cnt",
		VIEW_MODE_SIMPLE: 		".ux-selector-view-mode-simple",
		VIEW_MODE_GROUPED: 		".ux-selector-view-mode-grouped",
		VIEW_MODE_EXTENDED: 	".ux-selector-view-mode-extended",
		SELECTED_CNT: 			".ux-selector-selected-cnt",
		RESULTS_CNT: 			".ux-selector-results-cnt",
		RESULT_ITEM: 			".ux-selector-result-item",
		RESULT_GROUP: 			".ux-selector-result-group",
		RESULT_GROUP_CONTENT:   ".ux-selector-group-content"
	};


	static _ui_attributes = {

		ITEM_RECENT: 			"data-recent",
		ITEM_SELECTED: 			"data-selected"
	}


	static _ui_modifiers = {

		DROPDOWN_OPEN: 			"ui-selector-dropdown-open",
		BTN_ACTIVE:				"ui-active"
	};


	/**
	 * @param $elem
	 * @param config
	 */
	constructor($elem, config) {

		this._instance_id = "CmpSC_" + ++Selector_Core.__id_counter;

		this._config = {
			category_key: 		"",
			searchable_fields: 	[],
			last_selected_ids: 	[], // Todo: Debe venir en el json
			active: 			true,
			editable: 			true,
			placeholder: 		"Seleccionar...",
			searching_text: 	"Buscar...",
			search_no_results: 	"No se encontraron coincidencias para esta búsqueda",

			/**
			 * Returns coincidence validation looking for <term> in all value keys of <searchable_fields>
			 * @returns {boolean}
			 */
			filter: function (term, item, config) {

				for (let key of config.searchable_fields) {

					if (item[key].toString().toLowerCase().includes(term)) {
						return true;
					}
				}
			},
		};

		this._$dom_cnt = $elem.parent();
		this._$dom_field = $elem;

		this._elements = {
			dropdown_cnt: false,
			search_field: false,
			view_mode_cnt: false,
			selected_cnt: false,
			results_cnt: false,
		};

		this._data = [];

		this._dropdown_initialized = false;
		this._dropdown_opened = false;

		this._view_mode_groupable = false;
		this._view_mode_grouped = false;
		this._view_mode_extended = false;

		this._search_term = "";
		this._selected_ids = [];

		this.set_config(config);
	}


	init() {

		this._init();
	}


	/**
	 * @param config
	 */
	set_config(config) {

		$.extend(true, this._config, config);

		if (this._config.category_key) {
			this._view_mode_groupable = true;
		}
	}


	/**
	 * @param data
	 */
	set_data(data) {

		this._data = data;

		// Only for testing
		for (let item of this._data) {

			item.avatar_initials = Utility.take_name_initials( item.first_name + " " + item.last_name);
			item.activity_state = 3;
			item.user_color = 1;
		}

		// Only for testing
		for (let id of this._config.last_selected_ids) {

			this._data.find((item) => item["id"] === id)["item_recent"] = 1;
		}
	}


	/**
	 * Establishes new search term and throw filter method.
	 * @param text
	 */
	set_search_term(text) {

		this._set_search_term(text);

		this._render_refresh();
	}


	/**
	 * @param target_id
	 */
	set_selection(target_id) {

		this._set_selected_ids(typeof target_id != "object" ? [target_id] : target_id);
	}


	/**
	 * @param target_id
	 */
	select_items(target_id) {

		target_id = typeof target_id != "object" ? [target_id] : target_id;

		if (!this._selected_ids.length) {

			this._set_selected_ids(target_id);

		} else {

			this._selection_add(target_id);
		}
	}


	/**
	 * @param target_id
	 */
	unselect_items(target_id) {

		if (typeof target_id == "undefined") {

			this._selection_remove_all();

		} else {

			this._selection_remove(typeof target_id != "object" ? [target_id] : target_id);
		}
	}


	/**
	 *
	 */
	unselect_all() {

		this._selection_remove_all();
	}


	/**
	 *
	 */
	open() {

		this._dropdown_open();
	}


	/**
	 *
	 */
	close() {

		this._dropdown_close()
	}


	/**
	 *
	 */
	activate() {

		this._config.active = true;
	}


	/**
	 *
	 */
	deactivate() {

		this._config.active = false;
	}


	/**
	 * @returns {string}
	 */
	get id() {

		return this._instance_id;
	}


	/**
	 * @returns {number}
	 * @private
	 */
	_init() {

		this._render_init();
	}


	/**
	 * @private
	 */
	_render_init() {

		let _$tmpTplBase = UI_Template_Handler.$get(Selector_Core._tpl_pointers.SELECTOR_BASE, {
			input_placeholder: this._config.placeholder
		});

		_$tmpTplBase.find(Selector_Core._ux_pointers.NATIVE_FIELD_CNT).html(this._$dom_cnt.html());
		this._$dom_cnt.html('').append(_$tmpTplBase);

		this._set_events();

		this._render_refresh();
	}


	/**
	 * @private
	 */
	_render_ensure_dropdown_init() {

		if (this._dropdown_initialized) {
			return;
		}

		this._elements.dropdown_cnt = this._$dom_cnt.find(Selector_Core._ux_pointers.DROPDOWN_CNT);

		this._elements.dropdown_cnt.html(UI_Template_Handler.$get(Selector_Core._tpl_pointers.SELECTOR_DROPDOWN, {
			search_placeholder: this._config.searching_text,
			list_groupable: this._view_mode_groupable ? 1 : 0
		}));

		this._elements.search_field = this._elements.dropdown_cnt.find(Selector_Core._ux_pointers.SEARCH_FIELD);
		this._elements.view_mode_cnt = this._elements.dropdown_cnt.find(Selector_Core._ux_pointers.VIEW_MODE_CNT);
		this._elements.results_cnt = this._elements.dropdown_cnt.find(Selector_Core._ux_pointers.RESULTS_CNT);

		this._dropdown_initialized = true;
	}


	/**
	 * @private
	 */
	_render_results_simple() {

		let $results = $("<div/>");

		for (let item in this._data) {

			if (!this._search_term || this._config.filter.apply(this, [this._search_term, this._data[item], this._config,])) {

				$results.append(UI_Template_Handler.$get(Selector_Core._tpl_pointers.SELECTOR_RESULT_ITEM, this._data[item]));
			}
		}

		this._elements.results_cnt.html($results.html());
	}


	/**
	 *
	 * @private
	 */
	_render_results_grouped() {

		let $results = $("<div>");
		let groups = {};

		for (let item in this._data) {

			if (!this._search_term || this._config.filter.apply(this, [this._search_term, this._data[item], this._config,])) {

				let $tmpItem = UI_Template_Handler.$get(Selector_Core._tpl_pointers.SELECTOR_RESULT_ITEM, this._data[item]);
				let tmpCategory = this._data[item][this._config.category_key];

				if (!groups[tmpCategory]) {

					groups[tmpCategory] = UI_Template_Handler.$get(Selector_Core._tpl_pointers.SELECTOR_RESULT_GROUP, {
						group_color: '',
						group_initials: '',
						group_name: this._data[item][this._config.category_key]
					});
				}

				$tmpItem.appendTo($(groups[tmpCategory]).find(Selector_Core._ux_pointers.RESULT_GROUP_CONTENT));
			}
		}

		$.each(groups, (k,v) => {

			this._elements.results_cnt.append(v);
		});

		// this._elements.results_cnt.html($.each(groups).html());
	}


	/**
	 * @private
	 */
	_render_refresh() {

		if (!this._dropdown_opened) {
			return;
		}

		this._view_mode_grouped ? this._render_results_grouped() : this._render_results_simple();
	}


	/**
	 * @private
	 */
	_set_events() {

		$(Selector_Core._ux_pointers.INPUT_FIELD + ", " + Selector_Core._ux_pointers.DROPDOWN_TRIGGER).on("click", (e) => {

			this._on_input_field_click(e);
		});

		this._$dom_cnt.on("keyup", Selector_Core._ux_pointers.SEARCH_FIELD, (e) => {

			this._on_search_field_keyup(e);
		});

		this._$dom_cnt.on("click", Selector_Core._ux_pointers.DROPDOWN_CNT, (e) => {

			if (e.target.closest(Selector_Core._ux_pointers.RESULTS_CNT)) {
				this._on_results_cnt_click(e.target);
				return false;
			}
		});

		this._$dom_cnt.on("click", Selector_Core._ux_pointers.VIEW_MODE_CNT, (e) => {

			if (e.target.closest(Selector_Core._ux_pointers.VIEW_MODE_SIMPLE)) {

				this._on_view_mode_unitary_click();
			}

			if (e.target.closest(Selector_Core._ux_pointers.VIEW_MODE_GROUPED)) {

				this._on_view_mode_grouped_click();
			}

			if (e.target.closest(Selector_Core._ux_pointers.VIEW_MODE_EXTENDED)) {

				this._on_view_mode_extended_click();
			}
		});

		$("body").on("click", (e) => {

			this._on_body_click(e);
		});
	}


	/**
	 * @param e
	 * @private
	 */
	_on_input_field_click(e) {

		if (!this._dropdown_opened && this._config.active) {

			this._dropdown_open();

		} else {

			this._dropdown_close();
		}
	}


	/**
	 * @param e
	 * @private
	 */
	_on_search_field_keyup(e) {

		this.set_search_term(this._$dom_cnt.find(Selector_Core._ux_pointers.SEARCH_FIELD).val());

		this._render_refresh();
	}


	/**
	 * @private
	 */
	_on_view_mode_unitary_click() {

		if (!this._view_mode_grouped) {
			return;
		}

		this._view_mode_grouped = false;
		this._render_refresh();
	}


	/**
	 * @private
	 */
	_on_view_mode_grouped_click() {

		if (this._view_mode_grouped) {
			return;
		}

		this._view_mode_grouped = true;
		this._render_refresh();
	}


	/**
	 * @private
	 */
	_on_view_mode_extended_click() {

		this._view_mode_extended = !this._view_mode_extended;

		$(Selector_Core._ux_pointers.RESULTS_CNT).attr('data-user-card-type', this._view_mode_extended ? 'md' : 'sm');
		$(Selector_Core._ux_pointers.VIEW_MODE_EXTENDED).toggleClass(Selector_Core._ui_modifiers.BTN_ACTIVE);
	}


	/**
	 * @private
	 * @param item
	 */
	_on_results_cnt_click(item) {

		let _tmpItem = item.closest(Selector_Core._ux_pointers.RESULT_ITEM);

		let _selected_state = parseInt($(_tmpItem).attr(Selector_Core._ui_attributes.ITEM_SELECTED)) ? 0 : 1;

		let _tmpState = $(_tmpItem).attr(Selector_Core._ui_attributes.ITEM_SELECTED, _selected_state);

		let item_id = $(_tmpItem).attr('data-id');

		if (_selected_state) {
			this._selection_add(item_id);
		} else {
			this._selection_remove(item_id);
		}
	}


	/**
	 * @param e
	 * @private
	 */
	_on_body_click(e) {

		if (this._dropdown_opened) {

			if (e.target !== this._$dom_cnt[0] &&	!$.contains(this._$dom_cnt[0], e.target)) {
				this._dropdown_close();
			}
		}
	}


	/**
	 *
	 * @param text
	 * @private
	 */
	_set_search_term(text) {

		this._search_term = String(text).toLowerCase();
	}


	/**
	 *
	 * @param ids
	 * @private
	 */
	_set_selected_ids(ids) {

		this._selected_ids = [...ids];

		this._refresh_native_field();
		this._refresh_selections_badge();
	}


	/**
	 *
	 * @private
	 */
	_refresh_selections_badge () {

		this._$dom_cnt.find('.ux-global-selections:first').text(this._selected_ids.length);
	}


	/**
	 *
	 * @param target_id
	 * @private
	 */
	_selection_add(target_id) {

		const ids = typeof target_id == "object" ? target_id : [target_id];

		let new_selection = [...this._selected_ids];

		for (const id of ids) {

			if (!new_selection.includes(id)) {
				new_selection.push(id);
			}
		}

		this._set_selected_ids(new_selection);
	}


	/**
	 *
	 * @param target_id
	 * @private
	 */
	_selection_remove(target_id) {

		const ids = typeof target_id == "object" ? target_id : [target_id];
		let k;

		let new_selection = [];

		for (const id of this._selected_ids) {

			if (ids.indexOf(id) === -1) {
				new_selection.push(id);
			}
		}

		this._set_selected_ids(new_selection);
	}


	/**
	 *
	 * @private
	 */
	_selection_remove_all() {

		this._set_selected_ids([]);
	}


	/**
	 *
	 * @private
	 */
	_refresh_native_field() {

		console.log(this._$dom_field.val());
		this._$dom_field.val(this._selected_ids);
	}


	/**
	 * @private
	 */
	_dropdown_open() {

		this._render_ensure_dropdown_init();

		this._$dom_cnt.find(Selector_Core._ux_pointers.DROPDOWN_CNT).addClass(Selector_Core._ui_modifiers.DROPDOWN_OPEN);
		this._dropdown_opened = true;


		this._render_refresh();
		this._elements.search_field.focus();
	}


	/**
	 * @private
	 */
	_dropdown_close() {

		this._$dom_cnt.find(Selector_Core._ux_pointers.DROPDOWN_CNT).removeClass(Selector_Core._ui_modifiers.DROPDOWN_OPEN);
		this._dropdown_opened = false;

		this._elements.results_cnt.empty();
	}
}