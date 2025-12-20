let current = "";
let previous = "";
let operation = null;

function updateDisplay() {
    document.getElementById("display").innerText = current || "0";
}

function appendNumber(num) {
    if (num === "." && current.includes(".")) return;
    current += num;
    updateDisplay();
}

function clearDisplay() {
    current = "";
    previous = "";
    operation = null;
    updateDisplay();
}

function invert() {
    if (!current) return;
    current = (parseFloat(current) * -1).toString();
    updateDisplay();
}

function percent() {
    if (!current) return;
    current = (parseFloat(current) / 100).toString();
    updateDisplay();
}

function setOperation(op) {
    if (!current) return;
    if (previous) calculate();
    operation = op;
    previous = current;
    current = "";
}

function calculate() {
    if (!previous || !current || !operation) return;

    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result;

    switch (operation) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = b !== 0 ? a / b : "Error"; break;
    }

    current = result.toString();
    previous = "";
    operation = null;
    updateDisplay();
}
