const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDay = today.getDate();

const dates = [];
for (let i = 0; i < 7; i++) {
    const date = new Date(currentYear, currentMonth, currentDay + i);
    dates.push(date.toLocaleDateString());
}

const seances = [];
for (let i = 0; i < 6; i++) {
    const startHour = 10 + i * 2;
    seances.push({ hour: startHour, seats: [] });
}

const seats = [];
for (let i = 0; i < 60; i++) {
    seats.push({ free: true, booked: false });
}

function displayDates() {
    const datesHtml = dates.map((date) => {
        return `<button class="date-button" data-date="${date}">${date}</button>`;
    }).join('');
    document.querySelector('.dates').innerHTML = datesHtml;
}

// Функция для отображения доступных сеансов
function displaySeances(date) {
    const seancesHtml = seances.map((seance) => {
        return `<li>${seance.hour}:00</li>`;
    }).join('');
    document.querySelector('#seances-list').innerHTML = seancesHtml;
}

function displaySeats(seance) {
    const seatsHtml = seats.map((seat, index) => {
        return `<tr>
            <td>${index + 1}</td>
            <td>${seat.free ? 'Свободно' : 'Забронировано'}</td>
            <td>${seat.booked ? 'Забронировано' : 'Свободно'}</td>
        </tr>`;
    }).join('');
    document.querySelector('#seats-table').innerHTML = seatsHtml;
}

function changeSeatStatus(seatIndex, status) {
    seats[seatIndex].booked = status;
    displaySeats(seances[0]);
}

function saveData() {
    localStorage.setItem('dates', JSON.stringify(dates));
    localStorage.setItem('seances', JSON.stringify(seances));
    localStorage.setItem('seats', JSON.stringify(seats));
}

function loadData() {
    const storedDates = localStorage.getItem('dates');
    const storedSeances = localStorage.getItem('seances');
    const storedSeats = localStorage.getItem('seats');

    if (storedDates) {
        dates = JSON.parse(storedDates);
    }
    if (storedSeances) {
        seances = JSON.parse(storedSeances);
    }
    if (storedSeats) {
        seats = JSON.parse(storedSeats);
    }
}

loadData();
displayDates();

document.querySelectorAll('.date-button').forEach((button) => {
    button.addEventListener('click', (event) => {
        const date = event.target.dataset.date;
        displaySeances(date);
    });
});

document.querySelectorAll('.seance-button').forEach((button) => {
    button.addEventListener('click', (event) => {
        const seanceIndex = parseInt(event.target.dataset.seance);
        const seatIndex = parseInt(event.target.dataset.seat);
        changeSeatStatus(seatIndex, !seats[seatIndex].booked);
    });
});