import { emailService } from '../services/email.service.js';

export default {
    props: ['email'],
    components: {
        emailService,
    },
    template: `
        <div class="email-preview"  @click="setDetails(email.id)">
        <p class="far fa-star" :class="{checked:isSelect}" @click.stop="changeColor"></p>
           <p>{{email.subject}}</p>
           <p>{{emailDescription}}</p>
           <p>{{email.sentAt}}</p>
           <i :class="setIcon" ></i>
            <!-- <i class="fas fa-envelope-open" v-if="email.isRead"></i> -->
            <i class="fas fa-trash" @click.stop="deleteEmail(email.id)" ></i>
        </div>
    `,
    data() {
        return {
            isSelect : false
        }
    },
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
    methods: {
        changeColor(){
            this.isSelect  = !this.isSelect 
        },
        deleteEmail(emailId) {
            console.log(emailId);
            if (!this.email.isTrash) {
                this.email.isTrash = true
                emailService.save(this.email)
            } else {
                this.$emit('remove', emailId);
            }
        },
        setDetails(id) {
            this.email.isRead = !this.email.isRead
            this.$router.push(`/mail/${id}`)
        }
    },

}