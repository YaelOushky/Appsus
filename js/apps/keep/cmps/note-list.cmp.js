import notePreview from './note-preview.cmp.js';
import noteDetails from '../pages/note-details.cmp.js';
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
                <note-preview :note="note"  @remove="remove(note.id)" @openEdit ="openEdit" @save="save" @click="scrollMeTo()"/>  
            </li>
        </ul>
        <note-details class="note-details" v-if="currNote" :note="currNote"  @closeModal="closeEdit"></note-details>
    </section>
    `,
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
                });

        },
        closeEdit() {
            this.currNote = null
        },
        save(note) {
            console.log(note);
            noteService.save(note)
                .then(console.log(this.notes))
        },

    },

};