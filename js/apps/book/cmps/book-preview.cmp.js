export default {
    props: ['book'],
    template: `
        <div class="book-preview">
            <img :src="book.thumbnail"/>
            <p>Book Name : {{book.title}}</p>
            <p :class="bookDetails">Price : {{book.listPrice.amount}} {{currencyCode}}</p>
        </div>
    `,
    computed: {
        currencyCode() {
            if (this.book.listPrice.currencyCode === 'ILS') return '₪'
            if (this.book.listPrice.currencyCode === 'USD') return '$'
            if (this.book.listPrice.currencyCode === 'EUR') return '€'

        },
        bookDetails() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        },

    },
}