$(document).ready(function () {

    let productSlider = new Swiper('.product-slider__container', {
        slidesPerView: 1,
        loop: true,
        grabCursor: true,
        keyboardControl: true,
        nextButton: '.product-slider-arrow.next',
        prevButton: '.product-slider-arrow.prev',
        pagination: '.product-slider-pagination',
        paginationClickable: true,
        autoplay: true,
        speed: 1000,
        autoplayDisableOnInteraction: false,
    });

});