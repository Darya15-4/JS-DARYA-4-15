const registerUser = document.querySelector('.register__user');
const buttonRegister = document.querySelector('.header__button--register');
const buttonClose = document.querySelector('.button__close');




buttonRegister.addEventListener('click', () => {
    registerUser.showModal();
});

buttonClose.addEventListener('click', () => {
    registerUser.close();
});
window.addEventListener('click', (event) => {
    if (event.target === registerUser) {
        registerUser.close();
    }
});




const registerForm = document.querySelector('.register__user--form');
const emailInput = document.querySelector('.email_input');
const passwordInput = document.querySelector('.password_input');
const nameInput = document.querySelector('.name_input');
const textEmailError = document.querySelector('.emailError');
const textPasswordError = document.querySelector('.passwordError');
const textNameError = document.querySelector('.nameError');




registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    if (!emailInput.checkValidity() || (emailInput.value === '')) {
        textEmailError.textContent = 'Введите корректный Email.';
        isValid = false;
    } else {
        textEmailError.textContent = '';
    }
    if (nameInput.value.trim().length < 2 || (nameInput.value === '')) {
        textNameError.textContent = 'Введите настоящее имя.';
        isValid = false;
    } else {
        textNameError.textContent = '';
    }
    if (!passwordInput.checkValidity() || (passwordInput.value === '')) {
        textPasswordError.textContent = 'Пароль должен содержать минимум 6 символов.';
        isValid = false;
    } else {
        textPasswordError.textContent = '';
    }

    if (isValid) {
        const formData = new FormData(registerForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        registerForm.submit();
        console.log(data);
    } else {
        const firstInvalidInput = [...inputs].find(input => !input.checkValidity());
        if (firstInvalidInput) {
            firstInvalidInput.focus();
        }
    }
});





let inputs = document.querySelectorAll('.register__user--input');
inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
});

function validateField(input) {
    let textError = document.querySelector(`.${input.name}Error`);

    if (!input.checkValidity()) {
        input.setAttribute('aria-invalid', 'true');
        textError.style.display = 'block';
    } else {
        input.removeAttribute('aria-invalid');
        textError.style.display = 'none';
    }
}




registerUser.addEventListener('reset', function() {
    let errors = document.querySelectorAll('.text_error');
    errors.forEach(error => {
        error.style.display = 'none';
    });
});




let buttonShowPassword = document.querySelector('.button__show_passwod');
buttonShowPassword.addEventListener('pointerdown', () => {
    passwordInput.type = 'text';
});
buttonShowPassword.addEventListener('pointerup', () => {
    passwordInput.type = 'password';
});
buttonShowPassword.addEventListener('pointerleave', () => {
    passwordInput.type = 'password';
});



