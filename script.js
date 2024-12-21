const display = document.querySelector(".display")
const buttons = document.querySelectorAll("button")
const clearButton = document.querySelector("#clear")

let currentInput = ""
let previousInput = ""
let operator = ""
let resultCalculated = false

function updateDisplay(){
    display.textContent = previousInput + (operator ? ` ${operator} ` : '') + currentInput || "Resultado";
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value")

        
        if(value >= "0" && value <= "9") {
            if (resultCalculated) {
                currentInput = value;
                resultCalculated = false;
            } else {
                currentInput += value;
            }
            updateDisplay();
        }

        if(value === "."){
            
            if (!currentInput.includes(".")) {
                currentInput += value;
            }
            updateDisplay();
        }

        
        if(value === "+" || value === "-" || value === "*" || value === "/"){
            if(currentInput === "" && previousInput === "") return; 
            if (operator && currentInput === "") {
                operator = value; 
            } else {
                if (currentInput !== "") {
                    previousInput = currentInput;
                    currentInput = "";
                }
                operator = value;
            }
            resultCalculated = false;
            updateDisplay();
        }

        
        if(value === "="){
            if(previousInput && currentInput && operator){
                currentInput = operate(previousInput, currentInput, operator);
                previousInput = ""
                operator = ""
                resultCalculated = true;
                updateDisplay();
            }
        }

        
        if(value === "C"){
            currentInput = ""
            previousInput = ""
            operator = ""
            resultCalculated = false
            updateDisplay()
        }

        if(value === "backspace"){
            currentInput = currentInput.slice(0, -1); 
            updateDisplay();
        }
    })
})


document.addEventListener('keydown', (e) => {
    const key = e.key;
    if((key >= "0" && key <= "9") || key === "." || key === "+" || key === "-" || key === "*" || key === "/") {
        document.querySelector(`[data-value="${key}"]`)?.click();
    }
    if(key === "Enter") {
        document.querySelector('[data-value="="]')?.click();
    }
    if(key === "Backspace") {
        document.querySelector('[data-value="backspace"]')?.click();
    }
    if(key === "Escape") {
        document.querySelector('[data-value="C"]')?.click();
    }
});

function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);

    let result;
    switch(op) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = b !== 0 ? a / b : 'Erro';
            break;
        default:
            result = '';
            break;
    }

    if (typeof result === 'number') {
        result = parseFloat(result.toFixed(2)); 
    }

    return result;
}
