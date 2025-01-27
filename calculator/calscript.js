const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("equal");

let currentInput = "0"; // Start with 0 as the default
let operator = null; // Store the selected operator
let previousInput = ""; // Store the previous input for calculations
let isResultDisplayed = false; // Flag to handle chaining calculations

// Update the display function
function updateDisplay(value) {
  display.innerText = value.length > 10 ? value.slice(0, 10) : value; // Limit display to 10 characters
}

// Add event listeners for buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (!isNaN(value) || value === ".") {
      // Number or decimal point
      if (isResultDisplayed) {
        currentInput = ""; // Clear input after a result
        isResultDisplayed = false;
      }

      // Prevent multiple decimals
      if (value === "." && currentInput.includes(".")) return;

      currentInput = currentInput === "0" ? value : currentInput + value; // Append number or replace 0
      updateDisplay(currentInput);
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Operator button
      if (currentInput) {
        if (operator && previousInput) {
          // Perform calculation if there's an existing operator
          previousInput = calculate(previousInput, currentInput, operator).toString();
        } else {
          previousInput = currentInput;
        }
      }

      operator = value; // Store selected operator
      currentInput = ""; // Clear current input for the next number
      isResultDisplayed = false;
    }
  });
});

// Equal button functionality
equalButton.addEventListener("click", () => {
  if (operator && previousInput && currentInput) {
    const result = calculate(previousInput, currentInput, operator);
    updateDisplay(result.toString());
    currentInput = result.toString();
    previousInput = ""; // Reset for the next calculation
    operator = null;
    isResultDisplayed = true; // Set flag to clear input for new calculations
  }
});

// Clear button functionality
clearButton.addEventListener("click", () => {
  currentInput = "0";
  previousInput = "";
  operator = null;
  isResultDisplayed = false;
  updateDisplay(currentInput);
});

// Calculation function
function calculate(num1, num2, op) {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  switch (op) {
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    case "*":
      return n1 * n2;
    case "/":
      return n2 !== 0 ? n1 / n2 : "Error"; // Handle division by zero
    default:
      return 0;
  }
}