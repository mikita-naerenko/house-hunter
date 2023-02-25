"use strict"
import './nav.js';

const sallerRoomTour = document.querySelector('.saller--room-tour');

 
const getUserData = async function() {
    try {
     const result = await fetch ('https://63f1ec8af28929a9df501176.mockapi.io/user');   
     if (!result.ok) throw new Error(e.message);
     const userData = await result.json();
     return  userData;
    } catch (e) {
        console.error(e.message);
    }
}



const renderProductCard = function(productCardArr) {
    // The function to render product card
    productCardArr.forEach(productItem => {
           const html = `<article class="slider__card ">
           <picture class="slider__card-mod slider__card-mod--${productItem.category.modif}"><img class="slider__img" srcset="${productItem.img}" width="200px" alt=""></picture>
           
           <h3 class="slider__title">${productItem.name}</h3>
           <p class="slider__price">${productItem.price}</p>
       <div class="saller">
           <picture>
           <img srcset="${productItem.saller.avatar}" width="40" alt=""></picture>
           <div class="slide__wrapper">
           <a href="#" class="saller__name">${productItem.saller.name}</a>
           <a href="#" class="saller__text">${productItem.saller.address}</a>
           </div>
       </div>
       </article>`; 

            document.querySelector('.slider__slide-container').insertAdjacentHTML('afterbegin', html);
    });
}

const renderArticles = function(articlesArr) {
    const firstThreeArticles = articlesArr.sort((a,b) => a.date.getTime() - b.date.getTime()).slice(0,3);
    const [mainArticle] = articlesArr.slice(-1);
    console.log(mainArticle);
    firstThreeArticles.forEach(article => {
        const html = `<li class="articles-list__item">
                        <img class="articles-list__item-image" srcset="${article.img}" width="100" height="75" alt="">
                        <div class="articles-list__description article-preview">
                        <div class="saller saller--article-preview">
                            <picture><img srcset="${article.author.avatar}"  width="40" alt=""></picture>
                            <div class="slide__wrapper">
                            <a href="#" class="saller__name">${article.author.name}</a>
                            </div>
                        </div>
                        <h3 class="articles-preview__title">${article.title}</h3>
                        <p class="articles-preview__description" style="display:none"></p>
                        <p class="articles-preview__date"><span>${article.readTime} read</span><time datetime="${article.date.toISOString()}">${new Intl.DateTimeFormat('en-US', {month: "long", day: "numeric", year: "numeric"}).format(article.date)}</time></p>
                    </div>
                    </li>`;
        document.querySelector('.articles-list').insertAdjacentHTML('afterbegin', html);
    });
    const htmlMainArticle = `<li >
                        <div class="">
                            <img srcset="${mainArticle.img}" alt="" class="articles-list__item-image--main">
                        </div>
                        <div class="articles-list__description article-preview">
                            <div class="saller saller--article-preview">
                                <picture><img srcset="${mainArticle.author.avatar}"  width="40" alt=""></picture>
                                <div class="slide__wrapper">
                                <a href="#" class="saller__name">${mainArticle.author.name}</a>
                                </div>
                            </div>
                            <h3 class="articles-preview__title">${mainArticle.title}</h3>
                            <p class="articles-preview__description">${mainArticle.description}</p>
                            <p class="articles-preview__date"><span>${mainArticle.readTime} read</span><time datetime="${mainArticle.date.toISOString()}">${new Intl.DateTimeFormat('en-US', {month: "long", day: "numeric", year: "numeric"}).format(mainArticle.date)}</time></p>
                        </div>
                    </li>`
                    document.querySelector('.articles-list--main').insertAdjacentHTML('afterbegin', htmlMainArticle);
}

const typeOfProductButtonHandler = function(productCardArr, e) {
    const target = e.target.getAttribute('id');
    const slideContainer = document.querySelector('.slider__slide-container');
    if (!target) return;
    while (slideContainer.firstChild)
    slideContainer.removeChild(slideContainer.firstChild);
    renderProductCard(productCardArr.filter(el => el.category.type === target));
}

 getUserData().then(data =>{
    
    sallerRoomTour.querySelector('img').srcset = data[0].userData[0].avatar;
    sallerRoomTour.querySelector('.saller__name').textContent = data[0].userData[0].name;
    sallerRoomTour.querySelector('.saller__text').textContent = data[0].userData[0].position;

    const productCardArr = data[1].productCard;
    const userArr = data[0].userData;
    
    const sallerArr = data[0].userData.filter(el => el.admin === true);
    productCardArr.forEach(item => {
        sallerArr.map(saller => {
            if (saller.id === item.sallerId) item.saller = saller;
        });
    });
    const articlesArr = data[2].articles;
    articlesArr.forEach(article => {
        article.date = new Date(article.date);
        userArr.map(user => {
            if (user.id === article.authorId) article.author = user;
        });
    });
    // console.log(articlesArr);
    renderArticles(articlesArr);
    renderProductCard(productCardArr);
    document.querySelector('.featured-house__input-list').addEventListener('click', typeOfProductButtonHandler.bind(null, productCardArr));
});







