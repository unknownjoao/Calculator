const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const display = document.getElementById("display");
const displayPreview = document.getElementById("displayPreview");
const equals = document.getElementById("equals");
const plusMinusButton = document.getElementById("plus-minus");
const clearButton = document.getElementById("clear");
const percentageButton = document.getElementById("percentage");

// VARIÁVEIS
let firstNumber = null;
let operation = null;
let secondNumber = null;

// ADICIONANDO EVENTOS AOS BOTÕES NUMÉRICOS
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (display.innerText == "0") {
      display.innerText = number.value;
    } else {
      display.innerText += number.value;
    }
    adjustFontSize();
  });
});

// ADICIONANDO EVENTOS AOS BOTÕES DE OPERAÇÃO
operations.forEach((operationButton) => {
  operationButton.addEventListener("click", () => {
    if (firstNumber !== null && operation !== null && secondNumber === null) {
      calculateResult();
    }
    firstNumber = parseFloat(display.innerText);
    operation = operationButton.value;
    display.innerText = "0";
    displayPreview.innerText = firstNumber + " " + operation;
  });
});

// ADICIONANDO EVENTO AO BOTÃO DE MUDAR SINAL +/-
plusMinusButton.addEventListener("click", () => {
  if (display.innerText !== "0") {
    if (display.innerText.startsWith("-")) {
      display.innerText = display.innerText.slice(1);
    } else {
      display.innerText = "-" + display.innerText;
    }
  }
});

// ADICIONANDO EVENTO AO BOTÃO DE PORCENTAGEM
percentageButton.addEventListener("click", () => {
  try {
    if (firstNumber !== null && operation !== null) {
      const currentNumber = parseFloat(display.innerText);
      const percentage = (firstNumber * currentNumber) / 100;
      display.innerText = percentage;
    }
  } catch (error) {
    console.error(error);
    display.innerText = "Erro: Número inválido";
  }
});

// ADICIONANDO EVENTO AO BOTÃO DE LIMPAR AC
clearButton.addEventListener("click", () => {
  firstNumber = null;
  operation = null;
  secondNumber = null;
  displayPreview.innerText = "0";
  display.innerText = "0";
});

// FUNÇÃO PARA CALCULAR O RESULTADO DA OPERAÇÃO
function calculateResult() {
  secondNumber = parseFloat(display.innerText);
  let result;

  if (firstNumber !== null && operation !== null) {
    switch (operation) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "x":
        result = firstNumber * secondNumber;
        break;
      case "÷":
        result = firstNumber / secondNumber;
        break;
      default:
        result = "Error";
        break;
    }
    displayPreview.innerText =
      firstNumber + " " + operation + " " + secondNumber + " = ";
    display.innerText = result;

    firstNumber = result;
    operation = operation;
    secondNumber = null;
  } else {
    console.log("NENHUMA OPERAÇÃO PARA CALCULAR.");
  }

  adjustFontSize();
}

// FUNÇÃO PARA AJUSTAR O TAMANHO DA FONTE
function adjustFontSize() {
  if (display.innerText.length >= 9) {
    display.style.fontSize = "30px";
  } else {
    display.style.fontSize = "";
  }
}

// ADICIONANDO EVENTO AO BOTÃO DE IGUAL
equals.addEventListener("click", calculateResult);

// ADICIONANDO EVENTO DE TECLADO PARA CAPTURAR AS OPERAÇÕES
document.addEventListener("keydown", (event) => {
  const keyPressed = event.key;

  if (["+", "-", "*", "/"].includes(keyPressed)) {
    if (firstNumber !== null && operation !== null && secondNumber === null) {
      calculateResult();
    }
    firstNumber = parseFloat(display.innerText);
    operation = keyPressed;
    display.innerText = "";
    displayPreview.innerText = firstNumber + " " + operation;
  }
});

// ADICIONANDO EVENTO DE TECLADO PARA CAPTURAR OS NÚMEROS
document.addEventListener("keydown", (event) => {
  const keyPressed = event.key;
  const isNumber = /^\d$/.test(keyPressed); // VERIFICANDO SE A TECLA PRESSIONADA É UM NUMERO

  if (isNumber) {
    if (display.innerText === "0") {
      display.innerText = keyPressed;
    } else {
      display.innerText += keyPressed;
    }
    adjustFontSize();
  }
});

// ADICIONANDO EVENTO DE TECLADO PARA CAPTURAR A TECLA DE ENTER PARA CALCULAR O RESULTADO
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calculateResult();
  }
});

// ADICIONANDO EVENTO DE TECLADO PARA CAPTURAR A TECLA DE ESCAPE PARA LIMPAR A CALCULADORA
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearButton.click();
  }
});

// ADICIONANDO EVENTO DE TECLADO PARA CAPTURAR A TECLA DE BACKSPACE PARA APAGAR UM DÍGITO
document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    const currentDisplay = display.innerText;
    display.innerText = currentDisplay.slice(0, -1);
    adjustFontSize();
  }
});
