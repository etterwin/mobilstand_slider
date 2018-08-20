$(document).ready(function () {

    $(document)
        .on('click', '.close-container', function () {
            $('[data-container = ' + $(this).data('containerid') + ']').removeClass('active');
            enableScroll();
        })
        .on('click', '.open-container', function () {
            $('[data-container = ' + $(this).data('containerid') + ']').addClass('active');
            disableScroll();
        })
        .mouseup(function (e) {
            let popup = $('.slider-wrapper');
            if (!popup.is(e.target) && popup.has(e.target).length === 0) {
                $(popup).closest('.slider-overlay').removeClass('active');
                enableScroll();
            }
        });


    let slide_lenght = document.querySelectorAll('.slider-item').length;
    if (slide_lenght > 1) {
        $('.slider-overlay').each(function () {
            let galleryTop = new Swiper( $(this).find('.slider__container'), {
                spaceBetween: 10,
                pagination: $(this).find('.swiper-pagination'),
                paginationType: 'fraction',
            });

            let galleryThumbs = new Swiper($(this).find('.slider-gallery'), {
                spaceBetween: 10,
                centeredSlides: '3',
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true,
                keyboardControl: true,
                loopAdditionalSlides: 1,
                nextButton: $(this).find('.slider-btn.swiper-button-next'),
                prevButton: $(this).find('.slider-btn.swiper-button-prev'),
            });

            galleryTop.params.control = galleryThumbs;
            galleryThumbs.params.control = galleryTop;
        });
    }
    else {
        $('.slider__footer').remove();
    }

    // Запрет на скролл окна
    let keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    // Отключить скролл
    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    // Включить скролл
    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

});