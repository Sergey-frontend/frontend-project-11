import onChange from 'on-change';

const clear = (elements) => {
  const { input, feedback } = elements;
  feedback.classList.remove('text-danger');
  feedback.classList.remove('text-warning');
  feedback.classList.remove('text-success');
  input.classList.remove('is-invalid');
  input.disabled = false;
};
const handleError = (errorMessage, elements) => {
  const { feedback } = elements;
  feedback.textContent = errorMessage;
};

const handleForm = (status, elements) => {
  const { input, feedback, form, button } = elements;
  clear(elements);
  switch (status) {
    case 'loading': {
      feedback.classList.add('text-warning');
      feedback.textContent = 'Идёт загрузка...';
      input.disabled = true;
      button.setAttribute('disabled', true);
      break;
    }
    case 'success': {
      feedback.classList.add('text-success');
      feedback.textContent = 'Успешно загружено';
      form.reset();
      break;
    }
    case 'failed': {
      feedback.classList.add('text-danger');
      input.classList.add('is-invalid');
      break;
    }

    default:
      console.log('unknown status');
  }
};
const watch = (state, elements) =>
  onChange(state, (path, value) => {
    switch (path) {
      case 'form.status': {
        handleForm(value, elements);
        break;
      }
      case 'form.error': {
        handleError(value, elements);
        break;
      }
      default:
        console.log('unknowm state');
    }
  });

export default watch;