/**
 * Unit tests for login-page/script.js.
 *
 * The script attaches event listeners directly to DOM elements when it is
 * loaded, so each test loads a fresh copy of index.html into the jsdom
 * document and re-requires the script (via jest.resetModules) to get a
 * clean set of listeners and state.
 */

const fs = require("fs");
const path = require("path");

const INDEX_HTML_PATH = path.resolve(__dirname, "index.html");

function loadLoginPage() {
  const html = fs.readFileSync(INDEX_HTML_PATH, "utf8");
  document.documentElement.innerHTML = html;
  jest.resetModules();
  require("./script.js");
}

function submitForm() {
  const form = document.getElementById("loginForm");
  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
}

function fillCredentials(username, password) {
  document.getElementById("username").value = username;
  document.getElementById("password").value = password;
}

describe("login page", () => {
  beforeEach(() => {
    loadLoginPage();
  });

  test("shows an error and stays signed out when fields are empty", () => {
    fillCredentials("", "");
    submitForm();

    expect(document.getElementById("message").textContent).toBe(
      "Please enter both username and password."
    );
    expect(document.getElementById("statusBar").textContent).toBe(
      "Status: Signed out"
    );
    expect(document.getElementById("signOutBtn").disabled).toBe(true);
  });

  test("signs in successfully with valid demo credentials", () => {
    fillCredentials("admin", "password123");
    submitForm();

    const message = document.getElementById("message");
    expect(message.textContent).toBe("Welcome, admin!");
    expect(message.className).toContain("success");
    expect(document.getElementById("statusBar").textContent).toBe(
      "Status: Signed in as admin"
    );
    expect(document.getElementById("signInBtn").disabled).toBe(true);
    expect(document.getElementById("signOutBtn").disabled).toBe(false);
    expect(document.getElementById("username").disabled).toBe(true);
    expect(document.getElementById("password").disabled).toBe(true);
  });

  test("rejects invalid credentials and remains signed out", () => {
    fillCredentials("admin", "wrong-password");
    submitForm();

    expect(document.getElementById("message").textContent).toBe(
      "Invalid username or password."
    );
    expect(document.getElementById("statusBar").textContent).toBe(
      "Status: Signed out"
    );
    expect(document.getElementById("signInBtn").disabled).toBe(false);
  });

  test("toggles password visibility when the show/hide button is clicked", () => {
    const passwordInput = document.getElementById("password");
    const toggleBtn = document.getElementById("togglePassword");

    expect(passwordInput.type).toBe("password");
    expect(toggleBtn.textContent).toBe("Show");

    toggleBtn.click();
    expect(passwordInput.type).toBe("text");
    expect(toggleBtn.textContent).toBe("Hide");

    toggleBtn.click();
    expect(passwordInput.type).toBe("password");
    expect(toggleBtn.textContent).toBe("Show");
  });

  test("signs out, clears the form, and resets password visibility", () => {
    fillCredentials("admin", "password123");
    submitForm();

    // Make the password visible before signing out to verify it resets.
    document.getElementById("togglePassword").click();

    document.getElementById("signOutBtn").click();

    expect(document.getElementById("message").textContent).toBe(
      "You have been signed out."
    );
    expect(document.getElementById("statusBar").textContent).toBe(
      "Status: Signed out"
    );
    expect(document.getElementById("signInBtn").disabled).toBe(false);
    expect(document.getElementById("signOutBtn").disabled).toBe(true);
    expect(document.getElementById("username").value).toBe("");
    expect(document.getElementById("password").value).toBe("");
    expect(document.getElementById("password").type).toBe("password");
    expect(document.getElementById("togglePassword").textContent).toBe("Show");
  });
});
