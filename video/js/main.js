$(document).ready(function () {

    let videoSlider = new Swiper('.video__container', {
        slidesPerView: 1,
        nextButton: '.video-btn.next',
        prevButton: '.video-btn.prev',
        pagination: '.video-pagination',
        paginationType: 'fraction',
    })

});