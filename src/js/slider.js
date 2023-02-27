// "use strict"
// // let currentSlide = 1;
// export let slides, slidesNumber;
// // const slidesNumber = slides.length;
// export const slider = document.querySelector('.review__list');
// export const dotContainer = document.querySelector('.dots');


// export const activateCurrentDots = function (slide){
//     // Activate a dot button
//     document.querySelectorAll('.dots__dot').forEach(el => el.classList.remove('dots__dot--active'));
//     document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
// }
// export const moveToSlide = function(slide) {
//     // moving to current slide
//     slides.forEach((s, i)=> {
//       s.style.transform = `translateX(${(i - slide) * 100}%)`;
//     });
//   };

//   export const sliderSetInterval = function() {
//     // Change slide on timer
//     let currentSlide = 1;
//     const interval = 8000;
//     const intervalId = setInterval(()=> {
//         moveToSlide(currentSlide);
//         activateCurrentDots(currentSlide);
//         currentSlide++;
//         if (currentSlide > slidesNumber - 1) currentSlide = 0; 
//       }, interval);
//       slider.addEventListener('click', function(){
//         // Stop the moving slide on  click
//         clearInterval(intervalId);
//       });
//       dotContainer.addEventListener('click', function(){
//         // Stop the moving slide on  click
//         clearInterval(intervalId);
//       });
// }