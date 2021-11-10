import noteTxt from '../cmps-preview/note-txt.cmp.js'
import noteImg from '../cmps-preview/note-img.cmp.js'
import slectBox from '../cmps-preview/select-box.cmp.js'
import noteTodos from '../cmps-preview/note-todos.cmp.js'




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
                        @update="update"
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
        update(info) {
            this.note.info = info
                // console.log(bcg);
                // , bcg
                // this.note.style.backgroundColor = bcg
            this.$emit('update', this.note)
        },
        save() {
            console.log('Survey Answers', this.answers);
        },
        closeModal() {
            this.$emit('closeModal');
        },
    },
    computed: {},
}