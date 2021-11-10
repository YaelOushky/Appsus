import { utilService } from '../../../../../services/util-service.js';
import { storageService } from '../../../../../services/async-storage-service.js';


const NOTE_KEY = 'note';
var gNote = _createNotes()


export const noteService = {
    query,
    getById,
    updateNote,
    remove,
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
    return storageService.post(NOTE_KEY, note);
}

function getById(noteId) {
    return storageService.get(NOTE_KEY, noteId);
}




// _createNotes()

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    console.log('aa');
    if (!notes || !notes.length) {
        notes = notes = [{
                id: "n101",
                type: "noteTxt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                }
            },
            {
                id: "n102",
                type: "note-img",
                info: {
                    // url: "dog.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n103",
                type: "note-todos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                }
            }
        ];
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}