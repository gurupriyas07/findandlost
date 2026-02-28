// Auto login check
window.onload = function() {
  if(localStorage.getItem("loggedInUser")){
    showApp();
    loadItems();
  }
};

function register() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if(user && pass){
    localStorage.setItem("user_" + user, pass);
    alert("Registered Successfully!");
  } else {
    alert("Fill all fields");
  }
}

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let storedPass = localStorage.getItem("user_" + user);

  if(storedPass === pass){
    localStorage.setItem("loggedInUser", user);
    showApp();
    loadItems();
  } else {
    alert("Invalid Credentials");
  }
}

function showApp() {
  document.getElementById("authSection").style.display = "none";
  document.getElementById("appSection").style.display = "block";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

function addItem() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let type = document.getElementById("itemType").value;
  let imageFile = document.getElementById("imageInput").files[0];

  if(!title || !description || !type){
    alert("Fill all fields");
    return;
  }

  let reader = new FileReader();

  reader.onload = function() {
    let imageData = reader.result;

    let item = {
      title: title,
      description: description,
      type: type,
      image: imageData
    };

    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    loadItems();
  };

  if(imageFile){
    reader.readAsDataURL(imageFile);
  }
}

function loadItems() {

  let lostContainer = document.getElementById("lostContainer");
  let foundContainer = document.getElementById("foundContainer");

  lostContainer.innerHTML = "";
  foundContainer.innerHTML = "";

  let items = JSON.parse(localStorage.getItem("items")) || [];

  items.forEach((item, index) => {

    let div = document.createElement("div");
    div.className = "box";

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <strong>${item.type}</strong>
      ${item.image ? `<img src="${item.image}">` : ""}
      <button onclick="deleteItem(${index})">Delete</button>
    `;

    if(item.type === "Lost"){
      lostContainer.appendChild(div);
    } else {
      foundContainer.appendChild(div);
    }
  });
}

function deleteItem(index) {
  let items = JSON.parse(localStorage.getItem("items")) || [];
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  loadItems();
}