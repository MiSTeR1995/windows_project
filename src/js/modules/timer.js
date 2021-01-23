const timer = (id, deadline) => {

    const addZero = (num) => {
        if (num <= 9) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    const getTimeRemaining = (endTime) => {
        const t = Date.parse(endTime) - Date.parse(new Date()); // разница между дедлайном и текущей датой
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / 1000 / 60 / 60) % 24);
        const days = Math.floor((t / 1000 / 60 / 60 / 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector);
        const days = document.querySelector('#days');
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        const timeInterval = setInterval(updateClock ,1000);

        // вызов обновления таймера до запуска интервала (чтобы не мигала верстка)
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

                clearInterval(timeInterval);
            }
        }

    };

    setClock(id, deadline);

};

export default timer;