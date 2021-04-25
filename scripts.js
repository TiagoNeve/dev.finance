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

const Transaction = {
    all: [
        {
            description: "Luz",
            amount: -50000,
            date: "23/01/2021"
        },
        {
            description: "Criação website",
            amount: 500000,
            date: "23/01/2021"
        },
        {
            description: "Internet",
            amount: -20000,
            date: "23/01/2021"
        },
        {
            description: "App",
            amount: 200000,
            date: "23/01/2021"
        },

    ],

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1)

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

    formatAmount(value) {
        value = Number(value) * 100

        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-");

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : ''

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

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

const Form = {

    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    validateFildes() {
        const { description, amount, date } = Form.getValues();

        if (description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === ""
        ) {
            throw new Error("Por favor, preencha todos os campos!")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues();

        amount = Utils.formatAmount(amount);

        date = Utils.formatDate(date);

        return {
            description,
            amount,
            date
        }

    },

    save() {

    },

    submit(event) {
        event.preventDefault();

        try {

            Form.validateFildes();

            const transaction = Form.formatValues();

            Form.save();

        } catch (error) {
            alert(error.message)
        }

    },
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

