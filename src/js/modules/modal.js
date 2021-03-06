function openModal(modalSelector, modalTimerId, scroll) {
    const modal = document.querySelector(modalSelector);

    // modal.classList.add('show');
    // modal.classList.remove('hide');
    modal.style.display = 'block';
    // document.body.classList.add('modal-open'); // класс из bootstrap
    document.body.style.overflow = 'hidden';

    // отступ с учетом скролла
    document.body.style.marginRight = `${scroll}px`;

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector, windows) {
    const modal = document.querySelector(modalSelector);

    closeAllModals(windows);

    // modal.classList.add('hide');
    // modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.marginRight = `0px`;

    // document.body.classList.remove('modal-open');
    // document.body.style.overflow = '';
}

function closeAllModals(windows) {
    // закрытие всех модальых окон на странице, когда их вызвано несколько (калькулятор)
    windows.forEach((item) => {
        item.style.display = 'none';
    });

    // document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;



}

const modal = (modalState) => {
    // closeClickOverlay - по умолчанию модальное окно закрывается при клике на подложку
    const bindModal = (triggerSelector, modalSelector, closeSelector, modalTimerId, closeClickOverlay = true) => {
        const trigger = document.querySelectorAll(triggerSelector); // псевдомассив триггеров
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const windows = document.querySelectorAll('[data-modal]'); // все модальные окна со страницы
        const scroll = calcScroll();

        trigger.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault(); // отключение действий по умолчанию у элемента
                }

                closeAllModals(windows);
                openModal(modalSelector, modalTimerId, scroll);
            });
        });

        // закрытие по крестику
        close.addEventListener('click', () => {
            closeModal(modalSelector, windows);
        });

        // закрытие по нажатию на подложку, а также если closeClickOverlay = true.
        // нужно чтобы предотвратить закрытие в калькуляторе, во время расчетов пользователя
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                closeModal(modalSelector, windows);
            }
        });

        // закрытие по клавише esc
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && window.getComputedStyle(modal).display === 'block') {
                closeModal(modalSelector, windows);
            }
        });
    };

    // подсчет размера скролла
    function calcScroll() {

        let div = document.createElement('div');

        // чтобы провести расчеты, нужно чтобы он существовал на странице
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        // Теперь вычисляем сам размер прокрутки
        let scrollWidth = div.offsetWidth - div.clientWidth; // полная ширина - ширина с padding и главным контентом(без скролла)

        // теперь можно удалить блок
        div.remove();
        return scrollWidth;
    }

    const modalTimerId = setTimeout(() => openModal('.popup', modalTimerId), 60000);

    // кнопка вызов замерщика
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close', modalTimerId);

    // кнопка заказать обратный звонок
    bindModal('.phone_link', '.popup', '.popup .popup_close', modalTimerId);

    // кнопка рассчитать стоимость
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', modalTimerId);

    // кнопка далее в калькуляторе. Тут также блокируется закрытие по клику на подложку
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', modalTimerId, false);

    // кнопка далее в выборе профиля
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', modalTimerId, false);
};

export default modal;
export {closeModal};
export {closeAllModals};
export {openModal};
