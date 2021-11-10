import noteTxt from './cmps-preview/note-txt.cmp.js'
import noteImg from './cmps-preview/note-img.cmp.js'
import noteTodos from './cmps-preview/note-todos.cmp.js'




export default {
    props: ['note'],
    components: {
        noteTxt,
        noteImg,
        noteTodos,
    },
    template: `
        <section class="note-preview" :click="openModal">
        <a @click="remove" >X</a>
            <component   
                        :is="note.type" 
                        :info="note.info" 
                        @setInput="setInput($event)">
            </component>
            <div class="edit-note">
            <!-- <input v-model="note.title" type="text">
            <input v-model="note.txt" type="text"> -->


            </div>
        </section>
        `,
    // note.style Add color

    data() {
        return {
            answers: []
        };
    },
    methods: {
        setInput(ev) {
            this.answers = ev;
            console.log('Survey Got ev', ev);
        },
        save() {
            console.log('Survey Answers', this.answers);
        },
        openModal() {
            console.log('a');
        },
        remove() {
            this.$emit('remove')
        }

    },
    computed: {},
}