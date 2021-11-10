
export default {
    template: `
        <div class="gmail-filter">
            <div class="filter" @click="filter('inbox')">
                <i class="fas fa-inbox"></i>
                <p>Inbox</p>
            </div>
            <div class="filter" @click="filter('starred')">
            <i class="fas fa-star"></i>
                <p>Starred</p>
            </div>
            <div class="filter" @click="filter('sent')">
            <i class="far fa-share-square"></i>
                <p>Sent</p>
            </div>
            <div class="filter" @click="filter('drafts')">
            <i class="far fa-sticky-note"></i>
                <p>Drafts</p>
            </div>
            <div class="filter" @click="filter('trash')">
            <i class="fas fa-trash"></i>
                <p>Trash</p>
            </div>
          
        </div>
    `,
    data() {
        return {
            filterBy:null,
        };
    },
    methods: {
        filter(sort) {
            this.$emit('filtered', sort)
        }
    }
}