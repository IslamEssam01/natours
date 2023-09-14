import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import displayMap from './mapbox';

const loginForm = document.querySelector('.form--login');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    await updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn-save-password').textContent = 'Updating';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn-save-password').textContent = 'Save Password';
  });
}

const logoutBtn = document.querySelector('.nav__el--logout');

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

const mapbox = document.getElementById('map');

if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);

  displayMap(locations);
}
