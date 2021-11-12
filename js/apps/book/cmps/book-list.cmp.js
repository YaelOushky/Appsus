import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    components: {
        bookPreview
    },
    template: `
        <ul class="book-list" >
            <li v-for="book in books" :key="book.id" class="book-preview-container" @click="select(book)">
                <book-preview  :book="book" @click.native="setDetails(book.id)"  />
            </li>
        </ul>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId);
        },
        select(book) {
            this.$emit('selected', book);
        },
        log() {
            console.log('Logging.....');
        },
        setDetails(id){
             this.$router.push(`/book/${id}`)
        }
    },

};