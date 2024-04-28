// Asignar la función calculateLoan al evento click del botón
document.querySelector('button').addEventListener('click', calculateLoan);


// calcular pago mensual
function calculateMonthlyPayment(amount, interest, years) {
  let monthlyInterestRate = interest / 100 / 12;
  let numberOfPayments = years * 12;
  let x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
  let monthlyPayment = (amount * x * monthlyInterestRate) / (x - 1);
  return monthlyPayment;
}

// calcular el préstamo
function calculateLoan() {
  let amount = parseFloat(document.getElementById('amount').value);
  let interest = parseFloat(document.getElementById('interest').value);
  let years = parseInt(document.getElementById('years').value);

  // validación de entrada
  if (isNaN(amount) || isNaN(interest) || isNaN(years) || amount <= 0 || interest <= 0 || years <= 0) {
      document.getElementById('result').innerHTML = "Por favor, introduzca valores válidos.";
      return;
  }

  let monthlyPayment = calculateMonthlyPayment(amount, interest, years);
  let totalPayment = monthlyPayment * years * 12;
  let totalInterest = totalPayment - amount;

  document.getElementById('result').innerHTML = `Pago Mensual: $${monthlyPayment.toFixed(2)}<br>
  Pago Total: $${totalPayment.toFixed(2)}<br>
  Intereses Totales: $${totalInterest.toFixed(2)}<br><br>
  Detalle de Pagos por Año:<br>`;

  // Detalle de pagos por año
  let yearlyPayment = 0;
  let yearlyInterest = 0;
  for (let i = 1; i <= years; i++) {
    yearlyPayment += monthlyPayment * 12;
    yearlyInterest += (monthlyPayment * 12 * i) - (amount * i);
    document.getElementById('result').innerHTML += `Año ${i}: Pago Total: $${yearlyPayment.toFixed(2)}, Intereses Totales: $${yearlyInterest.toFixed(2)}<br>`;
  }
}

// validar solo números positivos en los campos de entrada
function validateInput(event) {
  let char = String.fromCharCode(event.which);
  if (!(/[0-9]/.test(char) || char === '.')) {
      event.preventDefault();
  }
}

// asignar validación de entrada a los campos de cantidad y tasa de interés
document.getElementById('amount').addEventListener('keypress', validateInput);
document.getElementById('interest').addEventListener('keypress', validateInput);


