// script.js

// 1. Function to add items to the cart (Used on Catalogue Page)
function addToCart(bookName, price) {
    // Get existing cart or create empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add new product
    cart.push({ name: bookName, price: price });
    
    // Save back to storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(bookName + " added to cart!");
    updateCartCount(); // Optional: update counter immediately
}

// 2. Function to display items (Used on Cart Page)
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let tableBody = document.getElementById('cart-body');
    let totalSpan = document.getElementById('total-price');
    
    // Clear current list
    if(tableBody) {
        tableBody.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            let row = `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>1</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><button onclick="removeFromCart(${index})" style="background-color: #c0392b; width:auto; padding:5px 10px;">Remove</button></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        // Update Grand Total
        if(totalSpan) totalSpan.innerText = "$" + total.toFixed(2);
    }
}

// 3. Function to remove item (Used on Cart Page)
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Refresh the table
}

// 4. Run loadCart when page finishes loading
window.onload = function() {
    // If we are on the cart page, load the table
    if(document.getElementById('cart-body')) {
        loadCart();
    }
};
