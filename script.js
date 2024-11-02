// Simple cart functionality
let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const productName = product.querySelector('.card-title').innerText;
        const productPrice = product.querySelector('.card-text').innerText;

        cart.push({ name: productName, price: productPrice });
        console.log(cart);
    });
});
