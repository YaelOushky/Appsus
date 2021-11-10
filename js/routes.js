import homePage from './pages/home-page.cmp.js';
import mailApp from './apps/mail/pages/email-app.cmp.js';
import keepApp from './apps/keep/pages/note-app.cmp.js';
import emailDetails from './apps/mail/pages/email-details.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path: '/mail/:mailId',
        component: emailDetails
    },
    {
        path: '/keep',
        component: keepApp
    },
  
];


export const router = new VueRouter({ routes });