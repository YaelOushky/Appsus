import { router } from './routes.js';

const options = {
    el: '#app',
    router,
    template: `
        <section>
            <!-- <app-header /> -->
            <!-- <user-msg /> -->
            <router-view />
            <!-- <app-footer /> -->
        </section>
    `,
    components: {
        // appHeader,
        // appFooter,
        // userMsg
    }
};

new Vue(options);