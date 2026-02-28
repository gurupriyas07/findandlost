// Auto login check
window.onload = function() {
  if(localStorage.getItem("loggedInUser")){
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
    loadItems();
  } else {
    alert("Invalid Credentials");
  }
}

function showApp() {
  // Dashboard view display
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

function addItem() {
  let title = document.getElementById("itemName").value;
  let description = document.getElementById("itemDesc").value;
  let location = document.getElementById("itemLocation").value;
  let imageFile = document.getElementById("itemImage").files[0];

  if(!title || !description || !location){
    alert("Fill all fields");
    return;
  }

  let reader = new FileReader();

  reader.onload = function() {
    let imageData = reader.result;

    let item = {
      title: title,
      description: description,
      location: location,
      image: imageData
    };

    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    clearForm();
    loadItems();
  };

  if(imageFile){
    reader.readAsDataURL(imageFile);
  } else {
    // No image file, just create the item
    let item = {
      title: title,
      description: description,
      location: location,
      image: null
    };

    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    clearForm();
    loadItems();
  }
}

function clearForm() {
  document.getElementById("itemName").value = "";
  document.getElementById("itemDesc").value = "";
  document.getElementById("itemLocation").value = "";
  document.getElementById("itemImage").value = "";
  let preview = document.getElementById("preview");
  if(preview) preview.style.display = "none";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

function previewImage() {
  const fileInput = document.getElementById("itemImage");
  const preview = document.getElementById("preview");
  
  if(fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}

function loadItems() {

  let itemList = document.getElementById("itemList");

  if(!itemList) return;
  
  itemList.innerHTML = "";

  let items = JSON.parse(localStorage.getItem("items")) || [];

  items.forEach((item, index) => {

    let div = document.createElement("li");
    div.className = "item";

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Location:</strong> ${item.location}</p>
      <p>${item.description}</p>
      ${item.image ? `<img src="${item.image}" style="max-width:100px;">` : ""}
      <button onclick="deleteItem(${index})">Delete</button>
    `;

    itemList.appendChild(div);
  });
}

function deleteItem(index) {
  let items = JSON.parse(localStorage.getItem("items")) || [];
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  loadItems();
}