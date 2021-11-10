import emailList from '../cmps/email-list.cmp.js';
import { emailService } from '../services/email.service.js';

export default {
    components: {
        emailList,
        emailService
    },
    template: `
        <section class="email-app app-main">
            <h1>email app</h1>
            <email-list :emails="emails" @selected="selectMail"  @remove="deleteEmail"/>
        </section>
    `,
    data() {
        return {
            emails: null,
            selectedMail: null

        };
    },
    created() {
        this.loadMails();
    },
    methods: {
        loadMails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                });
        },
        selectMail(mail) {
            this.selectedMail = mail;
        },
        deleteEmail(emailId) {
            console.log(emailId);
            emailService.remove(emailId)
                .then(() => {
                    // const msg = {
                    //     txt: 'Deleted successfully',
                    //     type: 'success'
                    // };
                    this.emails = this.emails.filter(email => email.id !== emailId)
                    // eventBus.$emit('showMsg', msg);

                })
            // .catch(err => {
            //     console.log('err', err);
            //     const msg = {
            //         txt: 'Error. Please try later',
            //         type: 'error'
            //     };
            //     eventBus.$emit('showMsg', msg);
            // });
        },

    },
}