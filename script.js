/* =================================
   CALCULATOR VARIABLES
================================= */

let currentNumber = "";
let previousNumber = "";

let selectedOperator = null;

let shouldResetDisplay = false;


/* =================================
   DISPLAY
================================= */

function updateDisplay() {

    const display =
        document.getElementById("display");

    display.textContent =
        currentNumber || "0";
}


/* =================================
   ENTER NUMBER
================================= */

function appendNumber(number) {

    if (shouldResetDisplay) {

        currentNumber = "";

        shouldResetDisplay = false;
    }

    currentNumber += number;

    updateDisplay();
}


/* =================================
   DECIMAL
================================= */

function appendDecimal() {

    if (shouldResetDisplay) {

        currentNumber = "";

        shouldResetDisplay = false;
    }

    if (!currentNumber.includes(".")) {

        currentNumber =
            currentNumber === ""
                ? "0."
                : currentNumber + ".";
    }

    updateDisplay();
}


/* =================================
   CHOOSE OPERATOR
================================= */

function chooseOperator(operator) {

    if (currentNumber === "") {
        return;
    }

    if (previousNumber !== "" && selectedOperator !== null) {

        calculate();
    }

    previousNumber = currentNumber;

    selectedOperator = operator;

    shouldResetDisplay = true;

    let symbol = getSymbol(operator);

    document.getElementById("expression").textContent =
        previousNumber + " " + symbol;
}


/* =================================
   GET OPERATOR SYMBOL
================================= */

function getSymbol(operator) {

    if (operator === "+") {
        return "+";
    }

    if (operator === "-") {
        return "−";
    }

    if (operator === "*") {
        return "×";
    }

    if (operator === "/") {
        return "÷";
    }
}


/* =================================
   CALCULATE
================================= */

function calculate() {

    if (
        previousNumber === "" ||
        currentNumber === "" ||
        selectedOperator === null
    ) {
        return;
    }


    let first =
        parseFloat(previousNumber);

    let second =
        parseFloat(currentNumber);

    let result;


    /* Addition */

    if (selectedOperator === "+") {

        result = first + second;
    }


    /* Subtraction */

    else if (selectedOperator === "-") {

        result = first - second;
    }


    /* Multiplication */

    else if (selectedOperator === "*") {

        result = first * second;
    }


    /* Division */

    else if (selectedOperator === "/") {

        if (second === 0) {

            showError(
                "THE REACTION FAILED • DIVISION BY ZERO"
            );

            return;
        }

        result = first / second;
    }


    /* Round very long decimals */

    result =
        Number.isInteger(result)
            ? result
            : parseFloat(result.toFixed(10));


    let symbol =
        getSymbol(selectedOperator);


    /* Show expression */

    document.getElementById("expression").textContent =
        first + " " + symbol + " " + second + " =";


    /* Show result */

    currentNumber = result.toString();

    document.getElementById("display").textContent =
        currentNumber;


    /* Status */

    document.getElementById("status").textContent =
        "✦ TRANSMUTATION COMPLETE";


    previousNumber = "";

    selectedOperator = null;

    shouldResetDisplay = true;
}


/* =================================
   PERCENTAGE
================================= */

function percentage() {

    if (currentNumber === "") {
        return;
    }

    currentNumber =
        (parseFloat(currentNumber) / 100).toString();

    updateDisplay();

    document.getElementById("expression").textContent =
        "PERCENTAGE";
}


/* =================================
   DELETE LAST DIGIT
================================= */

function deleteNumber() {

    if (shouldResetDisplay) {
        return;
    }

    currentNumber =
        currentNumber.slice(0, -1);

    updateDisplay();
}


/* =================================
   CLEAR
================================= */

function clearCalculator() {

    currentNumber = "";

    previousNumber = "";

    selectedOperator = null;

    shouldResetDisplay = false;


    document.getElementById("display").textContent =
        "0";

    document.getElementById("expression").textContent =
        "Ready for calculation...";

    document.getElementById("status").textContent =
        "✦ LABORATORY READY";
}


/* =================================
   ERROR
================================= */

function showError(message) {

    document.getElementById("display").textContent =
        "ERROR";

    document.getElementById("expression").textContent =
        message;

    document.getElementById("status").textContent =
        "⚠ CALCULATION FAILED";

    currentNumber = "";

    previousNumber = "";

    selectedOperator = null;

    shouldResetDisplay = true;
}
/* =================================
   KEYBOARD SUPPORT
================================= */

document.addEventListener("keydown", function (event) {

    const key = event.key;


    // Numbers
    if (key >= "0" && key <= "9") {

        appendNumber(key);
    }


    // Decimal
    else if (key === ".") {

        appendDecimal();
    }


    // Operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        chooseOperator(key);
    }


    // Enter or =
    else if (key === "Enter" || key === "=") {

        event.preventDefault();

        calculate();
    }


    // Backspace
    else if (key === "Backspace") {

        deleteNumber();
    }


    // Escape = Clear
    else if (key === "Escape") {

        clearCalculator();
    }


    // Percentage
    else if (key === "%") {

        percentage();
    }

});