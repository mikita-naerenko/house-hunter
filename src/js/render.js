"use strict"
export const renderProductCard = function(productCardArr) {
    // The function to render product card
    productCardArr.forEach(productItem => {
           const html = `<article class="slider__card ">
           <picture class="slider__card-mod slider__card-mod--${productItem.category.modif}"><img class="slider__img lazy-img" srcset="${productItem.img}" width="200px" alt=""></picture>
           
           <h3 class="slider__title">${productItem.name}</h3>
           <p class="slider__price">${productItem.price}</p>
       <div class="saller">
           <picture>
           <img srcset="${productItem.saller.avatar}"  width="40" alt=""></picture>
           <div class="slide__wrapper">
           <a href="#" class="saller__name">${productItem.saller.name}</a>
           <a href="#" class="saller__text">${productItem.saller.address}</a>
           </div>
       </div>
       </article>`; 

            document.querySelector('.slider__slide-container').insertAdjacentHTML('afterbegin', html);
    });
};

export const renderArticles = function(articlesArr) {
    const firstThreeArticles = articlesArr.sort((a,b) => a.date.getTime() - b.date.getTime()).slice(0,3);
    const [mainArticle] = articlesArr.slice(-1);
    firstThreeArticles.forEach(article => {
        const html = `<li class="articles-list__item">
                        <img class="articles-list__item-image" srcset="" data-srcset="${article.img}" width="100" height="75" alt="">
                        <div class="articles-list__description article-preview">
                        <div class="saller saller--article-preview">
                            <picture><img srcset="" data-srcset="${article.author.avatar}" class="lazy-img" width="40" alt=""></picture>
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
                            <img srcset="" data-srcset="${mainArticle.img}"  alt="" class="articles-list__item-image--main ">
                        </div>
                        <div class="articles-list__description article-preview">
                            <div class="saller saller--article-preview">
                                <picture><img srcset="" data-srcset="${mainArticle.author.avatar}"  width="40" alt=""></picture>
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
};

export const renderRoomTourSection = function(roomTourArr) {
    let currentTour = 0;
    const optionsMap = new Map(Object.entries(roomTourArr[currentTour].houseOptions));
    optionsMap.forEach((value, key) => {
        
        const html = `<li class="room-tour-description__detail-item room-tour-description__detail-item--${key}">${value} ${key}</li>`;
        document.querySelector('.room-tour-description__detail-list').insertAdjacentHTML('afterbegin', html);
    });

    const htmlSaller = `<div class="saller saller--room-tour">
                    <picture><img srcset="" data-srcset="${roomTourArr[currentTour].saller.avatar}" width="40" alt=""></picture>
                    <div class="slide__wrapper">
                    <a href="#" class="saller__name">${roomTourArr[currentTour].saller.name}</a>
                    <a href="#" class="saller__text">${roomTourArr[currentTour].saller.position}</a>
                    </div>
                    <a class="main-button main-button__contact" href="tel:">
                        <svg class="main-button--phone" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.38439 2.47912C8.90949 2.3208 9.47298 2.34711 9.98104 2.55365C10.4891 2.7602 10.9111 3.13453 11.1768 3.61432L11.2668 3.79312L12.06 5.55832C12.3011 6.09411 12.3793 6.68894 12.285 7.26885C12.1907 7.84876 11.928 8.38814 11.5296 8.81992L11.3712 8.97832L10.1184 10.1459C9.8928 10.3595 10.062 11.1863 10.8792 12.5999C11.6124 13.8719 12.2112 14.4659 12.504 14.4983H12.5556L12.6192 14.4863L15.0792 13.7339C15.4098 13.6325 15.7626 13.6285 16.0955 13.7224C16.4283 13.8162 16.727 14.004 16.956 14.2631L17.0664 14.4011L18.6936 16.6571C19.0129 17.0992 19.1721 17.6368 19.1451 18.1814C19.118 18.7261 18.9063 19.2453 18.5448 19.6535L18.3984 19.8047L17.7468 20.4215C17.1627 20.9746 16.4322 21.3484 15.6419 21.4984C14.8516 21.6483 14.0349 21.5682 13.2888 21.2675C10.9668 20.3315 8.85719 18.1931 6.94079 14.8739C5.02079 11.5463 4.2228 8.64592 4.5792 6.16192C4.68715 5.41091 4.99653 4.70316 5.47446 4.11388C5.9524 3.52459 6.58104 3.07578 7.2936 2.81512L7.52519 2.73832L8.38439 2.47912Z" fill="white"/>
                            </svg>
                        <span>Contact Now</span>
                        </a>
                    </div>`;
    document.querySelector('.room-tour-description').insertAdjacentHTML('beforeend', htmlSaller);
    
    const htmlMainPhoto = `<img srcset="" data-srcset="${roomTourArr[currentTour].photoList.slice(0, 1)}"  width="60" height="60" alt="" class="show-photo__item show-photo__item--main">`;
    document.querySelector('.show-photo').insertAdjacentHTML('afterbegin', htmlMainPhoto);
    roomTourArr[currentTour].photoList.slice(1, 4).forEach((img, i) => {
        let html;
        i === 0 ? html = `<img srcset="" data-srcset="${img}" width="60" height="60" alt="" class="show-photo__item show-photo__item--next">`
        : html = `<img srcset="" data-srcset="${img}"  width="60" height="60" alt="" class="show-photo__item"></img>`;
        document.querySelector('.show-photo__wrapper').insertAdjacentHTML('beforeend', html);
    });

};

export const renderReviewItem = function(reviewArr) {
    reviewArr.slice(0, 3).forEach ((review, i) => {
        const html = `<li class="review__element slider__item--${i+1}">
                        <div class="slider-item__container">
                            <img srcset="${review.img}" data-srcset="${review.img}"  width="250" alt="house photo" class="review__img">
                        </div>
                        <section class=" review-item">
                                <h2 class="review-item__title">${review.title}</h2>
                                <p class="review-item__description">${review.text}</p>
                                <div class="saller saller--review">
                                    <picture><img srcset="${review.author.avatar}" data-srcset="${review.author.avatar}" width="40" alt="user avatar"></picture>
                                    <div class="slide__wrapper">
                                    <a href="#" class="saller__name">${review.author.name}</a>
                                    <a href="#" class="saller__text">${review.author.position}</a>
                                    </div>
                                    <div class="saller__grade">${review.grade}</div>
                                </div>
                        </section>
                    </li>`;
                    document.querySelector('.review__list').insertAdjacentHTML('beforeend', html);
    })

};