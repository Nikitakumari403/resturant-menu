let cart = [];

// Add item to cart
function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}


// Update cart
function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                ₹${item.price} × ${item.quantity}
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total;
}


// Remove item
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// Open cart
function openCart() {

    document.getElementById("cartModal").style.display = "flex";

    updateCart();
}


// Close cart
function closeCart() {

    document.getElementById("cartModal").style.display = "none";
}


// Checkout
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your order! 🎉");

    cart = [];

    updateCart();

    closeCart();
}


// Filter menu
function filterMenu(category, button) {

    const cards = document.querySelectorAll(".food-card");

    const buttons = document.querySelectorAll(".category");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}


// Search food
function searchFood() {

    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {

        const foodName =
            card.dataset.name.toLowerCase();

        if (foodName.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}


// Close cart when clicking outside
window.onclick = function(event) {

    const modal = document.getElementById("cartModal");

    if (event.target === modal) {
        closeCart();
    }
};