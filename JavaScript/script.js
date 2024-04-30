// Definir una clase para representar un préstamo
class Loan {
  constructor(amount, interest, years) {
    this.amount = amount;
    this.interest = interest;
    this.years = years;
  }

  // Método para calcular el pago mensual
  calculateMonthlyPayment() {
    let monthlyInterestRate = this.interest / 100 / 12;
    let numberOfPayments = this.years * 12;
    let x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    let monthlyPayment = (this.amount * x * monthlyInterestRate) / (x - 1);
    return monthlyPayment;
  }

  // Método para calcular el pago total
  calculateTotalPayment() {
    return this.calculateMonthlyPayment() * this.years * 12;
  }

  // Método para calcular los intereses totales
  calculateTotalInterest() {
    return this.calculateTotalPayment() - this.amount;
  }

  // Método para generar el detalle de pagos por año
  generateYearlyPayments() {
    let yearlyPayments = [];
    let monthlyPayment = this.calculateMonthlyPayment();
    let totalPayment = 0;
    let totalInterest = 0;

    for (let i = 1; i <= this.years; i++) {
      totalPayment += monthlyPayment * 12;
      totalInterest += (monthlyPayment * 12 * i) - (this.amount * i);
      yearlyPayments.push({ year: i, totalPayment: totalPayment, totalInterest: totalInterest });
    }

    return yearlyPayments;
  }
}

// Función para calcular el préstamo
function calculateLoan() {
  let amount = parseFloat(document.getElementById('amount').value);
  let interest = parseFloat(document.getElementById('interest').value);
  let years = parseInt(document.getElementById('years').value);

  // Validación de entrada
  if (isNaN(amount) || isNaN(interest) || isNaN(years) || amount <= 0 || interest <= 0 || years <= 0) {
    document.getElementById('result').innerHTML = "Por favor, introduzca valores válidos.";
    return;
  }

  // Crear un objeto préstamo
  let loan = new Loan(amount, interest, years);

  // Calcular los pagos mensuales, total de pagos e intereses totales
  let monthlyPayment = loan.calculateMonthlyPayment();
  let totalPayment = loan.calculateTotalPayment();
  let totalInterest = loan.calculateTotalInterest();

  // Mostrar los resultados principales
  document.getElementById('result').innerHTML = `Pago Mensual: $${monthlyPayment.toFixed(2)}<br>
  Pago Total: $${totalPayment.toFixed(2)}<br>
  Intereses Totales: $${totalInterest.toFixed(2)}<br><br>
  Detalle de Pagos por Año:<br>`;

  // Mostrar el detalle de pagos por año
  let yearlyPayments = loan.generateYearlyPayments();
  yearlyPayments.forEach(payment => {
    document.getElementById('result').innerHTML += `Año ${payment.year}: Pago Total: $${payment.totalPayment.toFixed(2)}, Intereses Totales: $${payment.totalInterest.toFixed(2)}<br>`;
  });
}

// Función para validar solo números positivos en los campos de entrada
function validateInput(event) {
  let char = String.fromCharCode(event.which);
  if (!(/[0-9]/.test(char) || char === '.')) {
    event.preventDefault();
  }
}

// Asignar la función calculateLoan al evento click del botón
document.querySelector('button').addEventListener('click', calculateLoan);

// Asignar validación de entrada a los campos de cantidad y tasa de interés
document.getElementById('amount').addEventListener('keypress', validateInput);
document.getElementById('interest').addEventListener('keypress', validateInput);
