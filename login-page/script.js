// Front-end only demo logic for the login page.
// Replace the checkCredentials() logic with a real API call in production.

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const messageEl = document.getElementById("message");
const statusBar = document.getElementById("statusBar");

// Demo credentials (for local testing only).
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "password123";

function setSignedInState(isSignedIn, username = "") {
  signInBtn.disabled = isSignedIn;
  signOutBtn.disabled = !isSignedIn;
  usernameInput.disabled = isSignedIn;
  passwordInput.disabled = isSignedIn;
  statusBar.textContent = isSignedIn
    ? `Status: Signed in as ${username}`
    : "Status: Signed out";
}

function showMessage(text, type = "error") {
  messageEl.textContent = text;
  messageEl.className = `message ${type === "success" ? "success" : ""}`.trim();
}

// Toggle password visibility.
togglePasswordBtn.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePasswordBtn.textContent = isHidden ? "Hide" : "Show";
});

// Handle sign in.
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    showMessage("Please enter both username and password.");
    return;
  }

  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    showMessage(`Welcome, ${username}!`, "success");
    setSignedInState(true, username);
  } else {
    showMessage("Invalid username or password.");
    setSignedInState(false);
  }
});

// Handle sign out.
signOutBtn.addEventListener("click", () => {
  setSignedInState(false);
  showMessage("You have been signed out.", "success");
  loginForm.reset();
  passwordInput.type = "password";
  togglePasswordBtn.textContent = "Show";
});
