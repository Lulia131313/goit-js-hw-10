// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const display = document.querySelector('.timer');

startBtn.addEventListener('click', onBtnClick);

startBtn.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 3000,
      });
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};

flatpickr(inputEl, options);

function onBtnClick() {
  startBtn.disabled = true;
  inputEl.disabled = true;

  userSelectedDate = new Date(inputEl.value).getTime();
  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const diff = userSelectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(diff);
    render(days, hours, minutes, seconds);

    if (diff < 1000) {
      clearInterval(intervalId);
      inputEl.disabled = false;
      iziToast.success({
        message: 'Congratulation',
      });
    }
  }, 1000);
}

function render(days, hours, minutes, seconds) {
  if (userSelectedDate < Date.now()) return;
  display.querySelector('[data-days]').textContent = String(days).padStart(
    2,
    '0'
  );
  display.querySelector('[data-hours]').textContent = String(hours).padStart(
    2,
    '0'
  );
  display.querySelector('[data-minutes]').textContent = String(
    minutes
  ).padStart(2, '0');
  display.querySelector('[data-seconds]').textContent = String(
    seconds
  ).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
