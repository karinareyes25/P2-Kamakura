//Intenta separar los eventos en este archivo.
import {loadFilteredProducts} from "./menu.js"
 // Agregar evento click para filtrar los productos
 filterButton.addEventListener('click', () => {
    loadFilteredProducts(filter); // Llamar a la función que filtra y renderiza productos
});
