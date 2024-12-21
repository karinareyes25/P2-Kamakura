// Importamos el carrito desde cart.js
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

// Función para mostrar el recibo dentro del contenedor del carrito
function renderReceipt() {
    const productsContainer = document.getElementById('products-container');
    const receiptContainer = document.getElementById('receipt-container');
    const receiptProductContainer = document.getElementById('receipt-product');
    const receiptTotal = document.getElementById('receipt-total');

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

    // Actualizamos el total del recibo
    receiptTotal.textContent = `Total: ${total} €`;

    // Ocultamos el contenedor del carrito y mostramos el recibo
    productsContainer.style.display = 'none';  // Ocultamos todo el contenedor del carrito
    receiptContainer.style.display = 'flex';  // Mostramos el recibo

    console.log('El recibo se muestra en lugar del carrito dentro del desplegable.');
}

// Función para ocultar el recibo y devolver el carrito
function closeReceipt() {
    const productsContainer = document.getElementById('products-container');
    const receiptContainer = document.getElementById('receipt-container');

    if (!productsContainer || !receiptContainer) {
        console.error('No se encontraron todos los elementos.');
        return;
    }

    // Mostramos el carrito y ocultamos el recibo
    productsContainer.style.display = 'flex';  // Mostramos el contenedor del carrito
    receiptContainer.style.display = 'none';  // Ocultamos el recibo

    console.log('El recibo está oculto, el carrito vuelve a mostrarse dentro del desplegable.');
}

// Configuramos los controladores de eventos
function setupReceiptListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        const proceedPayButton = document.getElementById('proceedPay-button');
        const closeReceiptButton = document.getElementById('close-receipt');

        // Al hacer clic en "Proceder al pago", mostramos el recibo dentro del carrito
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

// Agregar el evento para el botón "Pagar"
const payButton = document.getElementById('pay-button');
if (payButton) {
    payButton.addEventListener('click', () => {
        // Primero, ocultamos el recibo y cualquier otro elemento relacionado
        const receiptContainer = document.getElementById('receipt-container');
        if (receiptContainer) {
            receiptContainer.style.display = 'none'; // Ocultamos el recibo cuando se hace el pago
        }
        // Ahora, mostramos el mensaje de confirmación como un modal
const modal = document.createElement('div');
modal.classList.add('confirmation-modal');

// Contenido del mensaje
modal.innerHTML = `
    <div class="confirmation-modal-content">
        <h3>Gracias por tu compra</h3>
        <p>¡Pedido realizado con éxito, gracias por comprar en Kamakura Food!</p>
        <img src="./assets/img/logo.svg" alt="Logo" class="modal-logo"> <!-- Aquí agregas la imagen -->
        <button class="close-button" id="close-modal"><img src="./assets/img/close.svg" alt="close"></button> <!-- Cambié el id a "close-modal" para mayor claridad -->
    </div>
`;

// Agregamos el modal al body o al contenedor principal
const body = document.querySelector('body');
if (body) {
    body.appendChild(modal);
}

// Agregar el evento para cerrar el modal
const closeModalButton = document.getElementById('close-modal');
if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        // Ocultamos el modal
        modal.style.display = 'none';
        // Recargamos la página
        location.reload();
    });
}


        
    });
}





// Inicialización
setupReceiptListeners();
