import { emailService } from '../services/email.service.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import { eventBus } from '../../../../services/event-bus-service.js';

export default {
    components: {
        emailService,
        emailFilter
    },
    template: `
    <main class="email-details-container">
        <section>
            <email-filter @click.native="filter" :counter="counter"/>
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
            <div class="send-body">
                <p v-for="p in email.title" >
                    {{p}}
                </p>
            </div>
            <pre>
        




            Contact information: Expedia, Attn: EMC Team 1111 Expedia Group Way W., Seattle WA 98119.
            Expedia cannot receive replies to this email.

            CST# 2029030-50

            Expedia Rewards terms and conditions apply

            © 2021 Expedia, Inc. All rights reserved.
            Expedia, Expedia Rewards, VIP Access and the Airplane logos are registered trademarks,
            or trademarks, of Expedia, Inc. in the U.S. and/or other countries.
            All other products are trademarks of their respective owners.

            </pre>
        </section>
    </main>
    `,
    data() {
        return {
            email: null,
            emailId: '',
            counter: 0,
        };
    },
    created() {
        const { mailId } = this.$route.params;
        emailService.getById(mailId)
            .then(email => this.email = email);
        eventBus.$on('counter', this.count);
    },
    methods: {
        filter() {
            this.$router.push('/mail')
        },
        deleteEmail(emailId) {
            eventBus.$emit('removeEmail', emailId);
            this.filter()
        },
        count(val) {
            this.counter = val
        }
    },
}