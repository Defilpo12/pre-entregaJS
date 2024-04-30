class Loan {
  constructor(amount, interest, years) {
    this.amount = amount;
    this.interest = interest;
    this.years = years;
    this.monthlyPayment = 0;
    this.totalPayment = 0;
    this.totalInterest = 0;
    this.yearlyPayments = [];
  }

  calculateMonthlyPayment() {
    let monthlyInterestRate = this.interest / 100 / 12;
    let numberOfPayments = this.years * 12;
    let x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    this.monthlyPayment = (this.amount * x * monthlyInterestRate) / (x - 1);
  }

  calculateLoan() {
    // Validación de entrada
    if (isNaN(this.amount) || isNaN(this.interest) || isNaN(this.years) || this.amount <= 0 || this.interest <= 0 || this.years <= 0) {
      return "Por favor, introduzca valores válidos.";
    }

    this.calculateMonthlyPayment();
    this.totalPayment = this.monthlyPayment * this.years * 12;
    this.totalInterest = this.totalPayment - this.amount;

    // Detalle de pagos por año
    let yearlyPayment = 0;
    let yearlyInterest = 0;
    for (let i = 1; i <= this.years; i++) {
      yearlyPayment += this.monthlyPayment * 12;
      yearlyInterest += (this.monthlyPayment * 12 * i) - (this.amount * i);
      this.yearlyPayments.push({ year: i, payment: yearlyPayment, interest: yearlyInterest });
    }
  }
}

// Ejemplo de uso
let amount = parseFloat(document.getElementById('amount').value);
let interest = parseFloat(document.getElementById('interest').value);
let years = parseInt(document.getElementById('years').value);

let loan = new Loan(amount, interest, years);
loan.calculateLoan();

// Mostrar resultados
document.getElementById('result').innerHTML = `Pago Mensual: $${loan.monthlyPayment.toFixed(2)}<br>
  Pago Total: $${loan.totalPayment.toFixed(2)}<br>
  Intereses Totales: $${loan.totalInterest.toFixed(2)}<br><br>
  Detalle de Pagos por Año:<br>`;

  loan.yearlyPayments.forEach((payment) => {
    document.getElementById('result').innerHTML += `Año ${payment.year}: Pago Total: $${payment.payment.toFixed(2)}, Intereses Totales: $${payment.interest.toFixed(2)}<br>`;
  });
  

