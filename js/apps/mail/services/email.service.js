import {
    utilService
} from '../../../../services/util-service.js';
import {
    storageService
} from '../../../../services/async-storage-service.js';

const EMAILS_KEY = 'emails'

const gMails = [{
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes Would love',
        title: [`This is your day yaeli, make it legendary. 
        Here's a special surprise from TML by Tomorrowland to celebrate your birthday and to cherish unforgettable memories.
        
         `, `Adobe, the Adobe logo, and the Adobe XD logo are either registered trademarks or trademarks of Adobe Systems Incorporated 
         in the United States and/or other countries. All other trademarks are the property of their respective owners.

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
        subject: 'Canva updates',
        body: 'Canva updates, as told by you Advertisement',
        title: [`Hi there,

        It’s one thing for us to tell you about new features, but it’s so much more special when we can share how these updates 
        have helped people unlock their inner designer and achieve their goals! Here are a few of our favourite tweets from the 
        last few months as people explore what’s new:`, `“I have been playing with the Canva Video Editor today. You NEED to try it to see how awesome it really is. 
        💯 @Canva is truly becoming a one-stop shop for creativity!`, `“Whaaatt!!?? You can now SCREEN RECORD in @canva Just another reason to love it!”`, `Thanks to our community for sharing your #canvalove

        The Canva Team`],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'start@engage.canva.com',
        sendBy: 'Canva',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e103',
        subject: 'A State Of Trance!',
        body: 'A State Of Trance 1000 Mexico!',
        title: [`Dear ASOT-fan,
        Although we haven't been able to celebrate the 1000th episode of ASOT to the fullest yet, we're more than happy that in a few days' time, we'll 
        be able to reunite with our Mexican trance family! On the 19th of November, we will turn Foro Sol in Mexico City into our dancefloor and celebrate
         with not one, but TWO stages with some of the best trance artists!
        
        `, `Lineup (A-Z): Allen Watts | Alpha 9 | Armin van Buuren (2-hour set) | Blastoyz | Chris Schweizer | Craig Connelly | Farius | Gabriel & Dresden | Gareth Emery | Genix | Key4050 | Leo Reyes | Rodg | Ruben de Ronde | Super8 & Tab | ZAA
        `, `Not able to join us in real life, but don't want to miss out on all the ASOT action? In that case, we have great news for you too! Get your streaming party ready and join us via the live stream on Facebook and YouTube. The live stream will start at 17:50h CST (Mexican local time), so check out our world map below to see what time you need to tune in!

        `],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'newsletter@armadamusic.com',
        sendBy: 'A State Of Trance',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e104',
        subject: 'Can I be frank?',
        body: 'The clock is ticking...',
        title: [`The clock is ticking...

        I haven't heard from you yet, so I just wanted to make sure you’ve heard the news.
        
        If you have been on the fence about joining The Motley Fool...today is your day!
        
        Because we're taking up to 78% Off the list price for new members1 of The Motley Fool today in our special Double Down Event!
        
        And even better, thanks to our ironclad guarantee...you can take a full 30 days to "kick the tires"...and still get your entire membership fee back if you're not completely satisfied.
        
        But please don't delay...because like I said earlier the clock is ticking.
        
        And I can't guarantee this offer will be open tomorrow.`,`Since inception in 2002, our flagship service's average stock pick has returned over 683%, which is more than quadruple the return of the market!

        When you become a Motley Fool member, you'll be joining a thriving community of likeminded investors that love this service. And I'm confident you `,],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'fool@foolsubs.com',
        sendBy: 'The Motley Fool',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e105',
        subject: 'One last chance! Get $50 to start investing',
        body: 'Real Rewards by American Eagle',
        title: [`Real Rewards by American Eagle & Aerie members earn points on purchases (after discounts and before taxes and fees) made at American Eagle Outfitters® and Aerie®. Click here for Real Rewards by American Eagle & Aerie terms and conditions. See Real Rewards by American Eagle & Aerie terms and conditions to end your membership in Real Rewards. If you end your membership, you will no longer receive your free benefits, points towards rewards and email updates.
        `, `See the Real Rewards by American Eagle & Aerie Program terms and conditions for details at ae.com/realrewards/terms.

        *Cardholder offers are subject to credit approval and a Real Rewards credit card must be used as the sole payment type. See here for details.
        © 2021 AEO Management Co. All Rights Reserved.
        `],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'ae@e.ae.com',
        sendBy: 'Real Rewards by AE & Aerie',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e106',
        subject: 'Re-use your best content',
        body: 'Re-use. Reformat .Really easily.',
        title: [`Re-use. Reformat .Really easily.
        Re-using the valuable information in your PDFs is as easy as saving a file with Acrobat Pro DC.
        `, `Convert PDF files to editable Microsoft Word, Excel, PowerPoint files, even from your mobile phone or tablet. Spend less time reformatting complex documents – and stay productive wherever you are.
        Buy now`,'Would love to catch up sometimes Would love to catch up sometimes ',`Adobe services, like Adobe Creative Cloud, are available only to users 13 and older. Use of Adobe services and applications requires agreement with the applicable Terms of Use and the Adobe Privacy Policy.

        Adobe, Adobe Acrobat and the Adobe logo are either registered trademarks or trademarks of Adobe in the United States and/or other countries. All other trademarks are the property of their respective owners.
        `],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'mail@mail.adobe.com',
        sendBy: 'Adobe Acrobat',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e107',
        subject: 'Exclusive live EP + new My Universe remix',
        body: 'NEW LIVE EP OUT TODAY',
        title: [`Hello everyone. Following the band's venue-opening show at Seattle’s new Climate Pledge Arena last month, an exclusive Live EP has been released today. The four-track EP, Live From Climate Pledge Arena, features Viva La Vida and Fix You alongside two songs from the new album Music Of The Spheres. It's available now exclusively on Amazon Music	
        `, `NEW GALANTIS REMIX OF MY UNIVERSE
        `,`Today also sees the release of a new remix of My Universe by Swedish electronic super duo Galantis. The track is available to stream / download everywhere now
        `,`The Coldplay Messenger`],
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
        title: [`This is your day yaeli, make it legendary. 
        Here's a special surprise from TML by Tomorrowland to celebrate your birthday and to cherish unforgettable memories.
        
         `, `Adobe, the Adobe logo, and the Adobe XD logo are either registered trademarks or trademarks of Adobe Systems Incorporated 
         in the United States and/or other countries. All other trademarks are the property of their respective owners.

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
        id: 'e109',
        subject: 'Canva updates',
        body: 'Canva updates, as told by you Advertisement 💯',
        title: [`Hi there,

        It’s one thing for us to tell you about new features, but it’s so much more special when we can share how these updates 
        have helped people unlock their inner designer and achieve their goals! Here are a few of our favourite tweets from the 
        last few months as people explore what’s new:`, `“I have been playing with the Canva Video Editor today. You NEED to try it to see how awesome it really is. 
        💯 @Canva is truly becoming a one-stop shop for creativity!`, `“Whaaatt!!?? You can now SCREEN RECORD in @canva Just another reason to love it!”`, `Thanks to our community for sharing your #canvalove

        The Canva Team`],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'start@engage.canva.com',
        sendBy: 'Canva',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e110',
        subject: 'A State Of Trance!',
        body: 'A State Of Trance 1000 Mexico!',
        title: [`Dear ASOT-fan,
        Although we haven't been able to celebrate the 1000th episode of ASOT to the fullest yet, we're more than happy that in a few days' time, we'll 
        be able to reunite with our Mexican trance family! On the 19th of November, we will turn Foro Sol in Mexico City into our dancefloor and celebrate
         with not one, but TWO stages with some of the best trance artists!
        
        `, `Lineup (A-Z): Allen Watts | Alpha 9 | Armin van Buuren (2-hour set) | Blastoyz | Chris Schweizer | Craig Connelly | Farius | Gabriel & Dresden | Gareth Emery | Genix | Key4050 | Leo Reyes | Rodg | Ruben de Ronde | Super8 & Tab | ZAA
        `, `Not able to join us in real life, but don't want to miss out on all the ASOT action? In that case, we have great news for you too! Get your streaming party ready and join us via the live stream on Facebook and YouTube. The live stream will start at 17:50h CST (Mexican local time), so check out our world map below to see what time you need to tune in!

        `],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'newsletter@armadamusic.com',
        sendBy: 'A State Of Trance',
        isStar: false,
        isTrash: false,
        isDrafts: false,
        isSent: false
    },
    {
        id: 'e111',
        subject: 'Can I be frank?',
        body: 'The clock is ticking...',
        title: [`The clock is ticking...

        I haven't heard from you yet, so I just wanted to make sure you’ve heard the news.
        
        If you have been on the fence about joining The Motley Fool...today is your day!
        
        Because we're taking up to 78% Off the list price for new members1 of The Motley Fool today in our special Double Down Event!
        
        And even better, thanks to our ironclad guarantee...you can take a full 30 days to "kick the tires"...and still get your entire membership fee back if you're not completely satisfied.
        
        But please don't delay...because like I said earlier the clock is ticking.
        
        And I can't guarantee this offer will be open tomorrow.`,`Since inception in 2002, our flagship service's average stock pick has returned over 683%, which is more than quadruple the return of the market!

        When you become a Motley Fool member, you'll be joining a thriving community of likeminded investors that love this service. And I'm confident you `,],
        isRead: false,
        sentAt: convertTimestamp(),
        to: 'fool@foolsubs.com',
        sendBy: 'The Motley Fool',
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