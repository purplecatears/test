// Simple front-end demo logic for the login page.
// Note: This is a client-side demo only — do not use this as-is for real
// authentication. Real apps must verify credentials on a secure backend.

const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const statusEl = document.getElementById('status');
const messageEl = document.getElementById('message');

let isSignedIn = false;

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = 'message' + (type ? ' ' + type : '');
}

function setSignedInState(signedIn, username) {
  isSignedIn = signedIn;

  usernameInput.disabled = signedIn;
  passwordInput.disabled = signedIn;
  signInBtn.disabled = signedIn;
  signOutBtn.disabled = !signedIn;
  changePasswordBtn.disabled = !signedIn;

  if (signedIn) {
    statusEl.textContent = `Signed in as ${username}`;
    statusEl.classList.add('signed-in');
  } else {
    statusEl.textContent = 'You are signed out.';
    statusEl.classList.remove('signed-in');
  }
}

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePasswordBtn.textContent = isHidden ? 'Hide' : 'Show';
});

// Sign in
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    showMessage('Please enter both username and password.', 'error');
    return;
  }

  // Placeholder for real authentication logic (e.g., an API call).
  setSignedInState(true, username);
  showMessage(`Welcome, ${username}!`, 'success');
});

// Sign out
signOutBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  setSignedInState(false);
  usernameInput.value = '';
  passwordInput.value = '';
  passwordInput.type = 'password';
  togglePasswordBtn.textContent = 'Show';
  showMessage(username ? `${username} has been signed out.` : 'Signed out.', 'success');
});

// Forgot password (placeholder action)
forgotPasswordBtn.addEventListener('click', () => {
  showMessage('A password reset link would be sent to your email.', 'success');
});

// Change password (only available when signed in)
changePasswordBtn.addEventListener('click', () => {
  if (!isSignedIn) return;
  const newPassword = prompt('Enter a new password:');
  if (newPassword) {
    showMessage('Password changed successfully.', 'success');
  }
});
