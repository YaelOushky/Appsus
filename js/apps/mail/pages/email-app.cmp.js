import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import { emailService } from '../services/email.service.js';

export default {
    components: {
        emailList,
        emailService,
        emailFilter
    },
    template: `
        <section class="email-app app-main">
            <email-filter @filtered="setFilter" />
            <email-list :emails="MailToShow" @selected="selectMail"  @remove="deleteEmail"/>
        </section>
    `,
    data() {
        return {
            emails: null,
            selectedMail: null,
            filterBy: null,
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
                    this.emailsToShow = emails
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
        setFilter(filterBy) {
            this.filterBy = filterBy;

        }

    },
    computed: {
        MailToShow() {
            if (!this.filterBy) return this.emails;
            if (this.filterBy === 'inbox') {
                return this.emails.filter(email => !email.isTrash)
            }
            if (this.filterBy === 'starred') {
                return this.emails.filter(email => email.isStar)
            }
            if (this.filterBy === 'drafts') {
               return this.emails.filter(email => email.isDrafts)
            }
            if (this.filterBy === 'trash') {
               return this.emails.filter(email => email.isTrash)
            }
            if (this.filterBy === 'sent') {
                // return console.log(sent);
            }
        },
    },
}