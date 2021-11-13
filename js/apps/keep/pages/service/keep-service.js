import { utilService } from '../../../../../services/util-service.js';
import { storageService } from '../../../../../services/async-storage-service.js';
// import { secrets } from '../../../../../.git.js';


const NOTE_KEY = 'note';
var gNote = _createNotes()
const Tube_KEY = 'AIzaSyDFP3SASYNHeIccEYCJT943kU9tP_7OM9I'
    // console.log(Tube_KEY);
export const noteService = {
    query,
    getById,
    updateNote,
    remove,
    getEmptyNote,
    save,
    getEmptyTodo,
    getYoutubeVid,
};


function query() {
    return storageService.query(NOTE_KEY)
}

function remove(noteId) {
    // return Promise.reject('Big balagan!')
    return storageService.remove(NOTE_KEY, noteId);
}

function updateNote(note) {
    return storageService.put(NOTE_KEY, note);
}

function getById(noteId) {
    return storageService.get(NOTE_KEY, noteId);
}

function save(note) {
    if (note.id) return storageService.put(NOTE_KEY, note);
    else return storageService.post(NOTE_KEY, note);
}

function getEmptyNote() {
    return {
        type: 'noteTxt',
        isPinned: false,
        info: {
            tube: '',
            url: '',
            subtitle: '',
            title: '',
            todos: [],
        },
        style: {
            backgroundColor: 'white'
        }
    }
}


function getEmptyTodo() {
    return {
        id: utilService.makeId(),
        txt: '',
        doneAt: null,
        createdAt: Date.now(),
    }
}

const TUBE_KEY = 'vidsDB'

function getYoutubeVid(val) {
    console.log(val);
    var vids = utilService.loadFromStorage(TUBE_KEY) || {}
    if (vids && vids[val]) return Promise.resolve(vids)
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${Tube_KEY}&q=${val}`)
        .then(res => {
            console.log('getting data from server');
            vids[val] = res.data.items
                // console.log(vids[val]);
            utilService.saveToStorage(TUBE_KEY, vids[val])
            return res.data.items;
        })
}







function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = notes = [{
                id: "n100",
                type: "noteTxt",
                isPinned: true,
                info: {
                    tube: '',
                    url: 'img/bobby.jpg',
                    subtitle: '',
                    title: "Bobby & Me  ",
                    todos: [],
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n101",
                type: "noteTxt",
                isPinned: false,
                info: {
                    tube: '',
                    url: '',
                    title: "Wedding NOV",
                    subtitle: "Noa wedding 20.11  ",
                    todos: [],
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n102",
                type: "noteTxt",
                isPinned: false,
                info: {
                    tube: '',
                    url: 'img/vacation.jpg',
                    subtitle: '',
                    title: "Costa Rica ",
                    todos: [],
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n103",
                type: "noteTube",
                isPinned: false,
                info: {
                    tube: 'https://www.youtube.com/embed/nxUw6B05pkc',
                    url: '',
                    subtitle: '',
                    title: 'bla',
                    todos: [],
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n104",
                type: "noteTodos",
                isPinned: false,
                info: {
                    tube: '',
                    url: '',
                    subtitle: '',
                    label: "Get my stuff together",
                    title: "Groceries",
                    todos: [{
                            id: utilService.makeId(),
                            txt: "milk",
                            doneAt: null,
                            createdAt: Date.now() + 50,
                        },
                        {
                            id: utilService.makeId(),
                            txt: "bamba",
                            doneAt: 187111111,
                            createdAt: Date.now(),
                        },
                        {
                            id: utilService.makeId(),
                            txt: "black coffee",
                            doneAt: 187111111,
                            createdAt: Date.now(),
                        },
                        {
                            id: utilService.makeId(),
                            txt: "Tehina",
                            doneAt: 187111111,
                            createdAt: Date.now(),
                        },
                        {
                            id: utilService.makeId(),
                            txt: "honey",
                            doneAt: 187111111,
                            createdAt: Date.now(),
                        },

                    ]
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n105",
                type: "noteTxt",
                isPinned: false,
                info: {
                    tube: '',
                    url: 'img/baby.jpg',
                    subtitle: '',
                    title: "My Baby ",
                    todos: [],
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n106",
                type: "noteTxt",
                isPinned: false,
                info: {
                    tube: '',
                    url: 'img/work.jpg',
                    subtitle: '',
                    title: "Work Is My Life  ",
                    todos: [],
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n107",
                type: "noteTxt",
                isPinned: false,
                info: {
                    tube: '',
                    url: '',
                    title: "Final Sprint Kickoff",
                    subtitle: "30.11  ",
                    todos: [],
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n108",
                type: "noteTxt",
                isPinned: false,
                info: {
                    tube: '',
                    url: '',
                    title: "Password: aligator_33",
                    subtitle: "  ",
                    todos: [],
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n109",
                type: "noteTodos",
                isPinned: false,
                info: {
                    tube: '',
                    url: '',
                    subtitle: '',
                    label: "Get my stuff together",
                    title: "Movies",
                    todos: [{
                            id: utilService.makeId(),
                            txt: "Two Distant Strangers",
                            doneAt: null,
                            createdAt: Date.now() + 50,
                        },
                        {
                            id: utilService.makeId(),
                            txt: "Love and Monsters",
                            doneAt: null,
                            createdAt: Date.now(),
                        },
                        {
                            id: utilService.makeId(),
                            txt: "Ex Machina",
                            doneAt: null,
                            createdAt: Date.now(),
                        },
                        {
                            id: utilService.makeId(),
                            txt: "His House",
                            doneAt: null,
                            createdAt: Date.now(),
                        },
                        {
                            id: utilService.makeId(),
                            txt: "My Octopus Teacher",
                            doneAt: null,
                            createdAt: Date.now(),
                        },

                    ]
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n110",
                type: "noteTube",
                isPinned: false,
                info: {
                    tube: 'https://www.youtube.com/embed/8XskjcJhFVY',
                    url: '',
                    subtitle: '',
                    title: 'bla',
                    todos: [],
                },
                style: {
                    backgroundColor: 'white'
                }
            },
        ];
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}