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
            <note-list :notes="notesToShow" @selected="selectNote" @remove="removeNote"></note-list>

        </section>
    `,
    data() {
        return {
            notes: null,
            filterBy: null
        };
    },
    created() {
        this.loadNotes();
    },

    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => {
                    console.log(notes);
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
        }
    },
    computed: {
        notesToShow() {
            console.log(this.notes);
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