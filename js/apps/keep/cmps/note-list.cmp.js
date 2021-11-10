import notePreview from './note-preview.cmp.js';

export default {
    components: {
        notePreview
    },
    props: ['notes'],
    template: `
        <ul class="note-list main-app">
            <li v-for="note in notes" :key="note.id" class="notes-preview-container" >
            
                <note-preview :note="note"  @remove="remove(note.id)" />
            </li>
        </ul>
    `,
    // @click.native="selected(book)"
    methods: {
        selected(id) {
            this.$emit('selected', id)
        },
        remove(noteId) {
            this.$emit('remove', noteId);
        },

    },

};