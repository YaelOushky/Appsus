import { bookService } from '../services/book-service.js';


import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookDetails from './book-details.cmp.js';

export default {
    components: {
        bookList,
        bookFilter,
        bookDetails,
    },
    template: `
        <section class="book-app">
            
            <book-filter @filtered="setFilter" />
            <book-list  :books="booksToShow"  @selected="selectBook" />
        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null
        };
    },
    created() {
        this.loadBooks();
    },
    methods: {

        loadBooks() {
            bookService.query()
                .then(books => {
                    this.books = books
                });
        },
        selectBook(book) {
            this.selectedBook = book;
        },
        closeDetails() {
            this.selectedBook = null;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;

            const searchStr = this.filterBy.title.toLowerCase();
            var booksToDisplay = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr);
            });
            const searchMin = (this.filterBy.minPrice) ? this.filterBy.minPrice : 0
            booksToDisplay = booksToDisplay.filter(book => {
                return book.listPrice.amount > searchMin
            })
            const searchMax = (this.filterBy.maxPrice) ? this.filterBy.maxPrice : Infinity
            booksToDisplay = booksToDisplay.filter(book => {
                return book.listPrice.amount < searchMax
            })
            return booksToDisplay
        }
    },

};