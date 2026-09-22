
const readline = require("readline/promises");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let productos = [
    {
        id: 1,
        nombre: "Hamburguesa",
        precio: 80
    },

    {
        id: 2,
        nombre: "Pizza",
        precio: 120
    },

    {
        id: 3,
        nombre: "Refresco",
        precio: 30
    },

    {
        id: 4,
        nombre: "Pastel",
        precio: 60
    }
];


let pedidos = [];



function mostrarProductos() {

    console.log("");
    console.log("=== PRODUCTOS DISPONIBLES ===");

    let lista = productos.map(function(producto) {

        return `${producto.id}. ${producto.nombre} - $${producto.precio}`;

    });


    // forEach() muestra cada elemento de
    // la lista.

    lista.forEach(function(producto) {

        console.log(producto);

    });
}

