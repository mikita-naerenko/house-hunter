"use strict"
import {renderReviewItem,
        renderArticles,
        renderProductCard,
        renderRoomTourSection} from './render.js';
import './nav.js';

import {handleSliderScroll} from './scrollSlider.js';




 
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

const closeModalHandler = function(closeElement, listenElement){
    closeElement.classList.add('hidden');
    listenElement.removeEventListener('click', closeModalHandler);
};

const showPhotoOnClickHandler = function(e){
    const target = e.target.getAttribute('srcset');
    const modalPhoto = document.querySelector('.modal');
    const closeModalFunctionKeydown = function(e) {
        if (e.key === 'Escape') modalPhoto.classList.add('hidden');
        window.removeEventListener('keydown', closeModalFunctionKeydown);
    };
    const closeModalFunction = function(e) {
        modalPhoto.classList.add('hidden');
        document.querySelector('.modal__close').removeEventListener('click', closeModalFunction);
    };



    modalPhoto.addEventListener('click', (e) => {
        if (e.target === modalPhoto) closeModalFunction();
    });
    if (!target) return;
    modalPhoto.classList.remove('hidden');
    modalPhoto.querySelector('img').srcset = target;
    document.querySelector('.modal__close').addEventListener('click', closeModalFunction);
    window.addEventListener('keydown', closeModalFunctionKeydown);
    
};

const addUserDataToObjects = function(arr1, arr2) {
    // Function add object saller or user using sallerID and authorID
return arr1.forEach(el1 => {
        if (el1.date) el1.date = new Date(el1.date);
    arr2.map(el2 => {
        
        if (el2.id === el1.authorId) el1.author = el2;
        if (el2.id === el1.sallerId) el1.saller = el2;
    })
})
};

const loadImages = function(entries, observer){
    entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.srcset = entry.target.dataset.srcset;
          entry.target.addEventListener('load', ()=>entry.target.classList.remove("lazy-img"));
          observer.unobserve(entry.target);
        }
      });
    };

    const appearanseSection = function(entries, observer) {
        const entry = entries[0];
       if(entry.isIntersecting) {
        entry.target.classList.remove('section--hidden');
        // Start review slider
        entry.target.querySelector("#review") ? sliderSetInterval() : null;
        observer.unobserve(entry.target); 
       }
    };

 getUserData().then(data =>{
// Destructuring data from json
    const [{userData:  userArr},
            {productCard: productCardArr},
            {articles: articlesArr},
            {roomTour: roomTourArr},
            {review: reviewArr}] = data;

    const sallerArr = userArr.filter(el => el.admin === true);
    // Unite array and object
    addUserDataToObjects(productCardArr, sallerArr);
    addUserDataToObjects(articlesArr, userArr);
    addUserDataToObjects(roomTourArr, sallerArr);
    addUserDataToObjects(reviewArr, userArr);
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

    document.querySelector('.main-button--next').addEventListener('click', handleSliderScroll);
    document.querySelector('.main-button--previous').addEventListener('click', handleSliderScroll);


    // Appearance parts of site
    const sections = document.querySelectorAll('#observer-true');
    const sectionsObserver = new IntersectionObserver(appearanseSection, {root: null, threshold: 0.3,});
    sections.forEach(section => {
    sectionsObserver.observe(section);
    section.classList.add('section--hidden');
    }); 


    // Lazy-load image
    const lazyImg = document.querySelectorAll('img[data-srcset]');
    lazyImg.forEach(el => el.classList.add('lazy-img'));
    const lazyImageObserver = new IntersectionObserver(loadImages, { root: null, threshold: 0.3});
    lazyImg.forEach(img => lazyImageObserver.observe(img));

});

let slides, slidesNumber;
const slider = document.querySelector('.review__list');
const dotContainer = document.querySelector('.dots');


const activateCurrentDots = function (slide){
    // Activate a dot button
    document.querySelectorAll('.dots__dot').forEach(el => el.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
const moveToSlide = function(slide) {
    // moving to current slide
    slides.forEach((s, i)=> {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

const sliderSetInterval = function() {
    // Change slide on timer
    let currentSlide = 1;
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

};

// Start review slider
// window.addEventListener("load", sliderSetInterval);


// Validation CTA email input form
const ctaFormEmail = document.querySelector('#email');
const ctaInputEmail = document.querySelector('#email-input');

ctaFormEmail.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = ctaInputEmail.value.trim();
  ctaInputEmail.setCustomValidity(isValidEmail(email) ? '' : 'Please enter a valid email address.');
  if (isValidEmail(email)) submitEmail(email);
});

ctaInputEmail.addEventListener('input', function(e) {
  const email = ctaInputEmail.value.trim();
  ctaInputEmail.setCustomValidity(isValidEmail(email) ? '' : 'Please enter a valid email address.');
});

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidName = (userName) => {
    const nameRegex = /^[a-zA-Z]{2,20}$/;
    return nameRegex.test(userName);
};

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{5,20}$/;
    return passwordRegex.test(password);
};


const submitEmail = (email) => console.log(`Email ${email} submitted`);
const submitSignUpForm = (userName, email, password) => console.log(`Form has been submitted! Name: ${userName}, Email: ${email}, Password: ${password}`);

const signUpButton = document.querySelector('.user-login__sign-up');

const signUpFormHandler = function (e) {
    const signUpForm = document.querySelector('.user-login--sign-up-form');
    const loginButton = document.querySelector('#user-login-button');
    const signUpFormCloseButton = document.querySelector('#modal-close-sign-up');
    const userNameInput = signUpForm.querySelector('#name');
    const userEmailInput = signUpForm.querySelector('#user-email');
    const userPasswordCreateInput = signUpForm.querySelector('#password-create');
    const userPasswordRepeatInput = signUpForm.querySelector('#password-repeat');
    e.preventDefault();
    signUpForm.classList.remove('hidden');
    signUpFormCloseButton.addEventListener('click', closeModalHandler.bind(null, signUpForm,signUpFormCloseButton));

    userNameInput.addEventListener('input', function() {
        const userName = userNameInput.value.trim();
        userNameInput.setCustomValidity(isValidName(userName) ? '' : `Please enter correct name.`);
    });
    userEmailInput.addEventListener('input', function() {
        const userEmail = userEmailInput.value.trim();
        userEmailInput.setCustomValidity(isValidEmail(userEmail) ? '' : `Please enter a correct email address`);

    });
    userPasswordCreateInput.addEventListener('input', function() {
        const userPasswordCreate = userPasswordCreateInput.value.trim();
        userPasswordCreateInput.setCustomValidity(isValidPassword(userPasswordCreate) ? '' : `Your password should have a length of 5 to 20 characters and include at least one number and one uppercase letter.`);
    });
    userPasswordRepeatInput.addEventListener('input', function() {
        const userPasswordCreate = userPasswordCreateInput.value.trim();
        const userPasswordRepeat = userPasswordRepeatInput.value.trim();
        userPasswordRepeatInput.setCustomValidity(userPasswordCreate === userPasswordRepeat ? '' : `Passwords don't match`);
    });
const signUpFormSubmit = function(e) {
    e.preventDefault();
    const userName = userNameInput.value.trim();
    const userEmail = userEmailInput.value.trim();
    const userPasswordCreate = userPasswordCreateInput.value.trim();
    const userPasswordRepeat = userPasswordRepeatInput.value.trim();
    if (isValidName(userName) && isValidEmail(userEmail) && isValidPassword(userPasswordCreate) && userPasswordCreate === userPasswordRepeat){
        submitSignUpForm(userName,userEmail,userPasswordCreate);
        userNameInput.value = '';
        userEmailInput.value = '';
        userPasswordCreateInput.value = '';
        userPasswordRepeatInput.value = '';
        document.querySelector('.user-login--sign-up-form').classList.add('hidden');
        document.querySelector('.button__user--sign-up').classList.toggle('hidden');
        document.querySelector('.button__user--logout').classList.toggle('hidden');
        signUpForm.removeEventListener('submit', signUpFormSubmit);
    } else {userNameInput.setCustomValidity(`Please make sure that all fields are completed correctly.`)};
};

    signUpForm.addEventListener('submit', signUpFormSubmit);


    const userLoginFormHandler = function(e){
        loginButton.removeEventListener('click', userLoginFormHandler);
        e.preventDefault();
        signUpForm.classList.add('hidden');
        const htmlForm = `<div class="modal user-login user-login--login">
                            <div class="user-login__wrapper">
                                <form action="">
                                    <fieldset>
                                        <legend>Login</legend>
                                        <label for="user-email"><span>Email:</span>
                                            <input type="email" id="user-email" placeholder="email@example.com">
                                        </label>
                                        <label for="password"><span>Password:</span>
                                            <input type="password" id="password" placeholder="Enter your password">
                                        </label>
                                        <label for="user-login-button"><input type="submit" value="Login" id="user-login-button-submit" class="button__user"></label>                
                                    </fieldset>
                                </form>
                                <button class="modal__close" id="modal-close-login" type="button"></button>
                            </div>
                        </div>`;

        const userEmailLoginHandler = function() {
            const userEmail = userEmailInput.value.trim();

            userEmailInput.setCustomValidity(isValidEmail(userEmail)
            ? '' 
            : `Please enter a correct email address`);
        };

        const passwordInputHandler = function() {
            const userPassword = userPasswordInput.value.trim();
            userPasswordInput.setCustomValidity(isValidPassword(userPassword)
            ? '' 
            : `Your password should have a length of 5 to 20 characters and include 
            at least one number and one uppercase letter.`);
        };

        const userLoginFormSubmit = function(e){
            const userPassword = userPasswordInput.value.trim();
            const userEmail = userEmailInput.value.trim();
            e.preventDefault();
            if(isValidEmail(userEmail) && isValidPassword(userPassword)) {
                console.log(`The user has logged in. ${userEmail}, ${userPassword}`);
                userLoginForm.remove();
                document.querySelector('.button__user--sign-up').classList.toggle('hidden');
                document.querySelector('.button__user--logout').classList.toggle('hidden');
                userLoginForm.removeEventListener('submit', userLoginFormSubmit);
                loginButton.removeEventListener('click', userLoginFormHandler);
        }};
        
        document.querySelector('body').insertAdjacentHTML('beforeend', htmlForm );
        const loginFormCloseButton = document.querySelector('#modal-close-login');
        const userLoginForm = document.querySelector('.user-login--login');
        const userEmailInput = userLoginForm.querySelector('#user-email');
        const userPasswordInput = userLoginForm.querySelector('#password');
        userEmailInput.addEventListener('input', userEmailLoginHandler);
        userPasswordInput.addEventListener('input', passwordInputHandler);
        userLoginForm.addEventListener('submit', userLoginFormSubmit);
        loginFormCloseButton.addEventListener('click', function() {
            userLoginForm.remove();
        });
    };

    loginButton.addEventListener('click', userLoginFormHandler);
};

signUpButton.addEventListener('click', signUpFormHandler);
   







