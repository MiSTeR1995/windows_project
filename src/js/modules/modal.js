function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');

    document.body.classList.add('modal-open'); // класс из bootstrap
    // document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');

    document.body.classList.remove('modal-open');
    // document.body.style.overflow = '';
}


const modal = () => {
    const bindModal = (triggerSelector, modalSelector, closeSelector, modalTimerId) => {
        const trigger = document.querySelectorAll(triggerSelector); // псевдомассив триггеров
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);

        trigger.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault(); // отключение действий по умолчанию у элемента
                }
                openModal(modalSelector, modalTimerId);
            });
        });

        close.addEventListener('click', () => {
            closeModal(modalSelector);
        });
        // закрытие по нажатию на подложку
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modalSelector);
            }
        });

        // закрытие по клавише esc
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal(modalSelector);
            }
        });
    };

    const modalTimerId = setTimeout(() => openModal('.popup', modalTimerId), 5000);

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close', modalTimerId);
    bindModal('.phone_link', '.popup', '.popup .popup_close', modalTimerId);
};

export default modal;
export {closeModal};
export {openModal};
