const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    // только числа в полях для телефоного номера
    numInputs.forEach((item) => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, ''); // замена не числа на пустую строку
        });
    });
};

export default checkNumInputs;
