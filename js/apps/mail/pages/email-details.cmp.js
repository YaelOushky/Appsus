import { emailService } from '../services/email.service.js';


export default {
    components: {
        emailService,
    },
    template: `
        <section v-if="email" class="email-details app-main">
            <div class="email-title">
                <p>{{email.subject}}</p>
                <div class="email-icons">
                    <i class="fas fa-share"></i>
                    <i class="fas fa-paper-plane"></i>
                    <i class="fas fa-trash"></i>
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
    },
    computed: {

    },
}