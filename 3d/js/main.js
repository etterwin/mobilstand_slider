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
        })
        .on('click', '.open-container', function () {
            $('[data-container = ' + $(this).data('containerid') + ']').addClass('active');
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
                $('*').removeClass('active');
            }
        })
        .on('click', '.demo li', function () {
            $(this).closest('.demo').siblings('.slider-overlay').addClass('active');
            galleryZoom.slideTo($(this).index(), 500, false);
            galleryTop.slideTo($(this).index(), 500, false);
        })
        .on('click', '.slider-item-img', function () {
            $(this).closest('.slider-gallery-wrapper').find('.slider-zoom__container').addClass('active');
        });


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

});