// Simple cart functionality
let cart = [];

document.querySelectorAll ('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const productName = product.querySelector('.card-title').innerText;
        const productPrice = product.querySelector('.card-text').innerText;

        cart.push({ name: productName, price: productPrice });
        console.log(cart);
    });
});

// Update cart items on cart page
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>1</td>
            <td>${item.price}</td>
            <td><button class="btn btn-danger remove-item">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });

    // Update total
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    document.getElementById('total').innerText = `$${total.toFixed(2)}`;
});

// Remove item from cart
document.addEventListener('click', event => {
    if (event.target.classList.contains('remove-item')) {
        const row = event.target.parentElement.parentElement;
        const productName = row.querySelector('td:first-child').innerText;
        cart = cart.filter(item => item.name !== productName);
        row.remove();

        // Update total
        const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
        document.getElementById('total').innerText = `$${total.toFixed(2)}`;
    }
});
