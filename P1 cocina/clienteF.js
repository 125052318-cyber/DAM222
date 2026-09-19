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

