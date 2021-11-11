import { utilService } from '../../../../../services/util-service.js';
import { storageService } from '../../../../../services/async-storage-service.js';


const NOTE_KEY = 'note';
var gNote = _createNotes()


export const noteService = {
    query,
    getById,
    updateNote,
    remove,
    getEmptyNote,
    save,
    getEmptyTodo,
};


function query() {
    return storageService.query(NOTE_KEY)
}

function remove(noteId) {
    // return Promise.reject('Big balagan!')
    return storageService.remove(NOTE_KEY, noteId);
}

function updateNote(note) {
    console.log(note);
    // if (book.reviews) return storageService.put(BOOKS_KEY, book);
    // else
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
        info: {
            txt: '',
            url: '',
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
        importance: false,
    }
}

// _createNotes()

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = notes = [{
                id: "n101",
                type: "noteTxt",
                isPinned: true,
                info: {
                    url: '',
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n102",
                type: "note-img",
                info: {
                    url: '',
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: 'white'
                }
            },
            {
                id: "n103",
                type: "note-todos",
                info: {
                    url: '',
                    label: "Get my stuff together",
                    title: "Bobi and Me",
                    todos: [{
                            id: utilService.makeId(),
                            txt: "Driving liscence",
                            doneAt: null,
                            createdAt: Date.now() + 50,
                            importance: false,
                        },
                        {
                            id: utilService.makeId(),
                            txt: "Coding power",
                            doneAt: 187111111,
                            createdAt: Date.now(),
                            importance: true,
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