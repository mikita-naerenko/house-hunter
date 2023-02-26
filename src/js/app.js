"use strict"
import {renderReviewItem,
        renderArticles,
        renderProductCard,
        renderRoomTourSection} from './render.js';
import './nav.js';


const sallerRoomTour = document.querySelector('.saller--room-tour');

 
const getUserData = async function() {
    try {
     const result = await fetch ('https://63f1ec8af28929a9df501176.mockapi.io/user');   
     if (!result.ok) throw new Error(`Failed to fetch user data: ${e.message}`);
     const userData = await result.json();
     return  userData;
    } catch (e) {
        throw new Error(`Problem with getting data from server: ${e.message}`);
        
    }
}

const typeOfProductButtonHandler = function(productCardArr, e) {
    const target = e.target.getAttribute('id');
    const slideContainer = document.querySelector('.slider__slide-container');
    if (!target) return;
    while (slideContainer.firstChild)
    slideContainer.removeChild(slideContainer.firstChild);
    renderProductCard(productCardArr.filter(el => el.category.type === target));
};

const showPhotoOnClickHandler = function(e){
    const target = e.target.getAttribute('srcset');
    const modalPhoto = document.querySelector('.big-photo');
    const closeModalFunctionKeydown = function(e) {
        if (e.key === 'Escape') modalPhoto.classList.add('hidden');
        window.removeEventListener('keydown', closeModalFunctionKeydown);
    };
    const closeModalFunction = function(e) {
        modalPhoto.classList.add('hidden');
        document.querySelector('.big-photo__close').removeEventListener('click', closeModalFunction);
    };
    if (!target) return;
    modalPhoto.classList.remove('hidden');
    modalPhoto.querySelector('img').srcset = target;
    document.querySelector('.big-photo__close').addEventListener('click', closeModalFunction);
    window.addEventListener('keydown', closeModalFunctionKeydown);
    
};

 getUserData().then(data =>{
// Destructuring data from json
    const [{userData:  userArr},
            {productCard: productCardArr},
            {articles: articlesArr},
            {roomTour: roomTourArr},
            {review: reviewArr}] = data;


    const uniteArrays = function(arr1, arr2) {
            // Function add object saller or user using sallerID and authorID
        return arr1.forEach(el1 => {
                if (el1.date) el1.date = new Date(el1.date);
            arr2.map(el2 => {
                
                if (el2.id === el1.authorId) el1.author = el2;
                if (el2.id === el1.sallerId) el1.saller = el2;
            })
        })
    }  
    const sallerArr = userArr.filter(el => el.admin === true);
    // Unite array and object
    uniteArrays(productCardArr, sallerArr);
    uniteArrays(articlesArr, userArr);
    uniteArrays(roomTourArr, sallerArr);
    uniteArrays(reviewArr, userArr);
    // Call function to render elements 
    renderReviewItem(reviewArr);
    renderArticles(articlesArr);
    renderProductCard(productCardArr);
    renderRoomTourSection(roomTourArr);
    // Slider review
    
    slides = document.querySelectorAll('.review__element');
    slidesNumber = slides.length;
    activateCurrentDots(0);
    // Add event listener
    document.querySelector('.featured-house__input-list').addEventListener('click', typeOfProductButtonHandler.bind(null, productCardArr));
    document.querySelector('.show-photo').addEventListener('click', showPhotoOnClickHandler);

    
    dotContainer.addEventListener('click', function(e){
        if (e.target.classList.contains('dots__dot')){
          const slide = e.target.dataset.slide;
          moveToSlide(slide)
          activateCurrentDots(slide);
        }
      });

});

let currentSlide = 1;
let slides, slidesNumber;
// const slidesNumber = slides.length;
const slider = document.querySelector('.review__list');
const dotContainer = document.querySelector('.dots');

const activateCurrentDots = function (slide){
    // Activate a dot button
    document.querySelectorAll('.dots__dot').forEach(el => el.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}
const moveToSlide = function(slide) {
    // moving to current slide
    slides.forEach((s, i)=> {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };
const sliderSetInterval = function() {
    // Change slide on timer
    const interval = 8000;
    const intervalId = setInterval(()=> {
        moveToSlide(currentSlide);
        activateCurrentDots(currentSlide);
        currentSlide++;
        if (currentSlide > slidesNumber - 1) currentSlide = 0; 
      }, interval);
      slider.addEventListener('click', function(){
        // Stop the moving slide on  click
        clearInterval(intervalId);
      });
      dotContainer.addEventListener('click', function(){
        // Stop the moving slide on  click
        clearInterval(intervalId);
      });
}


// Start review slider
window.addEventListener("load", sliderSetInterval);






