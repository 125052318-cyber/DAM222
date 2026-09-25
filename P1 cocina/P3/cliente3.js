const readline = require("readline/promises");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let productos = [
    { 
        id: 1,
        nombre: "Hamburguesa",
        precio: 80,
        categoria: "comida"
    },

    {
        id: 2,
        nombre: "Pizza",
        precio: 120,
        categoria: "comida"
    },

    {
        id: 3,
        nombre: "Refresco",
        precio: 30,
        categoria: "bebida"
    },

    {
        id: 4,
        nombre: "Pastel",
        precio: 60,
        categoria: "postre"
    },

    {
        id: 5,
        nombre: "Agua",
        precio: 20,
        categoria: "bebida"
    },

    {
        id: 6,
        nombre: "Helado",
        precio: 45,
        categoria: "postre"
    }
];

let pedidos = [];

function mostrarProductos() {

    console.log("");
    console.log(" PRODUCTOS DISPONIBLES ");

    let lista = productos.map(function(producto) {
        return `${producto.id}. ${producto.nombre} = $ ${producto.precio}`;
    });

    lista.forEach(function(producto) {
        console.log(producto);
    });
}


function mostrarPromociones() {

    console.log("");
    console.log(" PROMOCIONES ");

    let promociones = productos.map(function(producto) {

        if (producto.precio >= 100) {
            return `${producto.nombre} : 10% de descuento`;
        } else {
            return `${producto.nombre} : Sin promoción`;
        }

    });

    promociones.forEach(function(promocion) {
        console.log(promocion);
    });
}


async function crearPedido() {

    mostrarProductos();

    let id = await rl.question("\nEscribe el ID del producto: ");
    let cantidad = await rl.question("Escribe la cantidad: ");

    let producto = productos.find(function(producto) {
        return producto.id == id;
    });

    if (producto) {

        let pedido = {
            producto: producto.nombre,
            cantidad: Number(cantidad),
            total: producto.precio * Number(cantidad),
            estado: "Recibido"
        };

        pedidos.push(pedido);

        console.log("");
        console.log("Pedido creado.");
        console.log("Producto:", producto.nombre);
        console.log("Cantidad:", cantidad);
        console.log("Total: $", pedido.total);
        console.log("Estado: Pedido recibido.");

        procesarPedido(pedido);

    } else {
        console.log("Producto no encontrado.");
    }
}

// implementacion nueva al código anterior del modulo individual
function procesarPedido(pedido) {

    console.log("");
    console.log("Se esta preparando el pedido...");

    setTimeout(function() {

        pedido.estado = "Preparando";
        console.log("");
        console.log("Estado: Preparando...");

        setTimeout(function() {

            pedido.estado = "Empacando";
            
            console.log("Estado: Empacando...");

            setTimeout(function() {

                let cancelado = Math.random() < 0.3;

                if (cancelado) {

                    pedido.estado = "-- Cancelado --";
                    console.log("Estado: Lo siento el pedido esta cancelado :(");

                } else {

                    pedido.estado = "-- Entregado --";
                    console.log("Estado: Gracias por la espera, pedido entregado :)");

                }

            }, 5000);

        }, 5000);

    }, 5000);
}


function listarPedidos() {

    console.log("");
    console.log(" PEDIDOS ");

    if (pedidos.length == 0) {

        console.log("No hay pedidos.");

    } else {

        pedidos.forEach(function(pedido) {

            console.log(
                `${pedido.producto} x${pedido.cantidad} = $${pedido.total}`
            );

            console.log("Estado:", pedido.estado);

        });

    }
}


async function menu() {

    let opcion;

    do {

        console.log("");
        console.log(" CLIENTE ");
        console.log("1. Mostrar productos");
        console.log("2. Mostrar promociones");
        console.log("3. Crear pedido");
        console.log("4. Listar pedidos");
        console.log("5. Salir");

        opcion = await rl.question("Elige una opción: ");

        if (opcion == "1") {

            mostrarProductos();

        } else if (opcion == "2") {

            mostrarPromociones();

        } else if (opcion == "3") {

            await crearPedido();

        } else if (opcion == "4") {

            listarPedidos();

        } else if (opcion == "5") {

            console.log("Saliendo del modulo Cliente. :)");

        } else {

            console.log("Opción no válida.");

        }

    } while (opcion != "5");

    rl.close();
}

menu();