//DEBE imprimir en pantalla la información de filtros.
function renderFilters() {
    const filtersContainer = document.getElementById('filters'); // Contenedor de los filtros

    // Obtener las categorías únicas de los productos
    const categories = [...new Set(products.map(product => product.category))];

    // Limpiar el contenedor por si ya tiene contenido
    filtersContainer.innerHTML = '';

    // Crear un botón para cada categoría
    categories.forEach(category => {
        const filterButton = document.createElement('button');
        filterButton.classList.add('filter');
        filterButton.textContent = category; // El texto del botón será el nombre de la categoría
        filterButton.setAttribute('data-category', category); // Agregar atributo para identificar la categoría

        // Agregar el botón al contenedor
        filtersContainer.appendChild(filterButton);
    });
}
// Llamar a la función para renderizar el menú
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



// Llamar a la función para renderizar los filtros renderFilters();
renderMenu(); renderFilters();