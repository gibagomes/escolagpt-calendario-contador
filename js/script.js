const daysContainer = document.getElementById('days');
const monthName = document.getElementById('month-name');
const yearName = document.getElementById('year');
const selectedDateText = document.getElementById('selected-date');
const dateDifferenceText = document.getElementById('date-difference');

const currentDate = new Date();
let selectedDate = null;

const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

function renderCalendar(month, year) {
    daysContainer.innerHTML = '';
    monthName.textContent = months[month];
    yearName.textContent = year;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<div></div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        daysContainer.innerHTML += `<div>${i}</div>`;
    }

    const days = daysContainer.querySelectorAll('div');

    days.forEach(day => {
        day.addEventListener('click', () => {
            if (selectedDate) {
                selectedDate.classList.remove('active');
            }
            selectedDate = day;
            selectedDate.classList.add('active');
            const selectedDay = parseInt(day.textContent);
            const selectedFullDate = new Date(year, month, selectedDay);
            selectedDateText.textContent = selectedFullDate.toDateString();
            calculateDateDifference(selectedFullDate);
        });
    });
}

function calculateDateDifference(selectedFullDate) {
    const today = new Date();
    const timeDifference = Math.abs(today - selectedFullDate);
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (selectedFullDate < today) {
        dateDifferenceText.textContent = `Essa data foi há ${dayDifference} dias.`;
    } else if (selectedFullDate > today) {
        dateDifferenceText.textContent = `Essa data será em ${dayDifference} dias.`;
    } else {
        dateDifferenceText.textContent = `Hoje é o dia selecionado.`;
    }
}

document.querySelector('.prev').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
});

document.querySelector('.next').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
});

renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
