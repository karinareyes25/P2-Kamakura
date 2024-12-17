//DEBE imprimir en pantalla la información de filtros.
import {filters, products} from '../assets/data/data.js';
function loadFilters() {
    const filtersContainer = document.getElementById('filters'); // Contenedor de los filtros

    // Obtener las categorías únicas de los productos
    //const categories = [...new Set(products.map(product => product.category))];

    // Limpiar el contenedor por si ya tiene contenido
    filtersContainer.innerHTML = '';

    // Crear un botón para cada categoría
    filters.forEach(filter=> {
        const filterButton = document.createElement('button');
        filterButton.classList.add('filter');
        filterButton.textContent = filter; // El texto del botón será el nombre de la categoría
        filterButton.setAttribute('data-category', filter); // Agregar atributo para identificar la categoría

        // Agregar evento click para filtrar los productos
        filterButton.addEventListener('click', () => {
            loadFilteredProducts(filter); // Llamar a la función que filtra y renderiza productos
        });

        // Agregar el botón al contenedor
        filtersContainer.appendChild(filterButton);
    });
}
// Llamar a la función para renderizar el menú
//DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.
function loadMenu() {
    const productsContainer = document.getElementById('products'); // Contenedor donde se mostrarán los productos
    // Limpiar el contenedor por si ya hay elementos
    productsContainer.innerHTML = '';
    // Recorrer los productos y agregarlos al HTML
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-container');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price-container">
                <h5>${product.price} €</h5>
                <button class="add-button" data-id="${product.id}">Añadir</button>
            </div>
        `;
        
        productsContainer.appendChild(productDiv); // Agregar el producto al contenedor
    });
}


// Llamar a la función para renderizar los filtros renderFilters();
loadMenu(); loadFilters(); 