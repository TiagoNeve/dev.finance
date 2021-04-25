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

    income() {

    },

    expenses() {

    },

    total() {

    },

}

const Utils = {

    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : ''

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
            <td class="${CSSClass}">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `;

        return html;
    },


}

transactions.forEach((transaction) => {
    DOM.addTransaction(transaction);
})