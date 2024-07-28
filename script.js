const budget = 2000;
let expenses = [];

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;

    if (name && amount && category) {
        const expense = { name, amount, category };
        expenses.push(expense);
        saveExpenseToFile(expense);
        summarizeExpenses();
    } else {
        alert('Please fill in all fields.');
    }
}

function saveExpenseToFile(expense) {
    // Simulate saving to file by storing in local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function summarizeExpenses() {
    let amountByCategory = {};
    expenses.forEach(expense => {
        if (amountByCategory[expense.category]) {
            amountByCategory[expense.category] += expense.amount;
        } else {
            amountByCategory[expense.category] = expense.amount;
        }
    });

    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    for (const [key, amount] of Object.entries(amountByCategory)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: $${amount.toFixed(2)}`;
        expenseList.appendChild(listItem);
    }

    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total-spent').textContent = `💵 Total Spent: $${totalSpent.toFixed(2)}`;

    const remainingBudget = budget - totalSpent;
    document.getElementById('budget-remaining').textContent = `✅ Budget Remaining: $${remainingBudget.toFixed(2)}`;

    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const remainingDays = daysInMonth - now.getDate();

    const dailyBudget = remainingBudget / remainingDays;
    document.getElementById('budget-per-day').textContent = `👉 Budget Per Day: $${dailyBudget.toFixed(2)}`;
}

// Load expenses from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (savedExpenses) {
        expenses = savedExpenses;
        summarizeExpenses();
    }
});
