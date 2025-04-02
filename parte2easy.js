document.addEventListener("DOMContentLoaded", () => {
    // Selecciona el display y todos los botones de la calculadora, const: constante, no se puede reasignar
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll("button");
    
    // Variables para almacenar la entrada actual, la entrada previa y el operador, let: variable, se puede reasignar
    let currentInput = "";
    let previousInput = "";
    let operator = "";
    
    // Función para actualizar el display, muestra el valor en pantalla.
    function updateDisplay(value) {
        display.value = value;
    }
    
    // Función para limpiar la calculadora
    function clearCalculator() {
        currentInput = "";
        previousInput = "";
        operator = "";
        updateDisplay("");
    }
    
    // Función para cambiar el signo del número actual
    function toggleSign() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay(currentInput);
        }
    }
    
    // Función para calcular el porcentaje
    function calculatePercentage() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay(currentInput);
        }
    }
    
    // Función para manejar operadores matemáticos
    function handleOperator(value) {
        if (currentInput) {
            if (previousInput) {
                previousInput = performCalculation();
            } else {
                previousInput = currentInput;
            }
            operator = value;
            currentInput = "";
        }
    }
    
    // Función para realizar cálculos
    function performCalculation() {
        let result = 0;
        let a = parseFloat(previousInput);
        let b = parseFloat(currentInput);
        
        switch (operator) {
            case "+": result = a + b; break;
            case "-": result = a - b; break;
            case "×": result = a * b; break;
            case "÷": result = (b !== 0) ? a / b : "Error"; break;
            // Condición (b !== 0) → Verifica si b (el divisor) es diferente de 0.
            // Si b es distinto de 0 (true), entonces ejecuta a / b (realiza la división).
            // Si b es 0 (false), devuelve "Error" para evitar una operación inválida.
            default: result = b;
        }
        
        updateDisplay(result.toString());
        return result.toString();
    }
    
    // Función para manejar la entrada de números
    function handleNumber(value) {
        currentInput += value;
        updateDisplay(currentInput);
    }
    
    // Función para manejar el botón igual "="
    function handleEquals() {
        if (previousInput && operator && currentInput) {
            currentInput = performCalculation();
            previousInput = "";
            operator = "";
        }
    }
    
    // Agrega eventos a los botones
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;
            
            if (!isNaN(value) || value === ".") {
                handleNumber(value);
            } else if (value === "AC") {
                clearCalculator();
            } else if (value === "+/-") {
                toggleSign();
            } else if (value === "%") {
                calculatePercentage();
            } else if (value === "=") {
                handleEquals();
            } else {
                handleOperator(value);
            }
        });
    });
});
