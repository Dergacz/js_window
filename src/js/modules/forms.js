import checkNumInputs from './checkNumInputs';

const forms = (state) => {
  const form = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');
  const windows = document.querySelectorAll('[data-modal]');

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let response = await fetch(url, {
      method: 'POST',
      body: data
    });
    return await response.text();
  };

  const clearInputs = () => {
    inputs.forEach(input => {
      input.value = '';
    });
  };

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);
      if(item.getAttribute('data-calc') === 'end') {
        for(let key in state) {
          formData.append(key, state[key]);
        }
      }
      console.log(formData);
      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            windows.forEach(item => {
              item.style.display = 'none';
            });
            statusMessage.remove();
          }, 3000);
        });
    });
  });
};

export default forms;