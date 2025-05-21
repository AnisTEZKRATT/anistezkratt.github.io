

//let cart = JSON.parse(localStorage.getItem('cart')) || [];

//console.log(cart)

const cartItemsContainer = document.getElementById('cartItems');
const emptyCartMessage = document.getElementById('emptyCart');
const subtotalElement = document.getElementById('subtotal');
const shippingElement = document.getElementById('shipping');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutForm = document.getElementById('checkoutForm');
const placeOrderBtn = document.getElementById('placeOrderBtn');

const SHIPPING_RATE = 10;
const TAX_RATE = 0.1; // 10% tax

function init() {
    displayCartItems();
    updateCartSummary();
    setupEventListeners();
}

function displayCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
        return;
    }


    emptyCartMessage.classList.add('hidden');
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <img src="../${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99">
                    <button class="quantity-btn increase">+</button>
                </div>
            </div>
            <button class="remove-item">Remove</button>
        </div>
    `).join('');
}

function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? SHIPPING_RATE : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function setupEventListeners() {
    cartItemsContainer.addEventListener('click', (e) => {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;

        const index = parseInt(cartItem.dataset.index);
        const quantityInput = cartItem.querySelector('.quantity-input');

        if (e.target.classList.contains('decrease')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                quantityInput.value = cart[index].quantity;
                updateCart();
            }
        } else if (e.target.classList.contains('increase')) {
            if (cart[index].quantity < 99) {
                cart[index].quantity++;
                quantityInput.value = cart[index].quantity;
                updateCart();
            }
        } else if (e.target.classList.contains('remove-item')) {
            cart.splice(index, 1);
            updateCart();
        }
    });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const cartItem = e.target.closest('.cart-item');
            const index = parseInt(cartItem.dataset.index);
            const newQuantity = parseInt(e.target.value);

            if (newQuantity >= 1 && newQuantity <= 99) {
                cart[index].quantity = newQuantity;
                updateCart();
            } else {
                e.target.value = cart[index].quantity;
            }
        }
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            showMessage('no-products-message', 'Your cart is empty!');
            return;
        }

        showMessage('paid-message', 'Order placed successfully!');
        cart = [];
        updateCart();
        checkoutForm.reset();
    });

    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
    });

    const expiryDateInput = document.getElementById('expiryDate');
    expiryDateInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
    });
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartSummary();
}

function showMessage(className, textMessage) {
    const message = document.createElement('div');
    message.className = className
    message.textContent = textMessage;
    
    document.body.appendChild(message);
    
    // attend 2 secondes avant de supprimer le message
    setTimeout(() => {
        message.remove();
    }, 2000);
} 


document.addEventListener('DOMContentLoaded', init);


