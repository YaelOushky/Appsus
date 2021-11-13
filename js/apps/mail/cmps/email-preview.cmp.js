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
        <i class="far fa-star" :class="{checked:email.isStar}" @click.stop="changeColor(email)"></i>
           <p>{{email.subject}}</p>
           <p>{{emailDescription}}</p>
           <p>{{email.sentAt}}</p>
           <div class="icons-preview">
           <i class="fas fa-trash"  :class={opacity:!hover} @click.stop="deleteEmail(email.id)" ></i>
           <i :class="setIcon" @click.stop="toggleIcon(email)"></i>
            </div>
        </div>
    `,
    data() {
        return {
            hover: false,
        }
    },
    created() {

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
        },

    },
    methods: {
        toggleIcon(email) {
          email.isRead = !email.isRead
            emailService.save(email)
            .then(() => {
                eventBus.$emit('refresh')
            })
        },
        changeColor(email) {
            email.isStar = !email.isStar
            if (email.isStar) {
                const msg = {
                    txt: 'Add To Your Starred',
                    type: 'success'
                };
                eventBus.$emit('showMsg', msg);
            } else {
                const msg = {
                    txt: 'Remove From Your Starred',
                    type: 'success'
                };
                eventBus.$emit('showMsg', msg);
            }
            emailService.save(email)
                .then(() => {
                    eventBus.$emit('refresh')
                })
        },
        deleteEmail(emailId) {
            if (!this.email.isTrash) {
                console.log(emailId);
                this.email.isTrash = true
                emailService.save(this.email)
            } else {

                this.$emit('remove', emailId);
            }
        },
        setDetails(id) {
            this.email.isRead = true
            emailService.save(this.email)
            .then(() => {
                eventBus.$emit('refresh')
            })
            console.log(this.email.isRead);
            this.$router.push(`/mail/${id}`)
        }
    },

}