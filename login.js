// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTSLCQxp4-rD3ytKLFUjy-6X55AUlNqJE",
  authDomain: "lostandfound-35424.firebaseapp.com",
  projectId: "lostandfound-35424",
  storageBucket: "lostandfound-35424.firebasestorage.app",
  messagingSenderId: "299544245940",
  appId: "1:299544245940:web:891d849619ddf7eaed49e1",
  measurementId: "G-J65P476319"
};// Initially show Register Box
document.getElementById("loginBox").style.display = "none";

// Switch to Login
function showLogin() {
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

// Switch to Register
function showRegister() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
}

// REGISTER FUNCTION
function register() {
    let username = document.getElementById("regUsername").value.trim();
    let password = document.getElementById("regPassword").value.trim();
    let message = document.getElementById("regMessage");

    if (username === "" || password === "") {
        message.innerText = "Please fill all fields!";
        message.style.color = "red";
        return;
    }

    if (localStorage.getItem(username)) {
        message.innerText = "User already exists!";
        message.style.color = "red";
    } else {
        localStorage.setItem(username, password);
        message.innerText = "Registration successful!";
        message.style.color = "green";

        setTimeout(function () {
            showLogin();
            document.getElementById("loginUsername").value = username;
            document.getElementById("regUsername").value = "";
            document.getElementById("regPassword").value = "";
            message.innerText = "";
        }, 1000);
    }
}

// LOGIN FUNCTION
function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let message = document.getElementById("loginMessage");

    if (username === "" || password === "") {
        message.innerText = "Please fill all fields!";
        message.style.color = "red";
        return;
    }

    let storedPassword = localStorage.getItem(username);

    if (storedPassword === null) {
        message.innerText = "User not found!";
        message.style.color = "red";
    } 
    else if (storedPassword === password) {
        message.innerText = "Login successful!";
        message.style.color = "green";
        // Redirect to portal
        setTimeout(() => {
            window.location = "portal.html";  // <-- Add this line
        }, 500);
    } 
    else {
        message.innerText = "Incorrect password!";
        message.style.color = "red";
    }
}
