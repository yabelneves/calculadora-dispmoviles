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
        // Evita múltiples ceros iniciales (excepto si hay un punto)
        if (valor === "0" && entradaActual === "0") {
            return;
        }

        // Reemplaza un cero inicial por otro número (excepto si es un punto)
        if (entradaActual === "0" && valor !== ".") {
            entradaActual = valor;
        }
        // Evita más de un punto decimal
        else if (valor === "." && entradaActual.includes(".")) {
            return;
        }
        else {
            entradaActual += valor;
        }

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
        let a = parseFloat(entradaPrevia);
        let b = parseFloat(entradaActual);

        if (operador === "+") resultado = a + b;
        if (operador === "-") resultado = a - b;
        if (operador === "×") resultado = a * b;
        if (operador === "÷") resultado = b !== 0 ? a / b : "Error";

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
            } else if (valor === "AC") {
                limpiarCalculadora();
            } else if (valor === "=") {
                manejarIgual();
            } else {
                manejarOperador(valor);
            }
        });
    });
});