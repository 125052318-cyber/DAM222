const readline = require("readline/promises");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let productos = [
    { id: 1, 
    nombre: "Hamburguesa",
    precio: 80,
    categoria: "comida" },

    { id: 2,
    nombre: "Pizza",
    precio: 120,
    categoria: "comida" },

    { id: 3,
    nombre: "Refresco",
    precio: 30,
    categoria: "bebida" },

    { id: 4, 
    nombre: "Pastel",
    precio: 60,
    categoria: "postre" },

    { id: 5,
    nombre: "Agua",
    precio: 20,
    categoria: "bebida" },

    { id: 6,
    nombre: "Helado",
    precio: 45,
    categoria: "postre" }
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
            total: producto.precio * Number(cantidad)
        };

        pedidos.push(pedido);

        console.log("");
        console.log("Pedido creado.");
        console.log("Producto:", producto.nombre);
        console.log("Cantidad:", cantidad);
        console.log("Total: $", pedido.total);
    } else {
        console.log("Producto no encontrado.");
    }
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
        });
    }
}

function listarProductos() {
    console.log("");
    console.log(" PRODUCTOS DE COCINA ");

    productos.forEach(function(producto) {
        console.log(
            producto.id + ". " +
            producto.nombre + " : $" +
            producto.precio + " = " +
            producto.categoria
        );
    });
}

function buscarBaratos() {
    console.log("");
    console.log(" PRODUCTOS BARATOS ");

    let baratos = productos.filter(function(producto) {
        return producto.precio <= 60;
    });

    baratos.forEach(function(producto) {
        console.log(producto.nombre + " - $" + producto.precio);
    });
}

function buscarCaros() {
    console.log("");
    console.log(" PRODUCTOS CAROS ");

    let caros = productos.filter(function(producto) {
        return producto.precio > 60;
    });

    caros.forEach(function(producto) {
        console.log(producto.nombre + " - $" + producto.precio);
    });
}

function buscarBebidas() {
    console.log("");
    console.log(" BEBIDAS ");

    let bebidas = productos.filter(function(producto) {
        return producto.categoria == "bebida";
    });

    bebidas.forEach(function(producto) {
        console.log(producto.nombre + " - $" + producto.precio);
    });
}

function buscarPostres() {
    console.log("");
    console.log(" POSTRES ");

    let postres = productos.filter(function(producto) {
        return producto.categoria == "postre";
    });

    postres.forEach(function(producto) {
        console.log(producto.nombre + " - $" + producto.precio);
    });
}

async function buscarProducto() {
    let id = await rl.question("\nEscribe el ID del producto: ");

    let producto = productos.find(function(producto) {
        return producto.id == id;
    });

    if (producto) {
        console.log("");
        console.log("Producto encontrado:");
        console.log("ID:", producto.id);
        console.log("Nombre:", producto.nombre);
        console.log("Precio: $", producto.precio);
        console.log("Categoría:", producto.categoria);
    } else {
        console.log("Producto no encontrado.");
    }
}

function calcularSubtotal() {
    let subtotal = pedidos.reduce(function(acumulador, pedido) {
        return acumulador + pedido.total;
    }, 0);

    return subtotal;
}

function calcularIVA() {
    let subtotal = calcularSubtotal();
    let iva = subtotal * 0.16;

    return iva;
}

function calcularTotal() {
    let subtotal = calcularSubtotal();
    let iva = calcularIVA();

    return subtotal + iva;
}

function mostrarResumen() {
    console.log("");
    console.log(" RESUMEN DE PEDIDOS ");

    if (pedidos.length == 0) {
        console.log("No hay pedidos.");
    } else {
        pedidos.forEach(function(pedido) {
            let { producto, cantidad, total } = pedido;

            console.log(
                producto +
                " x " +
                cantidad +
                " = $ " +
                total
            );
        });

        let subtotal = calcularSubtotal();
        let iva = calcularIVA();
        let total = calcularTotal();

        console.log("");
        console.log("Subtotal: $ ", subtotal);
        console.log("IVA: $ ", iva);
        console.log("Total: $ ", total);
    }
}

async function menuCliente() {
    let opcion;

    do {
        console.log("");
        console.log(" CLIENTE ");
        console.log("1. Mostrar productos");
        console.log("2. Mostrar promociones");
        console.log("3. Crear pedido");
        console.log("4. Listar pedidos");
        console.log("5. Regresar");

        opcion = await rl.question("Elige una opción: ");

        if (opcion == "1") {
            mostrarProductos();
        } else if (opcion == "2") {
            mostrarPromociones();
        }  else if (opcion == "3") {
            await crearPedido();
        } else if (opcion == "4") {
            listarPedidos();
        } else if (opcion == "5") {
            console.log("Regresando... :)");
        } else {
            console.log("Opción no válida.");
        }

    } while (opcion != "5");
}

async function menuCocina() {
    let opcion;

    do {
        console.log("");
        console.log(" COCINA ");
        console.log("1. Mostrar productos");
        console.log("2. Buscar productos baratos");
        console.log("3. Buscar productos caros");
        console.log("4. Buscar bebidas");
        console.log("5. Buscar postres");
        console.log("6. Buscar producto por ID");
        console.log("7. Regresar");

        opcion = await rl.question("Elige una opción: ");

        if (opcion == "1") {
            listarProductos();
        } else if (opcion == "2") {
            buscarBaratos();
        } else if (opcion == "3") {
            buscarCaros();
        } else if (opcion == "4") {
            buscarBebidas();
        } else if (opcion == "5") {
            buscarPostres();
        } else if (opcion == "6") {
            await buscarProducto();
        } else if (opcion == "7") {
            console.log("Regresando...");
        } else {
            console.log("Opción no válida.");
        }

    } while (opcion != "7");
}

async function menuCaja() {
    let opcion;

    do {
        console.log("");
        console.log(" CAJA ");
        console.log("1. Mostrar pedidos");
        console.log("2. Calcular subtotal");
        console.log("3. Calcular IVA");
        console.log("4. Calcular total");
        console.log("5. Mostrar resumen");
        console.log("6. Regresar");

        opcion = await rl.question("Elige una opción: ");

        if (opcion == "1") {
            listarPedidos();
        } else if (opcion == "2") {
            console.log("");
            console.log("Subtotal: $", calcularSubtotal());
        } else if (opcion == "3") {
            console.log("");
            console.log("IVA: $", calcularIVA());
        } else if (opcion == "4") {
            console.log("");
            console.log("Total: $", calcularTotal());
        } else if (opcion == "5") {
            mostrarResumen();
        } else if (opcion == "6") {
            console.log("Regresando... :)");
        } else {
            console.log("Opción no válida.");
        }

    } while (opcion != "6");
}


async function menuPrincipal() {
    let opcion;

    do {
        console.log("");
        console.log(" SISTEMA DE RESTAURANTE ");
        console.log("1. Cliente");
        console.log("2. Cocina");
        console.log("3. Caja");
        console.log("4. Salir");

        opcion = await rl.question("Elige una opción: ");

        if (opcion == "1") {
            await menuCliente();
        } else if (opcion == "2") {
            await menuCocina();
        } else if (opcion == "3") {
            await menuCaja();
        } else if (opcion == "4") {
            console.log("Saliendo del sistema... :)");
        } else {
            console.log("Opción no válida.");
        }

    } while (opcion != "4");

    rl.close();
}

menuPrincipal();