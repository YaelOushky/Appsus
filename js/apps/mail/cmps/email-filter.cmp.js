export default {
    template: `
        <div class="gmail-filter">
            <div class="filter" @click="filter('inbox') " :class={select:selects.inbox}>
                <i class="fas fa-inbox"></i>
                <p>Inbox</p>
            </div>
            <div class="filter" @click="filter('starred')" :class={select:selects.starred} >
            <i class="fas fa-star"></i>
                <p>Starred</p>
            </div>
            <div class="filter" @click="filter('sent')" :class={select:selects.sent} >
            <i class="far fa-share-square"></i>
                <p>Sent</p>
            </div>
            <div class="filter" @click="filter('drafts')" :class={select:selects.drafts}>
            <i class="far fa-sticky-note"></i>
                <p>Drafts</p>
            </div>
            <div class="filter" @click="filter('trash')" :class={select:selects.trash} >
            <i class="fas fa-trash"></i>
                <p>Trash</p>
            </div>
          
        </div>
    `,
    data() {
        return {
            filterBy: null,
            isSelect: false,
            selects: {
                inbox: false,
                starred: false,
                sent: false,
                drafts: false,
                trash: false
            }

        };
    },
    methods: {
        filter(sort) {
            this.$emit('filtered', sort)
            for (const key in this.selects) {
                if (key !== sort) {
                    this.selects[key] = false
                } else this.selects[key] = true
            }
        }
    },
    changeColor() {
        this.isSelect = !this.isSelect
    },
    computed: {}
}