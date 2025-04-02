document.addEventListener("DOMContentLoaded", function() {
    // Selecciona la pantalla de la calculadora y todos los botones
    const pantalla = document.querySelector(".display");
    const botones = document.querySelectorAll("button");
    
    // Variables para almacenar la entrada actual, la entrada previa y el operador
    let entradaActual = "";
    let entradaPrevia = "";
    let operador = "";

    // Actualiza el valor mostrado en la pantalla
    function actualizarPantalla(valor) {
        pantalla.value = valor;
    }

    // Limpia la calculadora y restablece las variables
    function limpiarCalculadora() {
        entradaActual = "";
        entradaPrevia = "";
        operador = "";
        actualizarPantalla("");
    }

    // Maneja la entrada de números concatenándolos en la pantalla
    function manejarNumero(valor) {
        entradaActual += valor;
        actualizarPantalla(entradaActual);
    }

    // Maneja los operadores matemáticos (+, -, ×, ÷)
    function manejarOperador(valor) {
        if (entradaActual) {
            entradaPrevia = entradaActual;
            operador = valor;
            entradaActual = "";
        }
    }

    // Realiza la operación matemática basada en los valores y el operador
    function realizarCalculo() {
        let resultado = 0;
        // ParseFloat: Convierte una cadena de texto en un número decimal (de punto flotante).
        // Convierte las entradas entradaPrevia y entradaActual a números antes de realizar operaciones matemáticas.
        let a = parseFloat(entradaPrevia);
        let b = parseFloat(entradaActual);

        if (operador === "+") resultado = a + b;
        if (operador === "-") resultado = a - b;
        if (operador === "×") resultado = a * b;
        if (operador === "÷") resultado = b !== 0 ? a / b : "Error"; // Evita la división por cero
        
        actualizarPantalla(resultado);
        return resultado.toString();
    }

    // Maneja el botón de igual (=) para ejecutar la operación
    function manejarIgual() {
        if (entradaPrevia && operador && entradaActual) {
            entradaActual = realizarCalculo();
            entradaPrevia = "";
            operador = "";
        }
    }

    // Agrega eventos de click a los botones para capturar la interacción del usuario
    botones.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const valor = boton.textContent;

            if (!isNaN(valor) || valor === ".") { // Si es un número o un punto decimal
                manejarNumero(valor);
            } else if (valor === "AC") { // Botón de limpiar
                limpiarCalculadora();
            } else if (valor === "=") { // Botón de igual
                manejarIgual();
            } else { // Cualquier otro es un operador
                manejarOperador(valor);
            }
        });
    });
});
