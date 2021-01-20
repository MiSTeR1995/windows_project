const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);

    const hideTabContent = () => {
        content.forEach((item) => {
            item.style.display = 'none';
        });

        tab.forEach((item) => {
            item.classList.remove(activeClass);
        });
    };

    const showTabContent = (i = 0) => {
        // i - номер элемента, на который кликнули
        content[i].style.display = 'block';
        tab[i].classList.add(activeClass);
    };

    // инициализация табов
    hideTabContent();
    showTabContent();

    // Отслеживание табов, на которые кликнули через делегирование событий
    header.addEventListener('click', (e) => {
        const target = e.target;

        // проверка на правильность клика по табу и только после этого можно их перебирать
        if (
            target && //  наличие вообще таргета у элемента
            (target.classList.contains(tabSelector.replace(/\./, '')) || // убираем точку через регулярки
                // также проверка клика на дочерние элементы таба
                target.parentNode.classList.contains(tabSelector.replace(/\./, '')))
        ) {
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};

export default tabs;
