document.addEventListener("DOMContentLoaded", () => {
  // Recuperar los datos del almacenamiento local al cargar la página
  if (localStorage.getItem("loanData")) {
      const loanData = JSON.parse(localStorage.getItem("loanData"));
      document.getElementById("amount").value = loanData.amount;
      document.getElementById("interest").value = loanData.interest;
      document.getElementById("years").value = loanData.years;
  }

  document.getElementById("calculateBtn").addEventListener("click", calculateLoan);
  document.getElementById("clearStorageBtn").addEventListener("click", clearStorage);
});

class Loan {
  constructor(amount, interest, years) {
      this.amount = amount;
      this.interest = interest;
      this.years = years;
  }

  calculateMonthlyPayment() {
      let monthlyInterestRate = this.interest / 100 / 12;
      let numberOfPayments = this.years * 12;
      let x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
      let monthlyPayment = (this.amount * x * monthlyInterestRate) / (x - 1);
      return monthlyPayment;
  }

  calculateTotalPayment() {
      return this.calculateMonthlyPayment() * this.years * 12;
  }

  calculateTotalInterest() {
      return this.calculateTotalPayment() - this.amount;
  }

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

function calculateLoan() {
  let amount = parseFloat(document.getElementById('amount').value);
  let interest = parseFloat(document.getElementById('interest').value);
  let years = parseInt(document.getElementById('years').value);

  if (isNaN(amount) || isNaN(interest) || isNaN(years) || amount <= 0 || interest <= 0 || years <= 0) {
      document.getElementById('result').innerHTML = "Por favor, introduzca valores válidos.";
      return;
  }

  let loan = new Loan(amount, interest, years);

  let monthlyPayment = loan.calculateMonthlyPayment();
  let totalPayment = loan.calculateTotalPayment();
  let totalInterest = loan.calculateTotalInterest();

  document.getElementById('result').innerHTML = `Pago Mensual: $${monthlyPayment.toFixed(2)}<br>
  Pago Total: $${totalPayment.toFixed(2)}<br>
  Intereses Totales: $${totalInterest.toFixed(2)}<br><br>
  Detalle de Pagos por Año:<br>`;

  let yearlyPayments = loan.generateYearlyPayments();
  yearlyPayments.forEach(payment => {
      document.getElementById('result').innerHTML += `Año ${payment.year}: Pago Total: $${payment.totalPayment.toFixed(2)}, Intereses Totales: $${payment.totalInterest.toFixed(2)}<br>`;
  });

  // Guardar datos en Local Storage
  let loanData = {
      amount: amount,
      interest: interest,
      years: years
  };
  localStorage.setItem("loanData", JSON.stringify(loanData));
}

function clearStorage() {
  localStorage.removeItem("loanData");
  document.getElementById('amount').value = '';
  document.getElementById('interest').value = '';
  document.getElementById('years').value = '';
  document.getElementById('result').innerHTML = '';
}

function validateInput(event) {
  let char = String.fromCharCode(event.which);
  if (!(/[0-9]/.test(char) || char === '.')) {
      event.preventDefault();
  }
}

document.getElementById('amount').addEventListener('keypress', validateInput);
document.getElementById('interest').addEventListener('keypress', validateInput);
