const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const status = document.getElementById('status');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    status.textContent = 'Please enter both username and password.';
    status.style.color = '#d93025';
    return;
  }

  // Placeholder for real authentication logic.
  status.textContent = `Signed in as ${username}`;
  status.style.color = '#1a8a3d';

  signInBtn.disabled = true;
  signOutBtn.disabled = false;
  usernameInput.disabled = true;
  passwordInput.disabled = true;
});

signOutBtn.addEventListener('click', () => {
  status.textContent = 'Signed out successfully.';
  status.style.color = '#555';

  signInBtn.disabled = false;
  signOutBtn.disabled = true;
  usernameInput.disabled = false;
  passwordInput.disabled = false;
  usernameInput.value = '';
  passwordInput.value = '';
});
