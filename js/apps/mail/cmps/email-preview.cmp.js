import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../services/event-bus-service.js';
export default {
    props: ['email'],
    components: {
        emailService,
        eventBus
    },
    template: `
        <div class="email-preview"  @click="setDetails(email.id)" @mouseover="hover = true"  @mouseleave="hover = false">
        <p class="far fa-star" :class="{checked:email.isStar}" @click.stop="changeColor(email)"></p>
           <p>{{email.subject}}</p>
           <p>{{emailDescription}}</p>
           <p>{{email.sentAt}}</p>
           <div>
           <i class="fas fa-trash" v-if="hover" @click.stop="deleteEmail(email.id)" ></i>
           <i :class="setIcon" ></i>
            </div>
           <!-- <i class="fas fa-envelope-open" v-if="email.isRead"></i> -->
        </div>
    `,
    data() {
        return {
            // isSelect : false,
            hover: false,
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
        changeColor(email){
            // this.isSelect  = !this.isSelect 
            email.isStar = !email.isStar
            emailService.save(email)
                .then(()=>{
                    eventBus.$emit('refresh')
                })
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
            this.$emit('refresh');
        }
    },

}