import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        succes: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    // async await - позволяет дождаться результата запроса
    const postData =  async (url, data) => {
        // сначала оповестим пользователя о статусе запроса
        document.querySelector('.status').textContent = message.loading;
        let result = await fetch(url, {
            method: 'POST',
            body: data,
        });

        // тут тоже дождаться выполнения
        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault(); // блок перезагрузки страницы

            // подготовка формы к отправке запроса
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            // сбор данных в форме через FormData
            const formData = new FormData(item);

            // для формы в калькуляторе с данными из него. Динамические данные
            if (item.getAttribute('data-calc') === 'end') {
                // запись объекта с данными в formData
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php',formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.succes;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove(); // удалить элемент со страницы
                    }, 5000);
                });
        });
    });
};

export default forms;
