//permitir que la consola lea lo que se escribe en terminal
const readline = require("readline/promises");

//preparamos la comunicacion entre el programa y la consola
const rl=readline.createInterface({
    input:process.stdin, output:process.stdout
})

// productos a manejar en el programa
let productos =[
    {
     id:1
     ,nombre:"Hamburguesa"
     ,precio:80   
    },

    {
     id:2
     ,nombre:"Pizza"
     ,precio:120   
    },

    {
     id:3
     ,nombre:"Refresco"
     ,precio:30   
    }
]

let pedidos = [];

menu();

// funciones a utilizar en el programa
function mostrarMenu(){
    console.log("MENÚ PRINCIPAL");
    console.log("1. Cosultar los productos");
    console.log("2. Crear un pedido");
    console.log("3. Listar los pedidos");
    console.log("4. Salir del programa");
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
        console.log("Pedido Creado");
        console.log("Producto:", producto.nombre);
        console.log("Cantidad:", cantidad);
        console.log("Total: $", pedido.total);
    } else {
        console.log("Producto no encontrado.");
    }
}

function listarPedidos() {
    console.log("=== PEDIDOS ===");
    pedidos.forEach(function(pedido) {
        console.log(
            `${pedido.producto} x${pedido.cantidad} = $${pedido.total}`
        );
    });
}

async function menu() {
    let opcion;

    do {

        mostrarMenu();
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
            console.log("Gracias por utilizar el sistema.");
        }

        else {
            console.log("Opción no válida.");
        }

    } while (opcion != "4");

    rl.close();
}