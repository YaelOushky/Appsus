import noteTxt from '../cmps/cmps-preview/note-txt.cmp.js'
import noteImg from '../cmps/cmps-preview/note-img.cmp.js'
import slectBox from '../cmps/cmps-preview/select-box.cmp.js'
import noteTodos from '../cmps/cmps-preview/note-todos.cmp.js'
import noteTube from '../cmps/cmps-preview/note-tube.cmp.js'
import { noteService } from '../pages/service/keep-service.js';
import { eventBus } from '../../../../services/event-bus-service.js';




export default {
    props: ['note'],
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        slectBox,
        noteTube
    },
    template: `
        <section class='edit-note' :class="note.style.backgroundColor" >
                    <component   
                        :is="note.type" 
                        :info="note.info"                                                
                        :bcg="note.style"                                                
                        :id="note.id"                                                
                        @update="update"
                        @addPinned="addPinned"
                        @addList="addList"
                        @addTube="addTube"
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
            console.log(this.note);
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
            this.note.info.todos.splice(idx, 1)
            this.update()
        },
        addList() {
            this.note.type = 'noteTodos'
            this.update()
        },
        addTube() {
            this.note.type = 'noteTube'
            this.update()
        },
        addPinned() {
            this.note.isPinned = !this.note.isPinned
            console.log('this.note.isPinned');
            this.update()
        }
    },
    computed: {},
}