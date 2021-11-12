import longText from '../cmps/long-text.cmp.js';
import bookRate from '../cmps/book-rate.cmp.js';
import {bookService} from '../services/book-service.js';
import { eventBus } from '../../../../services/event-bus-service.js';

export default {
    components: {
        longText,
        bookRate
    },
    template: `
        <section v-if="book" class="book-details">
        <img :src="book.thumbnail"/>
            <h3>Book Details:</h3>
            <p>Book name : {{book.title}}</p>
            <p :class="bookDetails">Price : {{book.listPrice.amount}} {{currencyCode}}</p>
            <p>Page Count :{{pageCount}}</p>
            <p>Published Date :{{ publishedDate}}</p>
            <p class="red"> {{isOnSale}}</p>
            <long-text v-bind:txt="book.description"/>
            <book-rate v-bind:bookId="bookId" @reviewAdded="onReviewAdded"/>
            <div class="reviews-container">
                <ul v-if="book.reviews" class="review-list">Book Reviews:
                    <li v-for="review in book.reviews" :key="review.id">
                        <ul class="review-card">
                            <li>Name : {{review.name}}</li>
                            <li>Rate : {{review.rate}}</li>
                            <li>Read At :{{review.readAt}}</li>
                            <li>Free Text :{{review.txt}}</li>
                            <button @click="removeReview(book.id, review.id)">Delete</button>
                        </ul>
                    </li>
                </ul> 
            </div>
            <div class="btn-link">
                <router-link :to="'/book/'+previousBookId">  Previous book </router-link>
                <router-link to="/book">Back</router-link>
                <router-link :to="'/book/'+nextBookId">Next book </router-link>
            </div>
        </section>
    `,
    data() {
        return {
            book: null,
            bookId: '',
            nextBookId: null,
            previousBookId: null,
        };
    },
    created() {
        this.bookId = this.$route.params.bookId;
        bookService.getById(this.bookId)
            .then(book => {
                return this.book = book
            });
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const { bookId } = this.$route.params;
                bookService.getById(bookId)
                    .then(book => this.book = book);
                    bookService.getNextBookId(bookId)
                    .then(bookId => this.nextBookId = bookId);
                    bookService.getPreviousBookId(bookId)
                    .then(bookId => this.previousBookId = bookId);
            },
            immediate: true
        }
    },
    methods: {
        onReviewAdded(book) {
            this.book = book
            const msg = {
                txt: `The review on book: ${this.book.title}  was Added!`,
                type: 'success'
            };
            eventBus.$emit('showMsg', msg);
        },
        removeReview(bookId, reviewId) {
            bookService.remove(bookId, reviewId)
                .then(() => {
                    const msg = {
                        txt: 'Deleted successfully',
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                    this.bookId = this.$route.params.bookId;
                    bookService.getById(this.bookId)
                        .then(book => {
                            return this.book = book
                        });
                })
                .catch(err => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },

    },
    computed: {
        pageCount() {
            if (this.book.pageCount > 500) return 'Long reading'
            if (this.book.pageCount < 200) return 'Decent Reading'
            if (this.book.pageCount < 100) return 'Light Reading'
            else return 'Regular Reading'
        },
        publishedDate() {
            if ((this.book.publishedDate - 2021) === -10) return 'Veteran Book'
            if ((this.book.publishedDate - 2021) === -1) return 'New!'
            else return 'Regular book'
        },
        bookDetails() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        },
        currencyCode() {
            if (this.book.listPrice.currencyCode === 'ILS') return '₪'
            if (this.book.listPrice.currencyCode === 'USD') return '$'
            if (this.book.listPrice.currencyCode === 'EUR') return '€'

        },
        isOnSale() {
            if (!this.book.listPrice.isOnSale) return
            return 'S A L E ! !'
        },
    },
}