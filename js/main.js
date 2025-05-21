// Menu pour mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.querySelector('.cart-count');

//console.log(cart)

updateCartCount();

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Validation newsletter
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterError = document.getElementById('newsletter-error');
const newsletterSuccess = document.getElementById('newsletter-success');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// erreur si newsletter = null
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!emailRegex.test(newsletterEmail.value)) {
        newsletterSuccess.textContent = '';
        newsletterError.textContent = 'Please enter a valid email address';
        return;
    }
    
    newsletterError.textContent = '';
    newsletterEmail.value = '';
    newsletterSuccess.textContent = 'Thank you for subscribing to our newsletter!';
});


const featuredProducts = document.getElementById('featured-products');

let products = [];

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.innerHTML = `
        <a href="../content/product-details.html?id=${product.id}"><img src="${product.image}" alt="${product.name}" class="product-image"></a>
        <h3 class="product-name">
            <a href="../content/product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <p class="description">${product.title}</p>
        <p class="price">$${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    
    return card;
}

function loadFeaturedProducts() {
    const featuredProducts = document.getElementById('featured-products');
    featuredProducts.innerHTML = '';
    products.forEach(product => {
        const card = createProductCard(product);
        featuredProducts.appendChild(card);
    });
}

fetch('data/featured.json')
    .then(res => res.json())
    .then(data => {
        products = data;
        loadFeaturedProducts();
    })
    .catch(err => console.error('Error loading products:', err));


function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
        cartCount.textContent = totalItems;
    }
    

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
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
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
        showAddToCartMessage()
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    updateCartCount();
});

// Smooth scrolling pour les liens d’ancrage

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


function showAddToCartMessage() {
    const message = document.createElement('div');
    message.className = 'add-to-cart-message';
    message.textContent = 'Added to cart!';
    
    document.body.appendChild(message);
    
    // attend 2 secondes avant de supprimer le message
    setTimeout(() => {
        message.remove();
    }, 2000);
} 
