export default {
    template: `
        <div class="note-filter">
            <button @click="filter">Search</button>
           
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
        
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',

            }
        };
    },
    methods: {
        filter() {
            console.log(this.filterBy);
            this.$emit('filtered', {...this.filterBy });
        },
    }
}