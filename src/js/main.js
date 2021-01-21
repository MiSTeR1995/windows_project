import "./slider";
import modal from './modules/modal';
import tabs from './modules/tabs';
import forms from './modules/forms';
window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    modal();
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    // в соответствии с версткой класс табов выбран no_click, т.к остальные другие меняют свое название. Это не ок
    // также внутри контента два подряд идущих блока, можно сделать строгое соответствие в  селекторе
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    forms();
});
