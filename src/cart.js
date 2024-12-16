//DEBE contener las funcionalidades del carrito de compras.
import { products } from '../assets/data/data.js';
const toggleButton = document.getElementById('cart');

function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = cartContainer.style.display === 'flex' ? 'none' : 'flex';
}
// Evento para mostrar/ocultar el carrito
toggleButton.addEventListener('click', toggleCart);

/*
 * Función para añadir un producto al carrito.
 * @param {number} productId - El ID del producto a añadir.
 */
let cart = []; // Array para almacenar los productos en el carrito

/**
 * Función para renderizar el carrito en el DOM.
 */
function renderCart() {
    const cartProductsContainer = document.getElementById('cart-products');
    const cartTotal = document.getElementById('cart-total');

    // Limpiar el contenido del carrito
    cartProductsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartProductsContainer.innerHTML = '<h3>Añade un plato a tu menú</h3>';
        cartTotal.textContent = 'Total: 0 €';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        // Crear un elemento de producto en el carrito
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-container');
        cartItem.innerHTML = `
            <button class="close-button" data-id="${item.id}">
                <img src="./assets/img/close.svg" alt="close">
            </button>
            <div class="text-container">
                <h3>${item.name}</h3>
                <h5>${item.price} €</h5>
            </div>
            <div class="quantity-container">
                <button class="cart-add" data-id="${item.id}">+</button>
                <p class="quantity">${item.quantity}</p>
                <button class="cart-remove" data-id="${item.id}">-</button>
            </div>
        `;

        cartProductsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: ${total.toFixed(2)} €`;
}


function addToCart(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;

    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

/*
 * Función para eliminar completamente un producto del carrito.
 * @param {number} productId - El ID del producto a eliminar.
 */
function deleteFromCart(productId) {
    cart = cart.filter(item => item.id !== parseInt(productId));
    renderCart();
}

function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.id === parseInt(productId));
    if (cartItemIndex !== -1) {
        if (cart[cartItemIndex].quantity > 1) {
            cart[cartItemIndex].quantity--;
        } else {
            cart.splice(cartItemIndex, 1);
        }
    }

    renderCart();
}

 // Evento para añadir productos desde la lista de productos
 const productsContainer = document.getElementById('products');
 productsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-button')) {
        const productId = e.target.getAttribute('data-id');
        addToCart(productId);
    }
});

// Eventos para modificar productos directamente en el carrito
const cartProductsContainer = document.getElementById('cart-products');
cartProductsContainer.addEventListener('click', (e) => {
    const productId = e.target.getAttribute('data-id');
    if (e.target.classList.contains('cart-add')) {
        addToCart(productId);
    } else if (e.target.classList.contains('cart-remove')) {
        removeFromCart(productId);
    } else if (e.target.classList.contains('close-button')) {
        deleteFromCart(productId);
    }
});

