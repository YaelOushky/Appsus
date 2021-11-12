import { utilService } from '../../../../../services/util-service.js';
import { storageService } from '../../../../../services/async-storage-service.js';


const NOTE_KEY = 'note';
const Tube_KEY = 'AIzaSyDFP3SASYNHeIccEYCJT943kU9tP_7OM9I'
var gNote = _createNotes()

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
        // console.log();
        // if (vids && vids[val]) 
    return Promise.resolve(vids)
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
                id: "n101",
                type: "noteTxt",
                isPinned: true,
                info: {
                    tube: '',
                    url: '',
                    subtitle: "Fullstack Me Baby!",
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
                    url: '',
                    subtitle: '',
                    title: "Bobi and Me",
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
                    tube: 'https://www.youtube.com/embed/VP3xjJFfLS8',
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
                    title: "Bobi and Me",
                    todos: [{
                            id: utilService.makeId(),
                            txt: "Driving liscence",
                            doneAt: null,
                            createdAt: Date.now() + 50,
                        },
                        {
                            id: utilService.makeId(),
                            txt: "Coding power",
                            doneAt: 187111111,
                            createdAt: Date.now(),
                        }
                    ]
                },
                style: {
                    backgroundColor: 'white'
                }
            }
        ];
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}