import { utilService } from '../../../../services/util-service.js';
import { storageService } from '../../../../services/async-storage-service.js';

const EMAILS_KEY = 'emails'

const gMails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title: [`This is your day yaeli, make it legendary. 
        Here's a special surprise from TML by Tomorrowland to celebrate your birthday and to cherish unforgettable memories.
        
         `, `* This -20% voucher is valid with no minimum purchase order amount and is exclusively for you.
         Offer valid within 48 hours after the receiving date of this email`, `ntegration is acceleration—and in Adobe XD, you have dozens of plugins at your fingertips. Share designs instantly, update copy more easily, test your concepts, and more.	 
 	
         `, `Adobe, the Adobe logo, and the Adobe XD logo are either registered trademarks or trademarks of Adobe Systems Incorporated in the United States and/or other countries. All other trademarks are the property of their respective owners.

         This is a marketing email from Adobe Systems Software Ireland Limited, 4‑6 Riverwalk, Citywest Business Park, Dublin 24, Ireland.
         
         Click here to unsubscribe or send an unsubscribe request to the postal address above. Please review the Adobe Privacy Policy.
         
         To ensure future delivery of email, add mail@email.adobe.com to your address book, contacts, or safe senders list.
         
         Registered office: Adobe Systems Software Ireland Limited, 4‑6 Riverwalk, Citywest Business Park, Dublin 24, Ireland. Registered number: 344992`],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: true,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title: ['Would love to catch up sometimes Would love to catch up sometimes ', 'Would love to catch up sometimes Would love to catch up sometimes '],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e103',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title: ['Would love to catch up sometimes Would love to catch up sometimes ', 'Would love to catch up sometimes Would love to catch up sometimes '],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e104',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title: ['Would love to catch up sometimes Would love to catch up sometimes ', 'Would love to catch up sometimes Would love to catch up sometimes '],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e105',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title: ['Would love to catch up sometimes Would love to catch up sometimes ', 'Would love to catch up sometimes Would love to catch up sometimes '],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e106',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title: ['Would love to catch up sometimes Would love to catch up sometimes ', 'Would love to catch up sometimes Would love to catch up sometimes '],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e107',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title: ['Would love to catch up sometimes Would love to catch up sometimes ', 'Would love to catch up sometimes Would love to catch up sometimes '],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e108',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title: ['Would love to catch up sometimes Would love to catch up sometimes ', 'Would love to catch up sometimes Would love to catch up sometimes '],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'momo@momo.com',
        sendBy: 'Wizz Air',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
]

_createMails()

export const emailService = {
    query,
    remove,
    save,
    getById,
    convertTimestamp,
    getEmptyMail
};


function getEmptyMail() {
    return {
        subject: '',
        body: '',
        title: [''],
        isRead: false,
        sentAt: convertTimestamp(),
        to: '',
        sendBy: '',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false,
        isDrafts: true
    }
}


function save(mail) {
    if (mail.id) return storageService.put(EMAILS_KEY, mail);
    else return storageService.post(EMAILS_KEY, mail);
}

function convertTimestamp(timestamp = Date.now()) {
    var date = new Date(timestamp);
    return (
        getMonth() + ' ' +
        date.getDate()

    );
}

function getMonth() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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