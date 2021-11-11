import { eventBus } from '../../../../services/event-bus-service.js';
import { noteService } from './service/keep-service.js';
import noteList from '../cmps/note-list.cmp.js';





export default {
    components: {
        noteList,
    },
    template: `
        <section class="app-note app-main" v-if="notes">
            
            <div class=new-note-edit>
        <input class="new-note-title" v-model="newNote.info.title" type="text" placeholder="Title" v-show="editNewNote" >    

                <div class="start-show">
                    <input v-model="newNote.info.txt" type="text" placeholder="write a note" @click="longNote">
                    <i class="fas fa-plus" @click="add"></i>

                </div>
            
            <div class='icons-new-note'  v-show="editNewNote">
                
                <!-- <input v-model="newNote.info.title" type="text" placeholder="Title" v-show="editNewNote" > -->
               
                <select class="fas fa-palette" v-model="newNote.style.backgroundColor" id="select"  name="color" >
                <option>white</option>
                <option>coral</option>
                <option>pink</option>
                <option>blue</option>
                <option>green</option>
                <option>yellow</option>
            </select>
        

                    <i class="fab fa-youtube" for="youtube"></i>
                
                    <i class="fas fa-list" for="list"></i>            
                    <i class="fab fa-autoprefixer" for="palette"></i>

                    <label class="far fa-image" for="file"  > 
                            <input  id="file" type="file" name="image"  @change="onImgInput" hidden/>
                        </label>
                    
                    <img v-if="newNote.info.url" src="newNote.info.url">
            
            </div>

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
        onImgInput(e) {
            const file = e.target.files[0];
            this.newNote.info.url = URL.createObjectURL(file);
            // this.save(this.newNote)
            console.log(this.newNote.info.url);
            // noteService.save(this.newNote)
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