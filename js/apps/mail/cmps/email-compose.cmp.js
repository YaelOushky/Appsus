import { emailService } from '../services/email.service.js';
import { utilService } from '../../../../services/util-service.js';
import { eventBus } from '../../../../services/event-bus-service.js';

export default {
    components: {
        emailService,
        eventBus,
        utilService
    },
    template: `
    <section>
        <p class="logo-plus" @click="openModal">Compose</p>
<div class="new-mail" v-if="isOpen">
    <p> New Message</p>
   <div>
        To: 
        <input type="text" name="" id="" v-model="to" required>
    </div>
        <label >
        Cc:
        <input type="text" name="" id="" v-model="cc">
        </label>
        <label >
        Bcc:
        <input type="text" name="" id="" v-model="bcc">
        </label>
  
        <label >
       Subject
        <input type="text" name="" id="" v-model="subject" required>
        </label>
        <textarea class="free-txt"  type="text" placeholder="" cols="30" rows="20" v-model="body" required></textarea>
                <button @click="addMail" >Send</button>
  
</div>
    </section>

    `,
    data() {
        return {
            isOpen: false,
            to: '',
            cc: '',
            bcc: '',
            subject: '',
            body: ''
        };
    },
    methods: {
        openModal() {
            this.isOpen = !this.isOpen
        },
        addMail() {
            this.openModal()
            var mail = {
                subject: this.subject,
                body: this.subject,
                title: [this.body],
                isRead: false,
                sentAt: emailService.convertTimestamp(),
                to: this.to,
                sendBy: 'You',
                isStar: false,
                isTrash: false,
                isDrafts: false,
                isSent: true
            };
            emailService.save(mail)
            .then(()=>{
                eventBus.$emit('refresh');
            })
        },

    }
}