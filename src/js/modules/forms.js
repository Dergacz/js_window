const forms = () => {
  const form = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');
  const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/, '');
    });
  });

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

      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;