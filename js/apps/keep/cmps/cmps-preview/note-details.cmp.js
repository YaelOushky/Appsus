import noteTxt from '../cmps-preview/note-txt.cmp.js'
import noteImg from '../cmps-preview/note-img.cmp.js'
import noteTodos from '../cmps-preview/note-todos.cmp.js'




export default {
    props: ['note'],
    components: {
        noteTxt,
        noteImg,
        noteTodos,
    },
    template: `
        <section class='edit-note' :class="note.style.backgroundColor">
            <component   
                        :is="note.type" 
                        :info="note.info"                         
                        @setInput="setInput">
            </component>
        </section>
        `,

    data() {
        return {};
    },
    created() {

    },
    methods: {
        setInput(info) {
            // this.answers = ev;
            this.note.info = info
                // console.log('note', this.note.info);
                // console.log('Survey Got ev', info);
            this.$emit('update', this.note)
        },
        save() {
            console.log('Survey Answers', this.answers);
        },
    },
    computed: {},
}