"use strict"

const dropDownButton = document.querySelector('.nav__item--drop-down');
const dropDownElement = document.querySelector('.drop-down');



dropDownButton.addEventListener('click', function(e){
    e.preventDefault();
    (dropDownElement.classList.contains('hidden')) ?
     dropDownElement.classList.remove('hidden') : 
     dropDownElement.classList.add('hidden');
});

document.querySelector('.nav__list').addEventListener('click', function(e){
    e.preventDefault(); 
    const href = e.target.getAttribute('href');
    if (!href) return;
    if (href != null && href != '#') document.querySelector(href).scrollIntoView({behavior: 'smooth'});
    
})