
console.log("Hola Node.js");

let edad1 = 19;
let edad2 = 20;

console.log("Edad promedio: ");
console.log((edad1 + edad2) / 2);

/*Medir tiempo de un proceso */
console.time("miProceso");
    for(let i = 0; i < 10000000; i++){
    };
console.timeEnd("miProceso");