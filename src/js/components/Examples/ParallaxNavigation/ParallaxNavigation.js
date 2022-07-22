export function ParallaxNavigation () {

    this._selectors = {
		observable_items: '.ux-parallax-observe'
	};

	this._bindings = {
		window_offset_y: 0,
		viewport_height: 0
	};
}

ParallaxNavigation.prototype.init = function () {

    this._init();
};

ParallaxNavigation.prototype._init = function () {

    let _this = this;

    $(window).scroll(function () {
        _this._on_scroll();
    });
};

ParallaxNavigation.prototype._on_scroll = function () {

    this._update();
};

ParallaxNavigation.prototype._update = function () {

	let _this = this;

	this._calculate_bindings();

	$(this._selectors.observable_items).each(function () {
		_this.update_item(this);
	});
};

ParallaxNavigation.prototype.update_item = function (item) {

	let $item = $(item);

	let item_parallax_offset = $item.attr('data-parallax-offset-prct');

	if (!item_parallax_offset) {
		return;
	}

	if (!this._item_is_in_bounds(item)) {
		//return false;
	}

	let item_scroll_top = this._get_item_offsetTop(item);
	let item_height = $(item).outerHeight();
	let item_bottom_scroll_top = item_scroll_top + item_height;

	item_parallax_offset = parseInt(item_parallax_offset) / 100 * this._bindings.viewport_height;

	let startPoint = item_scroll_top - this._bindings.viewport_height;
	let endPoint = item_bottom_scroll_top;
	let range = endPoint - startPoint;

	let viewport_in_range = this._bindings.window_offset_y - startPoint;
	let factor = viewport_in_range / range;

	let $inner = $item.find('.inner:first');

	if (factor < 0) {
		$inner.css({
			top: 0
		});
		return;
	}

	if (factor > 1) {
		factor = 1;
	}

	$inner.css({
		top: (item_parallax_offset * factor) + 'px'
	});

	$inner.find('img:first').css({
		width: (100 + factor * parseInt($item.attr('data-parallax-zoom-x'))) + '%',
		height: (100 + factor * parseInt($item.attr('data-parallax-zoom-y'))) + '%'
	})

	// console.log(range, factor, item_bottom_scroll_top);
};

ParallaxNavigation.prototype._item_is_in_bounds = function (item) {

	let item_scroll_top = this._get_item_offsetTop(item);
	let item_bottom_scroll_top = item_scroll_top + $(item).outerHeight();

	if (this._bindings.window_offset_y <= item_scroll_top) {

		if (this._bindings.window_offset_y < item_bottom_scroll_top) {

			return true;
		}
	}

	return false;
};

ParallaxNavigation.prototype._get_item_offsetTop = function (item) {

	return $(item).offset().top;
};

ParallaxNavigation.prototype._calculate_bindings = function () {

	let _w = $(window);

	this._bindings.window_offset_y = parseInt(_w.scrollTop());
	this._bindings.viewport_height = parseInt(_w.outerHeight());
};
