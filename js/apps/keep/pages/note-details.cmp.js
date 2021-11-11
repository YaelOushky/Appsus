import noteTxt from '../cmps/cmps-preview/note-txt.cmp.js'
import noteImg from '../cmps/cmps-preview/note-img.cmp.js'
import slectBox from '../cmps/cmps-preview/select-box.cmp.js'
import noteTodos from '../cmps/cmps-preview/note-todos.cmp.js'
import { noteService } from '../pages/service/keep-service.js';
import { eventBus } from '../../../../services/event-bus-service.js';




export default {
    props: ['note'],
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        slectBox,
    },
    template: `
        <section class='edit-note' :class="note.style.backgroundColor">
                    <component   
                        :is="note.type" 
                        :info="note.info"                                                
                        :bcg="note.style"                                                
                        :id="note.id"                                                
                        @update="update"
                        @removeTodo="removeTodo"
                        @closeModal="closeModal">
                    </component>
                </section>
                `,
    // :bcg="note.style"

    data() {
        return {};
    },
    created() {

    },
    methods: {
        update() {
            noteService.updateNote(this.note)
                .then(() => eventBus.$emit('updating'))

        },
        save() {
            console.log('Survey Answers', this.answers);
        },
        closeModal() {
            this.$emit('closeModal');
        },
        removeTodo(idx) {
            console.log(idx);
            this.note.info.todos.splice(idx, 1)
            this.update()
        }
    },
    computed: {},
}