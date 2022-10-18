import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/feedback-form.css';

const STORAGE_KEYS = 'allData';

const refs = {
  form: document.querySelector('.js-feedback-form'),
  input: document.querySelector('.js-feedback-form  input'),
  textarea: document.querySelector('.js-feedback-form  textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
// refs.textarea.addEventListener('input', throttle(onTextareaInput, 200));

refs.form.addEventListener('input', throttle(onChangeForm, 200));
const formData = {};

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  console.log('Отправляем форму');
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEYS);
}

// function onTextareaInput(e) {
//   const message = e.target.value;
//   console.log(message);
//   localStorage.setItem(STORAGE_KEY, message);
// }

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEYS);
  const parsedMessage = JSON.parse(savedMessage);

  if (parsedMessage?.name) {
    refs.input.value = parsedMessage.name;
  }

  if (parsedMessage?.message) {
    refs.textarea.value = parsedMessage.message;
  }
}

function onChangeForm(e) {
  formData[e.target.name] = e.target.value; // используя всплытие заполняем обьект formData
  const str = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEYS, str);
}
