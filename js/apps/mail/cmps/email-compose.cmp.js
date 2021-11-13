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
    <section class="email-compose" >
        <p class="logo-plus" @click="openModal">Compose</p>
        <transition name="slide-fade">
        <div class="new-mail"  v-if="show">
            <p> New Message</p>
            <div class="input-line">
                To: 
                <input type="text"  v-model="NewEmail.to" required>
            </div>
            <!-- <label class="input-line">
                Cc:
                <input type="text"  >
            </label>
            <label class="input-line">
                Bcc:
                <input type="text"  >
            </label> -->
            <label class="input-line">
                Subject
                <input type="text" name="" id="" v-model="NewEmail.subject" required>
            </label>
            <textarea class="free-txt"  type="text" placeholder="" cols="30" rows="20" v-model="NewEmail.title" required></textarea>
            <div class="email-compose-btn">
                <button @click="addMail" >Send</button>
                <button @click="cancel" class="btn-cancel">Cancel</button>
            </div>
  
        </div>
    </transition>
    </section>
    `,
    data() {
        return {
            // isOpen: false,
            myInterval: null,
            NewEmail: null,
            show: false,
        };
    },
    created() {
        this.NewEmail = emailService.getEmptyMail()
    },
    destroyed() {
        clearInterval(this.myInterval)
    },
    methods: {
        cancel() {
            clearInterval(this.myInterval)
            this.show = false
            this.NewEmail.isDrafts = true
            const msg = {
                txt: 'Add To Your Drafts',
                type: 'success'
            };
            eventBus.$emit('showMsg', msg);
        },
        saveDraft() {
            this.NewEmail.isSave = false
            // this.myInterval = setInterval(() => {
            emailService.save(this.NewEmail)
                .then(() => {
                    eventBus.$emit('refresh');
                })
            // }, 5000);
        },
        openModal() {
            this.show = !this.show
        },
        addMail() {
            clearInterval(this.myInterval)
            this.openModal()
            this.NewEmail.isSent = true
            this.NewEmail.isDrafts = false
            emailService.save(this.NewEmail)
                .then(() => {
                    const msg = {
                        txt: 'Send successfully',
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                    eventBus.$emit('refresh');
                })
        },

    }
}