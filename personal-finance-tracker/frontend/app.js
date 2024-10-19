
const form = document.getElementById('finance-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const summaryDiv = document.getElementById('summary');
const ctx = document.getElementById('financeChart').getContext('2d');

let finances = [];

// Fetch initial data from the backend
fetch('/api/finances')
    .then(response => response.json())
    .then(data => {
        finances = data;
        updateChart();
        updateSummary();
    });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    // Post new finance data to the backend
    fetch('/api/finances', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, amount, type }),
    })
    .then(response => response.json())
    .then(finance => {
        finances.push(finance);
        updateChart();
        updateSummary();
        descriptionInput.value = '';
        amountInput.value = '';
    });
});

function updateChart() {
    const income = finances.filter(f => f.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = finances.filter(f => f.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);

    const chartData = {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label: 'Amount',
            data: [income, expenses],
            backgroundColor: ['#4CAF50', '#F44336']
        }]
    };

    const financeChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
    });
}

function updateSummary() {
    const income = finances.filter(f => f.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = finances.filter(f => f.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const savings = income - expenses;

    summaryDiv.innerHTML = `
        <h3>Summary</h3>
        <p>Total Income: $${income.toFixed(2)}</p>
        <p>Total Expenses: $${expenses.toFixed(2)}</p>
        <p>Savings: $${savings.toFixed(2)}</p>
    `;
}
