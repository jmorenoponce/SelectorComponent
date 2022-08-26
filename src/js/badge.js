$(function () {

    $('body').on('click', '.ux-popover-trigger', function (e) {
        e.stopImmediatePropagation();
        UI_Popover.trigger_click(this, e);
    });

    $('body').on('click', function (e) {
        UI_Popover.on_body_click(e);
    });

});


function UI_Popover(id, trigger) {

    this._id = id;
    UI_Popover._instances[this._id] = this;

    this._trigger = trigger;
    this._$popover = $(trigger).find('.ux-popover:first');
    this._is_shown = this._$popover.attr('data-shown') === '1';
    this._trigger.setAttribute('data-popover-id', id);
}


UI_Popover.on_body_click = function (e) {

    // Outer popover clicks will trigger the popover close
    let $target = $(e.target);

    if (e.target.classList.contains('.ux-popover') || $target.closest('.ux-popover').length) {
        // Prevent .ux-popover  clicks to hide the popover element
        return;
    }

    this.closeAll();
};


UI_Popover.closeAll = function () {

    for (let instance of UI_Popover._instances) {
        instance.close();
    }
};


UI_Popover._instances = [];

UI_Popover.getInstanceById = function (id) {

    return UI_Popover._instances[id] || false;
};


UI_Popover.getTriggerInstance = function (trigger) {

    let ins;
    let id = trigger.getAttribute('data-popover-id');

    if (!id) {
        ins = new UI_Popover(UI_Popover._instances.length, trigger);
    } else {
        ins = UI_Popover.getInstanceById(parseInt(id));
    }

    return ins;
};


UI_Popover.trigger_click = function (trigger, e) {

    let popover = UI_Popover.getTriggerInstance(trigger);

    popover.trigger_click(e);
}


UI_Popover.prototype.close = function () {

    this._hide();
}


UI_Popover.prototype.trigger_click = function (e) {

    let $target = $(e.target);

    if (e.target.classList.contains('.ux-popover') || $target.closest('.ux-popover').length) {
        // Prevent .ux-popover  clicks to hide the popover element
        return;
    }

    if (this.isShown()) {

        this._hide();

    } else {

        this._show();
    }
};


UI_Popover.prototype.isShown = function () {

    return this._is_shown;
};


UI_Popover.prototype.getId = function () {

    return this.id;
};


UI_Popover.prototype._show = function () {

    this._is_shown = true;
    this._$popover.attr('data-shown', 1);
};


UI_Popover.prototype._hide = function () {

    this._is_shown = false;
    this._$popover.attr('data-shown', 0);
};