// calcular pago mensual
function calculateMonthlyPayment(amount, interest, years) {
  var monthlyInterestRate = interest / 100 / 12;
  var numberOfPayments = years * 12;
  var x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
  var monthlyPayment = (amount * x * monthlyInterestRate) / (x - 1);
  return monthlyPayment;
}

// calcular el préstamo
function calculateLoan() {
  var amount = parseFloat(document.getElementById('amount').value);
  var interest = parseFloat(document.getElementById('interest').value);
  var years = parseInt(document.getElementById('years').value);

  // validación de entrada
  if (isNaN(amount) || isNaN(interest) || isNaN(years) || amount <= 0 || interest <= 0 || years <= 0) {
      document.getElementById('result').innerHTML = "Por favor, introduzca valores válidos.";
      return;
  }

  var monthlyPayment = calculateMonthlyPayment(amount, interest, years);
  var totalPayment = monthlyPayment * years * 12;
  var totalInterest = totalPayment - amount;

  document.getElementById('result').innerHTML = `Pago Mensual: $${monthlyPayment.toFixed(2)}<br>
  Pago Total: $${totalPayment.toFixed(2)}<br>
  Intereses Totales: $${totalInterest.toFixed(2)}`;
}

// validar solo números positivos en los campos de entrada
function validateInput(event) {
  var char = String.fromCharCode(event.which);
  if (!(/[0-9]/.test(char) || char === '.')) {
      event.preventDefault();
  }
}

// asignar validación de entrada a los campos de cantidad y tasa de interés
document.getElementById('amount').addEventListener('keypress', validateInput);
document.getElementById('interest').addEventListener('keypress', validateInput);

