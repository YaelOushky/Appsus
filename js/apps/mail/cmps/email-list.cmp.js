import emailPreview from './email-preview.cmp.js';
import {emailService} from '../services/email.service.js';

export default {
    props: ['emails'],
    components: {
        emailPreview,
        emailService
    },
    template: `
        <section class="email-list app-main">
            <ul>
                <li v-for= "email in emails" :key="email.id" class="email-preview-container">
                <email-preview :email="email" @remove="deleteEmail"/>
                </li>
            </ul>
        </section>
    `,
    methods:{
        deleteEmail(emailId){
            this.$emit('remove', emailId);
        }
    },
}