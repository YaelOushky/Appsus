import notePreview from './note-preview.cmp.js';
import noteDetails from './cmps-preview/note-details.cmp.js';
import { noteService } from '../pages/service/keep-service.js';


export default {
    components: {
        notePreview,
        noteDetails,
        noteService
    },
    props: ['notes'],
    template: `
    <section>
        <ul class="note-list main-app">
            <li v-for="note in notes" :key="note.id" class="notes-preview-container">
                <note-preview :note="note"  @remove="remove(note.id)" @openEdit ="openEdit" @save="changeColor"/>
            </li>
        </ul>
        <note-details class="note-details" v-if="currNote" :note="currNote" @update="update"></note-details>
    </section>
    `,
    // @click.native="selected(book)"
    data() {
        return {
            currNote: null
        };
    },
    methods: {
        selected(id) {
            this.$emit('selected', id)
        },
        remove(noteId) {
            this.$emit('remove', noteId);
        },
        openEdit(noteId) {
            noteService.getById(noteId)
                .then(note => {
                    this.currNote = note
                })
        },
        changeColor(note) {
            noteService.save(note)
                .then(console.log(this.notes))
        },
        update(note) {
            console.log(note);
            this.$emit('update', note);
        }

    },

};