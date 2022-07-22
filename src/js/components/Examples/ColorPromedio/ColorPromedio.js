let f_colorPromedio = function () {

    let colorThief = new ColorThief();
    let c_sourceImage = $('[id^="promedio-"]');

    c_sourceImage.each(function () {

        let target = this;
        let target_id = target.getAttribute('data-img-id');

        (function (sourceImage, img_id) {
            let _f_apply = function (_sourceImage, _img_id) {
                let colorPromedio;
                let colorSelec = 5;

                colorPromedio = colorThief.getPalette(_sourceImage);
                $('.slogan-container[data-img-id="' + _img_id + '"]').css('background-color', 'rgba(' + colorPromedio[colorSelec][0] + ',' + colorPromedio[colorSelec][1] + ',' + colorPromedio[colorSelec][2] + ', .35)');
            };

            if (sourceImage.complete) {
                _f_apply(sourceImage, img_id);
            } else {
                sourceImage.addEventListener('load', function () {
                    _f_apply(sourceImage, img_id);
                });
            }
        })(target, target_id);
    })
}
f_colorPromedio();