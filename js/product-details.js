document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('No product ID provided');
        return;
    }

    fetch('../data/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            const product = products.find(p => p.id === parseInt(productId));
            
            if (!product) {
                showError('Product not found');
                return;
            }

            document.title = `${product.name} - HackStore`;

            document.getElementById('productImage').src = `../${product.image}`;
            document.getElementById('productImage').alt = product.name;
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productCategory').textContent = `Category: ${product.category}`;
            document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
            
            document.getElementById('productDescription').textContent = 
                product.description || `The ${product.name} is a powerful tool for ethical hacking and cybersecurity professionals.`;

            initializeQuantitySelector();

            initializeAddToCart(product);
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Failed to load product details');
        });
});

function showError(message) {
    const main = document.querySelector('main');
    main.innerHTML = `
        <div class="error-message">
            <h2>Error</h2>
            <p>${message}</p>
            <a href="products.html" class="back-to-products">Back to Products</a>
        </div>
    `;
}

function initializeQuantitySelector() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');

    decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 10) {
            value = 10;
        }
        quantityInput.value = value;
    });
}

function initializeAddToCart(product) {
    const addToCartBtn = document.getElementById('addToCart');
    
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        

        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex > -1) {

            cart[existingItemIndex].quantity += quantity;
        } else {

            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCount();

        showAddToCartMessage();
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = totalItems;
}

