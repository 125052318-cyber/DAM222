// permitir que la consola lea lo que se escribe en terminal
const readline = require("readline/promises");

// preparamos la comunicacion entre el programa y la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// productos a manejar en el programa
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
    }
];

// pedidos realizados
let pedidos = [];

// total de todos los pedidos
let totalAcumulado = 0;

menu();

// funciones a utilizar en el programa


function mostrarMenu() {

    console.log("");
    console.log("================================");
    console.log("         CAFETERIA ");
    console.log("================================");
    console.log("1. Cliente");
    console.log("2. Cocina");
    console.log("3. Caja");
    console.log("4. Salir del programa");
    console.log("================================");
    console.log("");
}


function menuCliente() {

    console.log("");
    console.log("=== MENU CLIENTE ===");
    console.log("1. Consultar los productos");
    console.log("2. Crear un pedido");
    console.log("3. Listar los pedidos");
    console.log("4. Regresar");
    console.log("");
}


function consultarProductos() {

    console.log("");
    console.log("=== PRODUCTOS ===");

    productos.forEach(function(producto) {

        console.log(
            `${producto.id}. ${producto.nombre} - $${producto.precio}`
        );

    });
}


async function crearPedido() {

    consultarProductos();

    let id = await rl.question("\nEscribe el ID del producto: ");
    let cantidad = await rl.question("Escribe la cantidad: ");

    let producto = productos.find(function(producto) {
        return producto.id == id;
    });

    if (producto) {

        let pedido = {
            producto: producto.nombre,
            cantidad: Number(cantidad),
            total: producto.precio * Number(cantidad)
        };

        pedidos.push(pedido);

        totalAcumulado += pedido.total;

        console.log("");
        console.log("Pedido Creado");
        console.log("Producto:", producto.nombre);
        console.log("Cantidad:", cantidad);
        console.log("Total: $", pedido.total);

    } else {

        console.log("Producto no encontrado.");

    }
}

function listarPedidos() {

    console.log("");
    console.log("=== PEDIDOS ===");

    if (pedidos.length == 0) {

        console.log("No hay pedidos registrados.");

    } else {

        pedidos.forEach(function(pedido) {

            console.log(
                `${pedido.producto} x${pedido.cantidad} = $${pedido.total}`
            );

        });
    }
}

function menuCocina() {

    console.log("");
    console.log("=== MENU COCINA ===");
    console.log("1. Agregar producto");
    console.log("2. Editar producto");
    console.log("3. Eliminar producto");
    console.log("4. Listar productos");
    console.log("5. Regresar");
    console.log("");
}


async function agregarProducto() {

    let nombre = await rl.question("Escribe el nombre del producto: ");
    let precio = await rl.question("Escribe el precio del producto: ");

    let producto = {
        id: productos.length + 1,
        nombre: nombre,
        precio: Number(precio)
    };

    productos.push(producto);

    console.log("Producto agregado.");
}


async function editarProducto() {

    consultarProductos();

    let id = await rl.question("\nEscribe el ID del producto a editar: ");

    let producto = productos.find(function(producto) {
        return producto.id == id;
    });

    if (producto) {

        let nombre = await rl.question("Escribe el nuevo nombre: ");
        let precio = await rl.question("Escribe el nuevo precio: ");

        producto.nombre = nombre;
        producto.precio = Number(precio);

        console.log("Producto editado.");

    } else {

        console.log("Producto no encontrado.");

    }
}


async function eliminarProducto() {

    consultarProductos();

    let id = await rl.question("\nEscribe el ID del producto a eliminar: ");

    let posicion = productos.findIndex(function(producto) {
        return producto.id == id;
    });

    if (posicion != -1) {

        productos.splice(posicion, 1);

        console.log("Producto eliminado.");

    } else {

        console.log("Producto no encontrado.");

    }
}


function menuCaja() {

    console.log("");
    console.log("=== MENU CAJA ===");
    console.log("1. Listar pedidos");
    console.log("2. Ver total acumulado");
    console.log("3. Regresar");
    console.log("");
}


function verTotalAcumulado() {

    console.log("");
    console.log("=== TOTAL ACUMULADO ===");
    console.log("Total acumulado: $", totalAcumulado);

}


async function cliente() {

    let opcion;

    do {

        menuCliente();

        opcion = await rl.question("Elige una opción: ");

        if (opcion == "1") {

            consultarProductos();

        }

        else if (opcion == "2") {

            await crearPedido();

        }

        else if (opcion == "3") {

            listarPedidos();

        }

        else if (opcion == "4") {

            console.log("Regresando al menú principal.");

        }

        else {

            console.log("Opción no válida.");

        }

    } while (opcion != "4");
}


async function cocina() {

    let opcion;

    do {

        menuCocina();

        opcion = await rl.question("Elige una opción: ");

        if (opcion == "1") {

            await agregarProducto();

        }

        else if (opcion == "2") {

            await editarProducto();

        }

        else if (opcion == "3") {

            await eliminarProducto();

        }

        else if (opcion == "4") {

            consultarProductos();

        }

        else if (opcion == "5") {

            console.log("Regresando al menú principal.");

        }

        else {

            console.log("Opción no válida.");

        }

    } while (opcion != "5");
}


async function caja() {

    let opcion;

    do {

        menuCaja();

        opcion = await rl.question("Elige una opción: ");

        if (opcion == "1") {

            listarPedidos();

        }

        else if (opcion == "2") {

            verTotalAcumulado();

        }

        else if (opcion == "3") {

            console.log("Regresando al menú principal.");

        }

        else {

            console.log("Opción no válida.");

        }

    } while (opcion != "3");
}


async function menu() {

    let opcion;

    do {

        mostrarMenu();

        opcion = await rl.question("Elige una opción: ");

        if (opcion == "1") {

            await cliente();

        }

        else if (opcion == "2") {

            await cocina();

        }

        else if (opcion == "3") {

            await caja();

        }

        else if (opcion == "4") {

            console.log("");
            console.log("Gracias por utilizar el sistema.");

        }

        else {

            console.log("Opción no válida.");

        }

    } while (opcion != "4");

    rl.close();
}