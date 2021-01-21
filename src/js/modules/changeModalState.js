import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    // 5 разных выборов пользователя: форма балкона, ширина, высота, профиль, тип остекления
    const windowForm = document.querySelectorAll('.balcon_icons_img'); // селектор с табами
    const windowWidth = document.querySelectorAll('#width'); // Тут лежит 1 элемент, но псевдомассив нужен для отработки функции
    const windowHeight = document.querySelectorAll('#height'); // аналогично
    const windowType = document.querySelectorAll('#view_type'); // аналогично
    const windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    // передача данных в state
    function bindActionToElems (event, elem, prop) {

        elem.forEach((item, i) => {
            // записываем клики на определенные по счету элемента и записываем в объект state
            item.addEventListener(event, () => {

                switch(item.nodeName) {
                    case 'SPAN':                // название элемента из nodeName всегда в верхнем регистре
                        state[prop] = i; // клик в картинку с формой окна
                        break;
                    case 'INPUT':
                        if (item.getAttribute ('type') === 'checkbox') {
                            // с помощью тернарного оператора запишем выбор профиля пользователем
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';

                            // нужно убрать также галочки у всех чекбоксов, кроме нужного
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }

                console.log(state);
            });
        });
    }

    // запись формы окна
    bindActionToElems('click', windowForm, 'form');

    // запись высоты
    bindActionToElems('input', windowWidth, 'width');

    // запись ширины
    bindActionToElems('input', windowHeight, 'height');

    // запись типа остекления
    bindActionToElems('change', windowType, 'type');

    // запись профиля
    bindActionToElems('change', windowProfile, 'profile');

};

export default changeModalState;
