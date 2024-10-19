document.getElementById("emi-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const loanAmount = parseFloat(document.getElementById("loan-amount").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById("loan-term").value);

    // Calculate EMI
    const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);

    // Display the result
    document.getElementById("emi-amount").innerText = `₹${emi.toFixed(2)}`;
});
