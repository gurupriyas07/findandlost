// Show Register first
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
        }, 1000);
    }
}

// LOGIN FUNCTION
function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let message = document.getElementById("loginMessage");

    let storedPassword = localStorage.getItem(username);

    if (storedPassword === null) {
        message.innerText = "User not found!";
        message.style.color = "red";
    } 
    else if (storedPassword === password) {
        message.innerText = "Login successful!";
        message.style.color = "green";

        // Save logged in user
        localStorage.setItem("loggedInUser", username);

        setTimeout(function(){
            window.location.href = "dashboard.html";
        },1000);
    } 
    else {
        message.innerText = "Incorrect password!";
        message.style.color = "red";
    }
}