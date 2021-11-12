import { emailService } from '../services/email.service.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import { eventBus } from '../../../../services/event-bus-service.js';

export default {
    components: {
        emailService,
        emailFilter
    },
    template: `<main class="email-details-container">
        <section>
        <email-filter @click.native="filter"/>
        </section>
        <section v-if="email" class="email-details app-main">
            <div class="email-title">
                <p>{{email.subject}}</p>
                <div class="email-icons">
                    <i class="fas fa-share" @click="filter"></i>
                    <i class="fas fa-paper-plane"></i>
                    <i class="fas fa-trash" @click="deleteEmail(email.id)"></i>
                </div>
            </div>
            <div class="send-details">
                <i class="far fa-user icon"></i>
                <p>{{email.sendBy}}</p>
                <p>{{email.to}}</p>
                <p>{{email.sentAt}}</p>
            </div>
           <p v-for="p in email.title">
               {{p}}
           </p>
        </section>
</main>
    `,
    data() {
        return {
            email: null,
            emailId: '',
        };
    },
    created() {
        const { mailId } = this.$route.params;
        emailService.getById(mailId)
            .then(email => this.email = email);
    },
    watch: {

    },
    methods: {
        filter() {
            this.$router.push('/mail')
        },
        deleteEmail(emailId) {
            eventBus.$emit('removeEmail', emailId);
            this.filter()
        },
    },
    computed: {

    },
}