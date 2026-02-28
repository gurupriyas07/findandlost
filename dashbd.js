// Get current logged-in user
const currentUser = localStorage.getItem("currentUser");

// If no user is logged in, redirect to login page
if (!currentUser) {
    window.location.href = "register.html";
}

// Welcome message
document.getElementById("welcomeMsg").innerText = `Welcome, ${currentUser}!`;

// Retrieve items from localStorage
let items = JSON.parse(localStorage.getItem("lostItems")) || [];

// Function to display items
function renderItems() {
    const container = document.getElementById("itemsContainer");
    container.innerHTML = "";

    // Filter items posted by current user
    const userItems = items.filter(item => item.user === currentUser);

    if(userItems.length === 0) {
        container.innerHTML = "<p>No lost items posted yet.</p>";
        return;
    }

    userItems.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("item-card");
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            ${item.image ? `<img src="${item.image}" alt="Lost Item Image" width="150">` : ""}
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        container.appendChild(div);
    });
}

// Function to delete an item
function deleteItem(index) {
    // Filter items for current user
    const userItems = items.filter(item => item.user === currentUser);
    const itemToDelete = userItems[index];

    // Remove the item from original array
    items = items.filter(i => i !== itemToDelete);

    // Save updated array to localStorage
    localStorage.setItem("lostItems", JSON.stringify(items));

    // Re-render items
    renderItems();
}

// Function to add a new item
function addItem() {
    const name = document.getElementById("itemName").value.trim();
    const description = document.getElementById("itemDesc").value.trim();
    const imageInput = document.getElementById("itemImage");

    if(!name || !description) {
        alert("Please fill all fields!");
        return;
    }

    let imageData = "";
    if(imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageData = e.target.result;
            saveItem(name, description, imageData);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveItem(name, description, "");
    }
}

// Save item function
function saveItem(name, description, imageData) {
    const newItem = {
        user: currentUser,
        name,
        description,
        image: imageData
    };

    items.push(newItem);
    localStorage.setItem("lostItems", JSON.stringify(items));

    // Clear form
    document.getElementById("itemName").value = "";
    document.getElementById("itemDesc").value = "";
    document.getElementById("itemImage").value = "";

    // Refresh items list
    renderItems();
}

// Initialize dashboard
renderItems();