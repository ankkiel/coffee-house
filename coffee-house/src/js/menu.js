const navigation = document.querySelector('.navigation');
const burgerBtn = document.querySelector('.header__burger');
const burgerLines = document.querySelectorAll('.header__burger-line');
const navigationItems = document.querySelectorAll('.navigation__item');
const body = document.querySelector('body');

const toggleNavigation = () => {
    body.classList.toggle('fix-screen');
    navigation.classList.toggle('navigation--open');
    burgerBtn.classList.toggle('header__burger--active');
    burgerLines.forEach(item => {
        item.classList.toggle('header__burger-line--active');
    });
};

burgerBtn.addEventListener('click', toggleNavigation);

navigationItems.forEach(item => {
    item.addEventListener('click', toggleNavigation);
});