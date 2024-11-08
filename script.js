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
    $.each(products, function(index, product) {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        $('#product-list').append(productCard);
    });
}

// Function to update cart display
function updateCartDisplay() {
    $('#cart-items').empty(); // Clear previous cart items

    let total = 0;
    $.each(cart, function(index, item) {
        const cartItemElement = `
            <div class="d-flex justify-content-between">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        $('#cart-items').append(cartItemElement);
        total += item.price * item.quantity;
    });

    $('#cart-total').text(`Total: $${total.toFixed(2)}`);
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity : 1 });
    }

    updateCartDisplay();
}

// Event listener for adding products to cart
$(document).ready(function() {
    displayProducts();

    $(document).on('click', '.add-to-cart', function() {
        const productId = $(this).data('id');
        addToCart(productId);
    });

    $('#proceed-to-payment').on('click', function() {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        window.location.href = `payment.html?total=${total}`;
    });
});
