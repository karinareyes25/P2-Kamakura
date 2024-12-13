//DEBE buscar los productos por los filtros
import { filters, products } from '../assets/data/data.js';


// Esta función se encargará de filtrar los productos según la categoría seleccionada
function filterProductsByCategory(category) {
    let filterProducts = [];

    // Verificamos si la categoría seleccionada está entre las opciones específicas
    if (['ramen', 'sushi', 'entradas', 'postres'].includes(category)) {
        // Filtramos los productos según la categoría seleccionada
        filterProducts = products.filter(product => product.category === category);
    } else {
        // Si no es una categoría válida, mostramos todos los productos
        filterProducts = products;
    }

    return filterProducts; // Devolvemos los productos filtrados
}

// Esta función se encargará de actualizar la vista con los productos filtrados
function loadFilterProducts(category) {
    const productsToLoad = filterProductsByCategory(category); // Obtenemos los productos filtrados

    const productsContainer = document.getElementById('products'); // Contenedor de los productos

    // Limpiamos el contenedor de productos antes de renderizar
    productsContainer.innerHTML = '';

    // Renderizamos los productos filtrados
    productsToLoad.forEach(product => {
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


// Esta función se encarga de renderizar los filtros en el HTML
export function load() {
    const filtersContainer = document.getElementById('filters'); // Contenedor de los filtros

    // Limpiar el contenedor por si ya tiene contenido
    filtersContainer.innerHTML = '';

    // Crear un botón para cada filtro (categoría)
    filters.forEach(filter => {
        const filterButton = document.createElement('button');
        filterButton.classList.add('filter');
        filterButton.textContent = filter; // El texto del botón será el nombre del filtro
        filterButton.setAttribute('data-category', filter); // Agregar atributo para identificar la categoría

        // Agregar evento click para filtrar los productos
        filterButton.addEventListener('click', () => {
            loadFilterProducts(filter); // Llamar a la función que filtra y renderiza productos
        });

        // Agregar el botón al contenedor
        filtersContainer.appendChild(filterButton);
    });
}


