import { eventBus } from '../../../../services/event-bus-service.js';
import { noteService } from './service/keep-service.js';
import noteList from '../cmps/note-list.cmp.js';





export default {
    components: {
        noteList,
    },
    template: `
        <section class="home-page app-main" v-if="notes">
            <h1>Note app</h1>
            
            
            <input v-model="newNote.info.txt" type="text" placeholder="write a note" @click="longNote">
            <a @click="add">+</a>
            
            <div class='new-note'  v-show="editNewNote">
                
                <input v-model="newNote.info.title" type="text" placeholder="Title" v-show="editNewNote" >

                <select v-model="newNote.style.backgroundColor" @change.stop="add" >
                <option>white</option>
                <option>coral</option>
                <option>pink</option>
                <option>blue</option>
                <option>green</option>
                <option>yellow</option>
            </select>

            <label class="img-up add-img" for="file"  > Add img
                    <input id="file" type="file" name="image" hidden />
                </label>

            </div>
            <note-list :notes="notesToShow" @selected="selectNote" @remove="removeNote" @update="update"></note-list>
        </section>
    `,
    data() {
        return {
            notes: null,
            filterBy: null,
            newNote: null,
            editNewNote: false,
        };
    },
    created() {
        this.loadNotes();
        eventBus.$on('updating', () => this.loadNotes());
        this.newNote = noteService.getEmptyNote()
    },
    destroyed() {
        eventBus.$off('updating');
    },

    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes
                });
        },
        selectNote(note) {
            this.selectedNote = note;
        },
        removeNote(id) {
            console.log(id);
            noteService.remove(id)
                .then(() => {
                    // const msg = {
                    //                 txt: 'Deleted succesfully',
                    //                 type: 'success'
                    //             };
                    //             eventBus.$emit('showMsg', msg);
                    this.notes = this.notes.filter(note => note.id !== id)
                })
                //         .catch(err => {
                //             console.log('err', err);
                //             const msg = {
                //                 txt: 'Error. Please try later',
                //                 type: 'error'
                //             };
                //             eventBus.$emit('showMsg', msg);
                //         });
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        add() {
            noteService.save(this.newNote)
                .then(() => {
                    this.loadNotes()
                    this.newNote = noteService.getEmptyNote()
                })

        },
        update(note) {
            noteService.updateNote(note)
                .then(console.log(this.notes))
        },
        longNote() {
            this.editNewNote = true
        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;

            // const searchStr = this.filterBy.title.toLowerCase();
            // const sortByTitle = this.books.filter(book => {
            //     return (book.title.toLowerCase().includes(searchStr))
            // })

            // const minPrice = (this.filterBy.minPrice) ? this.filterBy.minPrice : 0
            // const maxPrice = (this.filterBy.maxPrice) ? this.filterBy.maxPrice : Infinity

            // const filterBook = sortByTitle.filter(book => {
            //     return (book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice)
            // });


            // console.log(filterBook);
            // return filterBook;

        },
    }
}