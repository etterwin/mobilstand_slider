$(document).ready(function () {

    let reviewSlider = new Swiper('.review__container', {
        slidesPerView: 1,
        nextButton: '.review-btn.next',
        prevButton: '.review-btn.prev',
        pagination: '.review-pagination',
        paginationType: 'fraction',
    });

    let reviewSliderBlack = new Swiper('.review__subcontainer', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: '.review-subitem-pagination',
        paginationType: 'fraction',
        nextButton: '.main.swiper-button-next',
        prevButton: '.main.swiper-button-prev',
    });

    $(document).on('click', '.review-item', function () {
        $('.review-overlay').addClass('active');
        reviewSliderBlack.slideTo($(this).index(), 0, false);
    })
        .on('click', '.review-close', function () {
            $('.review-overlay').removeClass('active');
        });

});