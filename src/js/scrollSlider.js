"use strict"

// export const handleSliderScroll = function() {
//     const buttonNext = document.querySelector('.main-button--next');
//     const buttonPrev = document.querySelector('.main-button--previous');
//     const cards = document.querySelectorAll('.slider__card');
//     const cardWidth = cards[0].offsetWidth;
//     const sliderContainer = document.querySelector('.slider__slide-container');
//     if (this.classList.contains('main-button--next')) {
//         buttonPrev.disabled = false;
//         sliderContainer.scrollLeft = cardWidth;
//         sliderContainer.scrollLeft >= sliderContainer.scrollWidth - sliderContainer.clientWidth 
//         ? buttonNext.disabled = true 
//         : buttonNext.disabled = false;
//     } else {
//         buttonNext.disabled = false;
//         sliderContainer.scrollLeft -=cardWidth;
//         sliderContainer.scrollLeft >= sliderContainer.scrollWidth - sliderContainer.clientWidth 
//         ? buttonPrev.disabled = true 
//         : buttonPrev.disabled = false;
//     }

// }


export const handleSliderScroll = function() {
    const buttonNext = document.querySelector('.main-button--next');
    const buttonPrev = document.querySelector('.main-button--previous');
    const cards = document.querySelectorAll('.slider__card');
    const sliderContainer = document.querySelector('.slider__slide-container');
    const cardWidth = cards[0].offsetWidth;
    const scrollPosition = sliderContainer.scrollLeft; // Get current scroll position
    if (this.classList.contains('main-button--next')) {
        buttonPrev.disabled = false;
        sliderContainer.scrollLeft = scrollPosition + cardWidth; // Calculate new scroll position
        sliderContainer.scrollLeft >= sliderContainer.scrollWidth - sliderContainer.clientWidth 
        ? buttonNext.disabled = true 
        : buttonNext.disabled = false;
    } else {
        buttonNext.disabled = false;
        sliderContainer.scrollLeft = scrollPosition - cardWidth; // Calculate new scroll position
        sliderContainer.scrollLeft <= 0 
        ? buttonPrev.disabled = true 
        : buttonPrev.disabled = false;
    }
}