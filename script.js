document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.button'));
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    function updateDisplay(value) {
        display.textContent = value;
    }

    function calculate() {
        if (!firstOperand || !secondOperand || !operator) return;

        const a = parseFloat(firstOperand);
        const b = parseFloat(secondOperand);

        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return;
        }
    }

    function handleButtonClick(button) {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            currentInput += value;
            updateDisplay(currentInput);
        } else if (button.classList.contains('operator')) {
            if (firstOperand && secondOperand && operator) {
                firstOperand = calculate();
                secondOperand = '';
                updateDisplay(firstOperand);
            }
            operator = value;
            firstOperand = currentInput;
            currentInput = '';
        } else if (button.classList.contains('decimal')) {
            if (!currentInput.includes('.')) {
                currentInput += value;
                updateDisplay(currentInput);
            }
        } else if (button.classList.contains('equal')) {
            secondOperand = currentInput;
            const result = calculate();
            updateDisplay(result);
            currentInput = result.toString();
            firstOperand = '';
            secondOperand = '';
            operator = '';
        } else if (button.classList.contains('clear')) {
            currentInput = '';
            firstOperand = '';
            secondOperand = '';
            operator = '';
            updateDisplay('0');
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button));
    });
});
