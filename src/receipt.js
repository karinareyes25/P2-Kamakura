//Aquí intenta poner las funcionalidades del recibo
// Aquí intentamos poner las funcionalidades del recibo
// Importamos el carrito
import { cart } from './cart.js';

// Función para calcular los detalles del recibo
function calculateReceiptDetails() {
    let total = 0;
    const receiptDetails = cart.map(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        return {
            name: item.name,
            quantity: item.quantity,
            subtotal: subtotal.toFixed(2),
        };
    });

    return { receiptDetails, total: total.toFixed(2) };
}

// Función para mostrar el recibo
function renderReceipt() {
    const cartContainer = document.getElementById('cart-container');
    const cartContent = document.getElementById('cart-products');
    const receiptContainer = document.getElementById('receipt-container');
    const receiptProductContainer = document.getElementById('receipt-product');
    const receiptTotal = document.getElementById('receipt-total');

    if (!cartContainer || !cartContent || !receiptContainer) {
        console.error('Contenedores no encontrados.');
        return;
    }

    // Si el carrito está vacío, mostramos una advertencia
    if (cart.length === 0) {
        alert('El carrito está vacío. Añade productos para proceder al pago.');
        return;
    }

    // Limpiamos los datos antiguos del recibo
    receiptProductContainer.innerHTML = '';

    const { receiptDetails, total } = calculateReceiptDetails();

    // Agregamos los productos al recibo
    receiptDetails.forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('receipt-product');
        productElement.innerHTML = `
            <h3>${item.name}</h3>
            <div class="receipt-price">
                <p>Cantidad: ${item.quantity}</p>
                <h5>Subtotal: ${item.subtotal} €</h5>
            </div>
        `;
        receiptProductContainer.appendChild(productElement);
    });

    // Actualizamos el total
    receiptTotal.textContent = `Total: ${total} €`;

    // Obtenemos el primer elemento en el carrito para usar su ancho
    const firstCartItem = cartContent.querySelector('.cart-product'); // Suponemos que cada producto en el carrito tiene la clase .cart-product
    if (firstCartItem) {
        // Establecemos el ancho del recibo para que coincida con el ancho del primer elemento del carrito
        receiptContainer.style.width = `${firstCartItem.offsetWidth}px`;
    }

    // Posicionamos el recibo al centro respecto al carrito
    cartContainer.style.position = 'relative'; // Establecemos posicionamiento relativo para el contenedor del carrito

    receiptContainer.style.position = 'absolute'; // Posicionamiento absoluto para el recibo
    receiptContainer.style.top = '0'; // Posicionamos el recibo en la parte superior
    receiptContainer.style.left = '50%'; // Lo centramos horizontalmente
    receiptContainer.style.transform = 'translateX(-50%)'; // Corregimos la posición para que el centro quede en su lugar
    receiptContainer.style.zIndex = '2'; // El recibo estará encima del carrito
    receiptContainer.style.display = 'block'; // Mostramos el recibo

    // Aseguramos la visibilidad del botón "Cerrar recibo"
    const closeReceiptButton = document.getElementById('close-receipt');
    if (closeReceiptButton) {
        closeReceiptButton.style.zIndex = '3'; // El botón estará encima de todos los demás elementos
        closeReceiptButton.style.position = 'absolute'; // Posicionamiento absoluto para el botón
        closeReceiptButton.style.top = '10px'; // Espaciado desde la parte superior
        closeReceiptButton.style.right = '10px'; // Espaciado desde la derecha
    }

    console.log('El recibo se muestra encima del carrito.');
}

// Función para ocultar el recibo y devolver el carrito
function closeReceipt() {
    const cartContainer = document.getElementById('cart-container');
    const receiptContainer = document.getElementById('receipt-container');

    if (!cartContainer || !receiptContainer) {
        console.error('No se encontraron todos los elementos.');
        return;
    }

    // Ocultamos el recibo y mostramos el carrito
    receiptContainer.style.display = 'none'; // Ocultamos el recibo
    cartContainer.style.zIndex = '1'; // Restauramos el carrito a su lugar
    cartContainer.style.position = 'relative'; // Restauramos el posicionamiento relativo para el carrito

    console.log('El recibo está oculto, el carrito vuelve a mostrarse.');
}

// Configuramos los controladores de eventos
function setupReceiptListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        const proceedPayButton = document.getElementById('proceedPay-button');
        const closeReceiptButton = document.getElementById('close-receipt');

        // Al hacer clic en "Proceder al pago", mostramos el recibo
        if (proceedPayButton) {
            proceedPayButton.addEventListener('click', renderReceipt);
        } else {
            console.error('No se encontró el botón "Proceder al pago".');
        }

        // Al hacer clic en "Cerrar recibo", ocultamos el recibo y mostramos el carrito
        if (closeReceiptButton) {
            closeReceiptButton.addEventListener('click', closeReceipt);
        } else {
            console.error('No se encontró el botón "Cerrar recibo".');
        }
    });
}

// Inicialización
setupReceiptListeners();