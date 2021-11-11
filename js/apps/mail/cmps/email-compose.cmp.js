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
        <input type="text" name="" id="" v-model="NewEmail.to" required>
    </div>
        <label >
        Cc:
        <input type="text" name="" id="" >
        </label>
        <label >
        Bcc:
        <input type="text" name="" id="" >
        </label>
  
        <label >
       Subject
        <input type="text" name="" id="" v-model="NewEmail.subject" required>
        </label>
        <textarea class="free-txt"  type="text" placeholder="" cols="30" rows="20" v-model="NewEmail.title" required></textarea>
                <button @click="addMail" >Send</button>
                <button @click="cancel" >Cancel</button>
  
</div>
    </section>

    `,
    data() {
        return {
            isOpen: false,
            myInterval: null,
            NewEmail: null
        };
    },
    created() {
        this.NewEmail = emailService.getEmptyMail()
    },
    destroyed() {
        clearInterval(this.myInterval)
    },
    watch: {
        NewEmail: function (val) {
            this.saveDraft()
        }
    },

    methods: {
        cancel() {
            clearInterval(this.myInterval)
            this.isOpen = false
            this.NewEmail.isDrafts = true
        },
        saveDraft() {
            this.NewEmail.isSave = false
            this.myInterval = setInterval(() => {
                emailService.save(this.NewEmail)
                    .then(() => {
                        eventBus.$emit('refresh');
                    })
            }, 5000);
        },
        openModal() {
            this.isOpen = !this.isOpen
        },
        addMail() {
            clearInterval(this.myInterval)
            console.log(this.NewEmail);
            this.openModal()
            this.NewEmail.isSent = true
            this.NewEmail.isDrafts = false
            emailService.save(this.NewEmail)
                .then(() => {
                    eventBus.$emit('refresh');
                })
        },

    }
}