import { utilService } from '../../../../services/util-service.js';
import { storageService } from '../../../../services/async-storage-service.js';

const EMAILS_KEY = 'emails'

const gMails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title:[ `This is your day yaeli, make it legendary. 
        Here's a special surprise from TML by Tomorrowland to celebrate your birthday and to cherish unforgettable memories.
        
         `, `* This -20% voucher is valid with no minimum purchase order amount and is exclusively for you.
         Offer valid within 48 hours after the receiving date of this email`],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: true,
        isTrash: false,
        isDrafts: false,
    },
    {
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title:[ 'Would love to catch up sometimes Would love to catch up sometimes ', 'Would love to catch up sometimes Would love to catch up sometimes '],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: false,
        isTrash: false,
        isDrafts: false,
    },
    {
        id: 'e103',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title:[ 'Would love to catch up sometimes Would love to catch up sometimes ', 'Would love to catch up sometimes Would love to catch up sometimes '],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: false,
        isTrash: false,
        isDrafts: false,
    },
]

_createMails()

export const emailService = {
    query,
    remove,
    save,
    getById,
    // addReview,
    // searchBooks,
    // getNextBookId,
    // getPreviousBookId
};

function save(mail) {
    if (mail.id) return storageService.put(EMAILS_KEY, mail);
    else return storageService.post(EMAILS_KEY, mail);
}

function convertTimestamp(timestamp = Date.now()) {
    var date = new Date(timestamp);
    return (
        getMonth()+ ' '+
        date.getDate() 
       
    );
}

function getMonth(){
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    let month = months[d.getMonth()];
    return month
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId);
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId)
        .then(email => {
            return email
        })
}
function query() {
    return storageService.query(EMAILS_KEY);
}

function _createMails() {
    let mails = utilService.loadFromStorage(EMAILS_KEY);
    if (!mails || !mails.length) {
        mails = gMails
        utilService.saveToStorage(EMAILS_KEY, mails);
    }
}