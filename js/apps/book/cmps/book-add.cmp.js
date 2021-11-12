import { bookService } from '../../book/services/book-service.js';
import { eventBus } from '../../../../services/event-bus-service.js';

export default {
    template: `
    
        <section class="book-add app-main" >
            <div class="books-container">
                <input v-model.lazy="bookName" type="text" placeholder="Search for a Book">
                <ul v-if="books" class="book-list">
                    <li v-for="(book,idx) in books" class="book-container">
                        <img :src="bookImg(book)" >
                        {{book.volumeInfo.title}}
                        
                        <button @click="addBook(idx)">+</button>
                    </li>
                </ul>
                <h2 v-else>
                    No books to display
                </h2>
                </div>
        </section>
    `,
    data() {
        return {
            bookName: null,
            books: null
        };
    },
    created() {
        console.log('created');
    },
    watch: {
        bookName(val) {
            bookService.searchBooks(val).then((books) => {
                this.books = books.items
                console.log(books);
            })
        }
    },
    methods: {
        addBook(idx) {
            let book = this.books[idx]
            const modifyBook = {
                authors: book.volumeInfo.authors,
                categories: book.volumeInfo.categories,
                description: book.volumeInfo.description,
                language: book.volumeInfo.language,
                listPrice: { amount: Date.now() % 1000, currencyCode: "EUR", isOnSale: (book.saleInfo.saleability === 'NOT_FOR_SALE') ? false : true },
                pageCount: book.volumeInfo.pageCount,
                publishedDate: book.volumeInfo.publishedDate,
                subtitle: book.volumeInfo.subtitle,
                thumbnail: book.volumeInfo.imageLinks.thumbnail,
                title: book.volumeInfo.title
            }
            bookService.save(modifyBook).then(() => {
                const msg = {
                    txt: 'Add successfully',
                    type: 'success'
                };
                eventBus.$emit('showMsg', msg);
                this.$router.push('/book')
            })
        },
        bookImg(book) {
            return (book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : ''
        }

    },
    computed: {

    }

};