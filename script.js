// Simple client-side sign in / sign out demo.
// Note: This does not perform real authentication; it only demonstrates
// the UI flow (form validation, sign in, sign out, password visibility toggle).

const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('toggle-password');
const signinBtn = document.getElementById('signin-btn');
const signoutBtn = document.getElementById('signout-btn');
const statusMsg = document.getElementById('status-msg');

function setStatus(message, isError) {
  statusMsg.textContent = message;
  statusMsg.classList.toggle('error', Boolean(isError));
}

function setSignedInState(isSignedIn, username) {
  signinBtn.disabled = isSignedIn;
  signoutBtn.disabled = !isSignedIn;
  usernameInput.disabled = isSignedIn;
  passwordInput.disabled = isSignedIn;

  if (isSignedIn) {
    setStatus(`Signed in as "${username}".`, false);
  }
}

togglePasswordBtn.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePasswordBtn.textContent = isHidden ? 'Hide' : 'Show';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    setStatus('Please enter both username and password.', true);
    return;
  }

  // Placeholder for real authentication (e.g. an API call).
  setSignedInState(true, username);
});

signoutBtn.addEventListener('click', () => {
  setSignedInState(false);
  form.reset();
  passwordInput.type = 'password';
  togglePasswordBtn.textContent = 'Show';
  setStatus('You have been signed out.', false);
});
