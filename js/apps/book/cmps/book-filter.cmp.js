import bookAdd from '../cmps/book-add.cmp.js';

export default {
    components: {
        bookAdd
    },
    template: `
        <div class="book-filter">
            <label>Search</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
            <input @input="filter" v-model.number="filterBy.minPrice" type="number" placeholder="Min Price">
            <input @input="filter" v-model.number="filterBy.maxPrice" type="number" placeholder="Max Price">
            <router-link to="/book/add">Add Book</router-link>
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: '',
                maxPrice: ''
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy)
        }
    }
}