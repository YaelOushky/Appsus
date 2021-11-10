

export default {
    props: ['email'],
    components: {
       
    },
    template: `
        <div class="email-preview" @click="email.isRead = !email.isRead">
           <p class="fa fa-star"></p>
           <p>{{email.subject}}</p>
           <p>{{emailDescription}}</p>
           <p>{{email.sentAt}}</p>
           <i :class="setIcon" ></i>
            <!-- <i class="fas fa-envelope-open" v-if="email.isRead"></i> -->
            <i class="fas fa-trash" @click="deleteEmail(email.id)"></i>
        </div>
    `,
    watch: {

    },
    computed: {
        emailDescription() {
            var cut = this.email.body.substring(0, 60)
            return cut
        },
        setIcon() {
            if (this.email.isRead) return 'fas fa-envelope-open'
            return 'fas fa-envelope'
        }
    },
    methods:{
        deleteEmail(emailId){
            this.$emit('remove', emailId);
        }
    },
   
}