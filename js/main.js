import appHeader from './cmps/app-header.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';
import userMsg from './../js/cmps/user-msg.cmp.js';
import { router } from './routes.js';

const options = {
    el: '#app',
    router,
    template: `
        <section class="container">
            <app-header />
            <user-msg />
            <router-view class="router-view" />
            <app-footer />
        </section>
    `,
    components: {
        appHeader,
        appFooter,
        userMsg
    }
};

new Vue(options);