// Se le solicita a IA, como hacer el código utilizando menos líneas y siendo "en teoría" más eficiente

document.addEventListener("DOMContentLoaded", () => {
    // Selecciona el display y todos los botones de la calculadora
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll("button");
    
    // Variables para almacenar la entrada actual, la entrada previa y el operador
    let currentInput = "";
    let previousInput = "";
    let operator = "";
    
    // Agrega un evento de clic a cada botón
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent; // Obtiene el texto del botón clicado
            
            // Si es un número o un punto decimal, lo añade a la entrada actual
            if (!isNaN(value) || value === ".") {
                currentInput += value;
                display.value = currentInput;
            } 
            // Si es "AC", resetea la calculadora
            else if (value === "AC") {
                currentInput = "";
                previousInput = "";
                operator = "";
                display.value = "";
            } 
            // Si es "+/-", cambia el signo del número actual
            else if (value === "+/-") {
                currentInput = (parseFloat(currentInput) * -1).toString();
                display.value = currentInput;
            } 
            // Si es "%", convierte el número actual en su porcentaje
            else if (value === "%") {
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.value = currentInput;
            } 
            // Si es "=", realiza el cálculo si hay una entrada previa y un operador
            else if (value === "=") {
                if (previousInput && operator && currentInput) {
                    currentInput = evaluate(previousInput, currentInput, operator);
                    display.value = currentInput;
                    previousInput = "";
                    operator = "";
                }
            } 
            // Si es un operador matemático (+, -, ×, ÷)
            else {
                if (currentInput) {
                    // Si ya hay una entrada previa, evalúa la operación anterior
                    if (previousInput) {
                        previousInput = evaluate(previousInput, currentInput, operator);
                    } else {
                        previousInput = currentInput;
                    }
                    operator = value;
                    currentInput = "";
                }
            }
        });
    });

    // Función para evaluar la operación matemática entre dos números
    function evaluate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case "+": return (a + b).toString(); // Suma
            case "-": return (a - b).toString(); // Resta
            case "×": return (a * b).toString(); // Multiplicación
            case "÷": return b !== 0 ? (a / b).toString() : "Error"; // División (evita división por 0)
            default: return b.toString();
        }
    }
});
