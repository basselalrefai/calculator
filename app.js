// UI variables
const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator-display");
const calculatorKeys = document.querySelector(".calculator-keys");
const calculatorKeysArr = Array.from(calculatorKeys.children);
let isClicked;

// Handler Functions

function handleKeyPress(e) {
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action;
        const displayedNum = display.textContent;
        let firstNumber = calculator.dataset.firstValue;

        if (!action) {
            handleNumber(key);
        } else if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
        ) {
            handleOperator(key, displayedNum, action);
        } else if (action === "equals") {
            handleEquals(firstNumber);
        } else if (action === "clear") {
            handleClear();
        } else if (action === "all-clear") {
            handleAllClear();
        } else if (action === "decimal") {
            handleDecimal();
        }
    }
}

function handleNumber(key) {
    if (display.textContent === "0" || isClicked) {
        display.textContent = key.textContent;
        calculatorKeysArr.forEach((key) => {
            key.classList.remove("is-clicked");
        });
        isClicked = false;
    } else {
        display.textContent += key.textContent;
    }
}

function handleOperator(key, displayedNum, action) {
    if (
        calculator.dataset.previousButton !== "add" &&
        calculator.dataset.previousButton !== "subtract" &&
        calculator.dataset.previousButton !== "multiply" &&
        calculator.dataset.previousButton !== "divide"
    ) {
        if (calculator.dataset.previousButton === "equals") {
            console.log(calculator.dataset.firstValue);
            key.classList.add("is-clicked");
            isClicked = true;
            display.textContent = "";
            calculator.dataset.previousButton = action;
        } else {
            calculator.dataset.firstValue = displayedNum;
            key.classList.add("is-clicked");
            isClicked = true;
            display.textContent = "";
            calculator.dataset.previousButton = action;
        }
    } else {
        handleEquals(calculator.dataset.firstValue);
        key.classList.add("is-clicked");
        isClicked = true;
        calculator.dataset.previousButton = action;
        console.log(calculator.dataset.previousButton);
        console.log(calculator.dataset.firstValue);
    }
}

function handleEquals(firstNumber) {
    firstNumber = parseFloat(firstNumber);
    const secondNumber = parseFloat(display.textContent);
    if (!secondNumber && secondNumber !== 0) {
        return;
    } else {
        calculator.dataset.secondNumber = secondNumber;
    }

    if (calculator.dataset.previousButton === "add") {
        display.textContent = add(firstNumber, secondNumber);
    } else if (calculator.dataset.previousButton === "subtract") {
        display.textContent = subtract(firstNumber, secondNumber);
    } else if (calculator.dataset.previousButton === "multiply") {
        display.textContent = multiply(firstNumber, secondNumber);
    } else if (calculator.dataset.previousButton === "divide") {
        display.textContent = divide(firstNumber, secondNumber);
    }
    calculator.dataset.previousButton = "equals";
    calculator.dataset.firstValue = display.textContent;
}

function handleAllClear() {
    display.textContent = "0";
    calculator.dataset.firstValue = 0;
    calculator.dataset.previousButton = "";
}

function handleDecimal() {
    if (display.textContent.includes(".")) {
        return;
    } else {
        display.textContent += ".";
    }
}

function handleClear() {
    display.textContent = display.textContent.slice(0, -1);
}

// Arithmatic functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a < 0 && b === 0) {
        return -Infinity;
    }
    return a / b;
}

// Magic
calculatorKeys.addEventListener("click", handleKeyPress);
