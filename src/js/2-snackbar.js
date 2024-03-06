// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const inputDel = +e.currentTarget.elements.delay.value;
  const radioBtn = e.currentTarget.elements.state.value;

  createPromise(radioBtn, inputDel)
    .then(res => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${inputDel}ms`,
      });
    })
    .catch(rej => {
      iziToast.error({
        message: `❌ Rejected promise in ${inputDel}ms`,
      });
    });
  e.currentTarget.reset();
}

function createPromise(btn, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      btn === 'fulfilled' ? res({ delay }) : rej({ delay });
    }, delay);
  });
}
