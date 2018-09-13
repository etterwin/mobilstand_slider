$(document).ready(function () {

    let certificateSlider = new Swiper('.certificate__container', {
        slidesPerView: 'auto',
        keyboardControl: true,
        nextButton: '.certificate-btn.swiper-button-next',
        prevButton: '.certificate-btn.swiper-button-prev',
        pagination: '.certificate-pagination',
        paginationType: 'fraction',
        breakpoints: {
            767: {
                slidesPerView: 2,
            }
        }
    });

    let certificateSliderBlack = new Swiper('.certificate__subcontainer', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: '.certificate-subitem-pagination',
        paginationType: 'fraction',
        nextButton: '.main.swiper-button-next',
        prevButton: '.main.swiper-button-prev',
    });

    $(document).on('click', '.certificate-item', function () {
        $('.certificate-overlay').addClass('active');
        certificateSliderBlack.slideTo($(this).index(), 0, false);
    })
        .on('click', '.certificate-close', function () {
            $('.certificate-overlay').removeClass('active');
        });

});