//DEBE imprimir en pantalla la información de filtros.

//DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.
import { filters, products} from '../assets/data/data.js';
function renderMenu() {
    const productsContainer = document.getElementById('products'); // Contenedor donde se mostrarán los productos

    // Limpiar el contenedor por si ya hay elementos
    productsContainer.innerHTML = '';

    // Recorrer los productos y agregarlos al HTML
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-container');

        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price-container">
                <h5>${product.price} €</h5>
                <button class="add-button" data-id="${product.id}">Añadir</button>
            </div>
        `;
        
        productsContainer.appendChild(productElement); // Agregar el producto al contenedor
    });
}

// Llamar a la función para renderizar el menú
renderMenu();
