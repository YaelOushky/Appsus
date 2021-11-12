import {
    bookService
} from '../services/book-service.js';

export default {
    props: ['bookId'],
    template: `
        <section class="book-Rate ">
            <form @submit.prevent="addReview" >
            <legend>Add Your Review:</legend>
            <label >Full Name :
                <input v-model="reviewToAdd.name" type="text" placeholder="Full Name" required>
            </label>
                <div class="stars"> Rate :
                <span v-for="num in 5" class="fa fa-star" :class="{checked:num<=reviewToAdd.rate}" @click="changeColor(num)"></span>
                </div>
                <label> Read At :
                    <input v-model="reviewToAdd.readAt" type="date">
                </label>
                <textarea  class="free-txt" v-model="reviewToAdd.txt" type="text" placeholder="Something in addition" cols="30" rows="3"></textarea>
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            reviewToAdd: {
                name: '',
                rate: 3,
                readAt: '',
                txt: ''
            }
        };
    },
    created() {

    },
    methods: {
        addReview() {
            bookService.addReview(this.reviewToAdd, this.bookId)
                .then(book => {
                    this.$emit('reviewAdded', book)
                    this.reviewToAdd = {
                        name: '',
                        rate: 3,
                        readAt: '',
                        txt: ''
                    }
                });
        },
        changeColor(num) {
            this.reviewToAdd.rate = num;
            console.log('hello', num)
        }
    }
};