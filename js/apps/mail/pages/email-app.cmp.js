import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../../services/event-bus-service.js';

export default {
    components: {
        emailList,
        emailService,
        emailFilter,
        eventBus
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
            filterBy: '',
        };
    },
    created() {
        this.loadMails();
        eventBus.$on('refresh', () => {
            this.loadMails()
        });
        eventBus.$on('filterMail', this.setFilterSearch)
    },
    methods: {
        bla(txt) {
            console.log(txt);
        },

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
        },
        setFilterSearch(txt) {
            this.filterBy = txt
        },


    },
    computed: {
        MailToShow() {
            if (!this.filterBy) return this.emails;
            if (this.filterBy === 'inbox') {
                return this.emails.filter(email => !email.isTrash && !email.isDrafts)
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
                return this.emails.filter(email => email.isSent)
            }
            return this.blabla


        },

        blabla() {
            if (!this.filterBy) return this.emails = this.emails
            let filter = this.emails.filter(email => {
                return (email.subject.toLowerCase().includes(this.filterBy) ||
                    email.body.toLowerCase().includes(this.filterBy))
            })

            return filter
        }
    },
}