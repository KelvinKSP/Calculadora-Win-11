// Fazer a seleção dos elementos
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");



// Classe + lógica da aplicação
class Calculator {

    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // Método que adiciona digito no visor
    addDigit(digit) {

        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Método que faz o processo das operação 
    processOperation(operation) {

        // Checa se o valor atual é vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // Muda a operação
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Pega o valor atual e anterior
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "x":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "÷":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "%":
                operationValue = (current / 100);
                this.updateScreen(operationValue, '', current, previous);
                break;
            case "x²":
                operationValue = Math.pow(current, 2);
                this.updateScreen(operationValue, '', current, operationValue);
                break;
            case "²√x":
                operationValue = Math.sqrt(current);
                this.updateScreen(operationValue, '', current, operationValue);
                break;
            case "+/-":
                operationValue = Math.sign(-current);
                this.updateScreen(operationValue, '', current, operationValue);
                break;
            case "¹/x":
                operationValue = 1 / current
                this.updateScreen(operationValue, '', current, operationValue);
                break;
            case "CE":
                this.clearCurrentOperation();
                break;
            case "C":
                this.clearAllOperations();
                break;
            case "d":
                this.deleteDigit();
                break;
            case "=":
                this.equalOperator();
                break;
            default:
                return;
        }

    }

    // Método que atualiza o digito na visor
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Verifica se, caso o valor for zero, adiciona apenas o valor atual
            if (previous === 0) {
                operationValue = current;
            }

            // Adiciona o resultado para cima
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // Altera as operações
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Deleta o ultimo dígito
    deleteDigit() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //  Limpa a operação atual
    clearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // Limpa todas as operações
    clearAllOperations() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Igual
    equalOperator() {

        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

// Eventos
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})