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
        })
        .on('click', '.slider-gallery-item-prev', function () {
            $(this).closest('.slider-gallery-prev-wrapper').siblings('.slider-overlay').addClass('active');
            disableScroll();
        });


    $('.slider-gallery-wrapper').each(function () {
        let slide_length = $(this).find('.slider-overlay .slider__container .slider-list .slider-item').length;
        console.log(slide_length);
        if (slide_length > 1 && $(window).width() > 767) {
            let galleryTop = new Swiper($(this).find('.slider__container'), {
                spaceBetween: 10,
                pagination: $(this).find('.swiper-pagination'),
                paginationType: 'fraction',
                //loop: true,
                //loopedSlides: $('.slider__container .swiper-wrapper .swiper-slide').length,
            });

            let galleryThumbs = new Swiper($(this).find('.slider-gallery'), {
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                initialSlide: 3,
                touchRatio: 0.2,
                slideToClickedSlide: true,
                keyboardControl: true,
                loopAdditionalSlides: 1,
                nextButton: $(this).find('.slider-btn.swiper-button-next'),
                prevButton: $(this).find('.slider-btn.swiper-button-prev'),
                //loop: true,
                //loopedSlides: $('.slider__container .swiper-wrapper .swiper-slide').length,
            });

            galleryTop.params.control = galleryThumbs;
            galleryThumbs.params.control = galleryTop;


            let galleryThumbsPrev = new Swiper($(this).find('.slider-gallery-prev'), {
                centeredSlides: true,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                initialSlide: 3,
                slideToClickedSlide: true,
                keyboardControl: true,
                loopAdditionalSlides: 1,
                nextButton: $(this).find('.slider-gallery-prev-next.swiper-button-next'),
                prevButton: $(this).find('.slider-gallery-prev-prev.swiper-button-prev'),
                pagination: $(this).find('.slider-gallery-prev-pagination.swiper-pagination'),
                paginationClickable: true,
                //loop: true,
                //loopedSlides: $('.slider__container .swiper-wrapper .swiper-slide').length,
            });

            galleryThumbsPrev.params.control = galleryThumbs;
            galleryThumbsPrev.params.control = galleryTop;

        }
        else if (slide_length > 1 && $(window).width() < 768) {
            let galleryTop = new Swiper($(this).find('.slider__container'), {
                spaceBetween: 10,
                pagination: $(this).find('.slider-pagination.swiper-pagination'),
                paginationType: 'fraction',
                //loop: true,
                //loopedSlides: $('.slider__container .swiper-wrapper .swiper-slide').length,
            });

            let galleryThumbs = new Swiper($(this).find('.slider-gallery'), {
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                initialSlide: 3,
                touchRatio: 0.2,
                slideToClickedSlide: true,
                keyboardControl: true,
                loopAdditionalSlides: 1,
                nextButton: $(this).find('.slider-btn.swiper-button-next'),
                prevButton: $(this).find('.slider-btn.swiper-button-prev'),
                //loop: true,
                //loopedSlides: $('.slider__container .swiper-wrapper .swiper-slide').length,
            });

            galleryTop.params.control = galleryThumbs;
            galleryThumbs.params.control = galleryTop;


            let galleryThumbsPrev = new Swiper($(this).find('.slider-gallery-prev'), {
                centeredSlides: true,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                initialSlide: 0,
                slideToClickedSlide: true,
                keyboardControl: true,
                loopAdditionalSlides: 1,
                pagination: $(this).find('.slider-gallery-prev-pagination.swiper-pagination'),
                paginationClickable: true,
                //loop: true,
                //loopedSlides: $('.slider__container .swiper-wrapper .swiper-slide').length,
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