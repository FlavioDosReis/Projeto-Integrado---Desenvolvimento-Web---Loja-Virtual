/*Menu Burger mobile */

let menuBurger = document.querySelector('.menu__burger');
let headerMenu = document.querySelector('.header__menu__burger');

menuBurger.addEventListener('click', ( ) => {
    if (headerMenu.style.display === 'block') {
        headerMenu.style.display = 'none' ;
        menuBurger.classList.remove('active') ;  /* troca de cor do icone*/
    }  else {
        headerMenu.style.display = 'block' ;
        menuBurger.classList.add('active') ;   
    }

});