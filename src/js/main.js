import "./slider";
import modal from './modules/modal';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';

window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    // объект с данными калькулятора
    let modalState = {};
    changeModalState(modalState);

    modal();
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    // в соответствии с версткой класс табов выбран no_click, т.к остальные другие меняют свое название. Это не ок
    // также внутри контента два подряд идущих блока, можно сделать строгое соответствие в  селекторе
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    forms(modalState);
});
