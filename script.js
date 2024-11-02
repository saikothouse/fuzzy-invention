// Sample product data with images
const products = [
    { id: 1, name: 'Product 1', price: 10.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 5.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 15.49, image: 'https://via.placeholder.com/150' },
];

// Initialize cart
let cart = [];

// Function to display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 mb-4';
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Function to update cart display
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = ''; // Clear previous cart items

    let total = 0;
    cart.forEach((item) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'd-flex justify-content-between';
        cartItemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsElement.appendChild(cartItemElement);

        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
    return total; // Return the total for further use
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find (p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
}

// Event listener for add to cart buttons
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            addToCart(button.dataset.id);
        });
    });

    document.getElementById('proceed-to-payment').addEventListener('click', () => {
        const total = updateCartDisplay(); // Calculate and get the total

        // Redirect to payment page with total amount
        window.location.href = `payment.html?total=${total.toFixed(2)}`;
    });
});
