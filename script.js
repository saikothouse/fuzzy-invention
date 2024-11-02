let cart = [];

document.addEventListener("DOMContentLoaded", function() {
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-btn");
    const toggleCartButton = document.getElementById("toggle-cart");
    const cartCountElement = document.getElementById("cart-count");

    toggleCartButton.addEventListener("click", function() {
        cartSidebar.classList.toggle("open");
    });

    document.querySelectorAll(".add-to-cart").forEach(function(button) {
        button.addEventListener("click", function() {
            const productId = button.dataset.productId;
            const productPrice = button.dataset.productPrice;

            if (!cart.find(function(item) {
                return item.id === productId;
            })) {
                cart.push({
                    id: productId,
                    price: productPrice,
                    quantity: 1
                });
            } else {
                const existingItem = cart.find(function(item) {
                    return item.id === productId;
                });
                existingItem.quantity++;
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItemsList.innerHTML = "";
        cart.forEach(function(item) {
            const cartItemElement = document.createElement("li");
            cartItemElement.className = "list-group-item";
            cartItemElement.textContent = `Product ${item.id} - $${item.price} x ${item.quantity}`;
            cartItemsList.appendChild(cartItemElement);
        });

        const total = cart.reduce(function(acc, item) {
            return acc + (item.price * item.quantity);
        }, 0);

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        cartCountElement.textContent = `(${cart.length})`;
    }
});
