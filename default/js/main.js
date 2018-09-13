$(document).ready(function () {

    function sizeImg() {
        $('.slider-item-img-wrapper').each(function () {
            if ($(this).height() < $(this).find('.slider-item-img').height()) {
                $(this).find('.slider-item-img').height($(this).height())
            }
        })
    }

    sizeImg();

    $(window).resize(function () {
        sizeImg();
    });

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
            let btn = $('.main');
            let galleryZoom = $('.slider-zoom__container');
            let galleryZoomBtn = $('.slider-zoom-close');
            if (!popup.is(e.target) && popup.has(e.target).length === 0 &&
                !btn.is(e.target) && btn.has(e.target).length === 0 &&
                !galleryZoom.is(e.target) && galleryZoom.has(e.target).length === 0 &&
                !galleryZoomBtn.is(e.target) && galleryZoomBtn.has(e.target).length === 0) {
                $(popup).closest('.slider-overlay').removeClass('active');
                enableScroll();
                $('*').removeClass('active');
            }
        })
        .on('click', '.slider-gallery-item-prev', function () {
            $(this).closest('.slider-gallery-prev-wrapper').siblings('.slider-overlay').addClass('active');
            disableScroll();
        })
        .on('click', '.slider-item-img', function () {
            $(this).closest('.slider-gallery-wrapper').find('.slider-zoom__container').addClass('active');
        });

    $('.slider-gallery-wrapper').each(function () {
        let slide_length = $(this).find('.slider-overlay .slider__container .slider-list .slider-item').length;
        if (slide_length > 1) {

            let galleryZoom = new Swiper($(this).find('.slider-zoom__container'), {
                keyboardControl: true,
                zoom: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                nextButton: $(this).find('p.main.slider-btn.swiper-button-next'),
                prevButton: $(this).find('p.main.slider-btn.swiper-button-prev'),
            });

            let galleryTop = new Swiper($(this).find('.slider__container'), {
                spaceBetween: 10,
                pagination: $(this).find('.swiper-pagination'),
                paginationType: 'fraction',
                nextButton: $(this).find('.main.slider-btn.swiper-button-next'),
                prevButton: $(this).find('.main.slider-btn.swiper-button-prev'),
                onClick: function (swiper, event) {
                    let clicked = swiper.clickedIndex;
                    swiper.activeIndex = clicked;
                    swiper.updateClasses();
                    $(swiper.slides).removeClass('is-selected');
                    $(swiper.clickedSlide).addClass('is-selected');
                    galleryZoom.slideTo(clicked, 500, false);
                }
            });

            let galleryThumbs = new Swiper($(this).find('.slider-gallery'), {
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true,
                keyboardControl: true,
                loopAdditionalSlides: 1,
                nextButton: $(this).find('div.slider-btn.swiper-button-next'),
                prevButton: $(this).find('div.slider-btn.swiper-button-prev'),
            });

            galleryTop.params.control = galleryThumbs;
            galleryThumbs.params.control = galleryTop;

            galleryThumbs.controller.control = galleryZoom;
            galleryZoom.controller.control = galleryThumbs;

            let galleryThumbsPrev = new Swiper($(this).find('.slider-gallery-prev'), {
                centeredSlides: false,
                slidesPerView: 'auto',
                freeMode: true,
                touchRatio: 0.2,
                slideToClickedSlide: true,
                keyboardControl: true,
                nextButton: $(this).find('.slider-gallery-prev-next.swiper-button-next'),
                prevButton: $(this).find('.slider-gallery-prev-prev.swiper-button-prev'),
                pagination: $(this).find('.slider-gallery-prev-pagination.swiper-pagination'),
                paginationType: 'fraction',
                paginationClickable: true,
                onClick: function (swiper, event) {
                    let clicked = swiper.clickedIndex;
                    swiper.activeIndex = clicked;
                    swiper.updateClasses();
                    $(swiper.slides).removeClass('is-selected');
                    $(swiper.clickedSlide).addClass('is-selected');
                    galleryTop.slideTo(clicked, 500, false);
                }
            });

            galleryThumbsPrev.params.control = galleryThumbs;
            galleryThumbsPrev.params.control = galleryTop;
        }
        else {
            $('.slider__footer').remove();
            $(this).find('.slider-gallery-prev-next.swiper-button-next').remove();
            $(this).find('.slider-gallery-prev-prev.swiper-button-prev').remove();
            $(this).find('.slider-btn').remove();
        }
    });


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