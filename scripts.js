const Modal = {
    open() {
        document
            .querySelector(".modal-overlay")
            .classList.add("active")
    },
    close() {
        document
            .querySelector(".modal-overlay")
            .classList.remove("active")
    }
};

const transactions = [
    {
        id: 1,
        description: "Luz",
        amount: -50000,
        date: "23/01/2021"
    },
    {
        id: 2,
        description: "Criação website",
        amount: 500000,
        date: "23/01/2021"
    },
    {
        id: 3,
        description: "Internet",
        amount: -20000,
        date: "23/01/2021"
    },
    {
        id: 4,
        description: "App",
        amount: 200000,
        date: "23/01/2021"
    },

]

const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload();
    },

    income() {
        let income = 0;

        Transaction.all.forEach((transaction) => {
            income += transaction.amount > 0 ? transaction.amount : 0;
        })

        return income;
    },

    expenses() {
        let expense = 0;

        Transaction.all.forEach((transaction) => {
            expense += transaction.amount < 0 ? transaction.amount : 0;
        })

        return expense;
    },

    total() {

        return Transaction.income() + Transaction.expenses()
    },

}

const Utils = {

    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : ''

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        console.log(value)

        return `${signal} ${value}`

    }

}


const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {

        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionContainer.append(tr);
    },

    innerHTMLTransaction(transaction) {
        const CSSClass = transaction.amount > 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `;

        return html;
    },

    updateBalance() {
        document
            .getElementById("incomeDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.income());

        document
            .getElementById("expenseDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.expenses());

        document
            .getElementById("totalDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.total());

    },

    clearTransactions() {

        DOM.transactionContainer.innerHTML = `<tbody></tbody>`;

    }


}

const App = {

    init() {

        Transaction.all.forEach((transaction) => {
            DOM.addTransaction(transaction);
        })

        DOM.updateBalance();

    },

    reload() {

        DOM.clearTransactions()

        App.init();
    },

}

App.init();

Transaction.add({
    id: 42,
    description: 'Eae',
    amount: 2000,
    date: '27/07/2021'
})