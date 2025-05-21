
//console.log('test products.js');

const productsContainer = document.getElementById('products-container');

// Exemple de données produits (dans une application réelle, cela proviendrait d’un serveur)
let loadedProducts = [];

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    
    // data-index : position de l'article dans le panier
    card.innerHTML = `
        <a href="../content/product-details.html?id=${product.id}" class="product-image-container">
            <img src="../${product.image}" alt="${product.name}" class="product-image">
        </a>
        <h3 class="product-name">
            <a href="../content/product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <p class="description">${product.title}</p>
        <p class="price">$${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    
    return card;
}


function loadAllProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const card = createProductCard(product);
        productsContainer.appendChild(card);
    });
}

const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');

const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');

if (categoryParam) {
    categoryFilter.value = categoryParam;
}

function filterAndSortProducts() {
    if (!productsContainer) {
        console.error('Products container not found');
        return;
    }

    const selectedCategory = categoryFilter.value;
    const sortValue = sortBy.value;
    
    let filteredProducts = loadedProducts;
    
    if (selectedCategory !== 'all') {
        filteredProducts = loadedProducts.filter(product => product.category === selectedCategory);
    }
    
    filteredProducts.sort((a, b) => {
        switch (sortValue) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            default:
                return 0;
        }
    });
    
    productsContainer.innerHTML = '';
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products found in this category.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productsContainer.appendChild(card);
    });
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', filterAndSortProducts);
}
if (sortBy) {
    sortBy.addEventListener('change', filterAndSortProducts);
}

fetch('../data/products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        loadedProducts = data;
        filterAndSortProducts();
    })
    .catch(error => {
        console.error('Error loading products:', error);
        productsContainer.innerHTML = '<p class="error-message">Error loading products. Please try again later.</p>';
    });


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id);
        const product = loadedProducts.find(p => p.id === productId);
        if (product) {

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            const existingItemIndex = cart.findIndex(item => item.id === product.id);
            
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {

                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            // Sauvegarder dans local storage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
            }
    
            showAddToCartMessage();
        }
    }
});