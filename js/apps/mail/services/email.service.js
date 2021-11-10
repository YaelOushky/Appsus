import { utilService } from '../../../../services/util-service.js';
import { storageService } from '../../../../services/async-storage-service.js';

const EMAILS_KEY = 'emails'

const gMails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love to catch up sometimes',
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com'
    },
    {
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com'
    },
    {
        id: 'e103',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com'
    },
]

_createMails()

export const emailService = {
    query,
    remove,
    // save,
    getById,
    // addReview,
    // searchBooks,
    // getNextBookId,
    // getPreviousBookId
};

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