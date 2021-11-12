import homePage from './pages/home-page.cmp.js';
import mailApp from './apps/mail/pages/email-app.cmp.js';
import keepApp from './apps/keep/pages/note-app.cmp.js';
import emailDetails from './apps/mail/pages/email-details.cmp.js';
import bookApp from './apps/book/pages/book-app.cmp.js';
import bookAdd from './apps/book/cmps/book-add.cmp.js';
import bookDetails from './apps/book/pages/book-details.cmp.js';

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
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/add',
        component: bookAdd
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
];


export const router = new VueRouter({ routes });