const darkModeSwitch = document.getElementById("darkModeSwitch");

const calculator = document.querySelector(".calculator");

darkModeSwitch.addEventListener("click", function () {
    
  // Alternar a classe 'dark-mode' na calculadora
  calculator.classList.toggle("dark-mode");
  console.log("Calculator");
});
