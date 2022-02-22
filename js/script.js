const nameInput = document.querySelector('.expensename_input');
const dateInput = document.querySelector('.date_input');
const amountInput = document.querySelector('.amount_input');
const addButton = document.querySelector('.add_btn');
const expenseTable = document.querySelector('.expanse_table table');
const expensesSum = document.querySelector('.expenses_sum');

class newExpense {
    constructor(name, date, amount) {
        this.name = name;
        this.date = date;
        this.amount = amount;
    }
}

const localExpenses = () => {
    let localExpenses = JSON.parse(localStorage.getItem('localExpense'))
    if (localExpenses === null) {
        ExpensesList = [];
    } else {
        ExpensesList = localExpenses;
    }
}

const addToLocalExpenses = () => {
    localExpenses();
    ExpensesList.push([nameInput.value, dateInput.value, amountInput.value]);
    localStorage.setItem('localExpense', JSON.stringify(ExpensesList));
}

const showLocalExpensesList = () => {
    localExpenses();
    let outPut = '';
    let ExpensesListShow = expenseTable;
    ExpensesList.forEach((expenseName) => {
        outPut = showExpense(expenseName);
    });
    ExpensesListShow = outPut;
}

const deleteFromLocalExpenses = value => {
    const valueOfArray = ExpensesList.indexOf(value);
    ExpensesList.splice(valueOfArray, 1);
    localStorage.setItem('localExpense', JSON.stringify(ExpensesList));
}

const Expenses = {}

addButton.addEventListener('click', () => {
    if (nameInput.value < 1) {
        alert('Name cannot be empty!')
    } else if (dateInput.value < 1) {
        alert('Date cannot be empty!')
    } else if (amountInput.value < 1) {
        alert('Amount cannot be empty!')
    } else if (isNaN(amountInput.value) == true) {
        alert('Amount must be a number!')
    } else {
        addExpense(nameInput.value, dateInput.value, amountInput.value);
        addToLocalExpenses();
        showExpense();
    }
})

const addExpense = (name, date, amount) => {
    const expensesLength = Object.keys(Expenses).length;
    const lastIndex = (Object.keys(Expenses)[expensesLength - 1]);
    if (lastIndex == undefined) {
        const lastNumber = Number(0);
        const newExpenseKey = 'Expense' + (lastNumber + 1);
        Expenses[newExpenseKey] = new newExpense(name, date, amount);
    } else {
        const lastNumber = Number(lastIndex.substr(7));
        const newExpenseKey = 'Expense' + (lastNumber + 1);
        Expenses[newExpenseKey] = new newExpense(name, date, amount);
    }
}


const showExpense = (expenseName) => {
    const trre = document.querySelector('.trre');
    const tr = document.createElement('tr');
    const button = document.createElement('button');
    button.classList.add('delete_btn')
    button.innerHTML = "Delete expense";
    const td = [];
    expenseTable.appendChild(tr);
    tr.classList.add('second_tr');
    for (let i = 0; i < 4; i++) {
        td[i] = document.createElement('td');
        tr.appendChild(td[i]);
    }
    if (expenseName === undefined) {
        for (let expense in Expenses) {
            td[0].innerHTML = Expenses[expense].name;
            td[1].innerHTML = Expenses[expense].date;
            td[2].innerHTML = Expenses[expense].amount + '$';
            td[3].appendChild(button);
            expenseName = [Expenses[expense].name, Expenses[expense].date, Expenses[expense].amount];
        }
    } else {
        td[0].innerHTML = `${expenseName[0]}`;
        td[1].innerHTML = `${expenseName[1]}`;
        td[2].innerHTML = `${expenseName[2]}` + '$';
        td[3].appendChild(button);
    }

    button.addEventListener('click', () => {
        if (confirm('Do you want to delete this expense?') == true) {
            button.parentNode.parentNode.parentNode.removeChild(tr);
            deleteFromLocalExpenses(expenseName);
            noExpenses();
            sumOfExpense();
        }
    })

    sumOfExpense()
    nameInput.value = '';
    dateInput.value = '';
    amountInput.value = '';

    const noExpenses = () => {
        if (ExpensesList.length > 0) {
            trre.classList.add('nodisplayexpenses_tr');
        } else {
            trre.classList.remove('nodisplayexpenses_tr');
        }
    }
    noExpenses();
}

const sumOfExpense = () => {
    let sum = 0;
    for (let i = 0; i < ExpensesList.length; i++) {
        sum += Number(ExpensesList[i][2])
    }
    expensesSum.innerHTML = 'Your sum of expenses: ' + sum;
}

showLocalExpensesList();