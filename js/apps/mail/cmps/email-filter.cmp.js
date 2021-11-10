
export default {
    template: `
        <div class="gmail-filter">
            <div class="filter" @click="filter('inbox') " :class="{ select:isInbox }" >
                <i class="fas fa-inbox"></i>
                <p>Inbox</p>
            </div>
            <div class="filter" @click="filter('starred')" :class="{ select:isStarred }" >
            <i class="fas fa-star"></i>
                <p>Starred</p>
            </div>
            <div class="filter" @click="filter('sent')" :class="{select:isSent}" >
            <i class="far fa-share-square"></i>
                <p>Sent</p>
            </div>
            <div class="filter" @click="filter('drafts')" :class="{select:isDrafts}">
            <i class="far fa-sticky-note"></i>
                <p>Drafts</p>
            </div>
            <div class="filter" @click="filter('trash')" :class="{select:isTrash}" >
            <i class="fas fa-trash"></i>
                <p>Trash</p>
            </div>
          
        </div>
    `,
    data() {
        return {
            filterBy: null,

            isSelect: false,
            isInbox: false,
            isStarred: false,
            isSent: false,
            isDrafts: false,
            isTrash: false

        };
    },
    methods: {
        filter(sort) {
            this.$emit('filtered', sort)
            if (sort === 'inbox') {
                this.isInbox = !this.isInbox
                this.isSelect =false,
                this.isStarred = false,
                this.isSent = false,
                this.isDrafts = false,
                this.isTrash = false
            }
            if (sort === 'starred'){
                this.isStarred = !this.isStarred
                this.isInbox = false
                this.isSelect = false,
                this.isSent = false,
                this.isDrafts = false,
                this.isTrash = false
            }
            if (sort === 'sent'){
                this.isSent = !this.isSent
                this.isInbox = false
                this.isSelect = false,
                this.isStarred  = false,
                this.isDrafts = false,
                this.isTrash = false
            }
            if (sort === 'drafts'){
                this.isDrafts = !this.isDrafts
                this.isInbox = false
                this.isSelect = false,
                this.isStarred  = false,
                this.isSent = false,
                this.isTrash = false
            }
            if (sort === 'trash'){
                this.isTrash = !this.isTrash
                this.isInbox = false
                this.isSelect = false,
                this.isStarred  = false,
                this.isSent = false,
                this.isDrafts = false
            }
            isTrash
        },
        changeColor() {
            this.isSelect = !this.isSelect
        },
    }
}