document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.add(`${savedTheme}-theme`);
  document.body.classList.add(`${savedTheme}-theme`);

  const themeToggleButton = document.querySelector('.theme-toggle');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.replace(`${currentTheme}-theme`, `${newTheme}-theme`);
      document.body.classList.replace(`${currentTheme}-theme`, `${newTheme}-theme`);
      localStorage.setItem('theme', newTheme);
    });
  }

  const toast = document.querySelector('.toasts__block');
  const toastMessage = document.querySelector('.toasts__message');
  const toastButton = document.querySelector('.toast__button');

  function showToast(message, isSuccess) {
    if (!toast || !toastMessage) {
      return;
    }
    toastMessage.textContent = message;
    toast.classList.remove('toast--error', 'toast--success');
    toast.classList.add(isSuccess ? 'toast--success' : 'toast--error', 'toast--show');
    setTimeout(() => {
      toast.classList.remove('toast--show', 'toast--error', 'toast--success');
    }, 3000);
  }

  if (toastButton) {
    toastButton.addEventListener('click', () => {
      toast.classList.remove('toast--show', 'toast--error', 'toast--success');
    });
  }

  const galleryContainer = document.querySelector('.gallery__container');
  const galleryButton = document.querySelector('.gallery__button');
  const galleryMessage = document.querySelector('.gallery__message');

  async function getImages() {
    if (!galleryContainer || !galleryMessage) {
      return;
    }
    let attempts = 0;
    let data = null;
    galleryMessage.textContent = 'Загрузка...';
    
    while (attempts < 3 && !data) {
      try {
        const response = await fetch('http://194.67.93.117:80/images');
        if (!response.ok) {
          throw new Error('Ошибка при запросе');
        }
        data = await response.json();
      } catch {
        attempts++;
        await new Promise(res => setTimeout(res, 1000));
      }
    }

    galleryContainer.innerHTML = '';
    if (!data || data.length === 0) {
      galleryMessage.textContent = 'Изображения не найдены';
      showToast('Ошибка загрузки изображений!', false);
      return;
    }

    galleryMessage.textContent = '';
    data.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');

      const image = document.createElement('img');
      image.classList.add('gallery-item__image');
      image.src = item.url;
      image.alt = item.alt || 'Изображение';

      const caption = document.createElement('p');
      caption.classList.add('gallery-item__caption');
      caption.textContent = item.description || 'Без описания';

      galleryItem.append(image, caption);
      galleryContainer.appendChild(galleryItem);
    });
    showToast('Изображения успешно загружены!', true);
  }

  if (galleryButton) {
    galleryButton.addEventListener('click', getImages);
  }
  getImages();

  const temperatureForm = document.querySelector('.temperature__form');
  const roomInput = document.querySelector('.number__input');
  const tempInput = document.querySelector('.temp__input');
  const submitButton = document.querySelector('.temperature__button');

  if (temperatureForm && roomInput && tempInput && submitButton) {
    temperatureForm.addEventListener('submit', async event => {
      event.preventDefault();
      const roomNumber = roomInput.value.trim();
      const temperature = parseFloat(tempInput.value);
      
      if (!roomNumber || isNaN(temperature)) {
        showToast('Пожалуйста, заполните все поля корректно.', false);
        return;
      }

      submitButton.disabled = true;
      const payload = { room: roomNumber, temperature };

      try {
        const response = await fetch('http://194.67.93.117/api/temp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const textResponse = await response.text();
        let responseData;

        try {
          responseData = JSON.parse(textResponse);
        } catch {
          if (response.ok) {
            showToast('Данные успешно отправлены!', true);
            temperatureForm.reset();
            return;
          }
          throw new Error(textResponse || 'Ошибка на сервере');
        }

        if (!response.ok) {
          throw new Error(responseData.message || 'Ошибка на сервере');
        }

        showToast(responseData.message || 'Данные успешно отправлены!', true);
        temperatureForm.reset();
      } catch (error) {
        showToast(`Ошибка при отправке данных: ${error.message}`, false);
      } finally {
        submitButton.disabled = false;
      }
    });
  }
});
