export default {
    props: ['note'],
    components: {},
    template: `
        <section class="note-preview" :class="bcg" >
            <a @click="remove" >X</a>
            <div @click="openEdit(note.id)">

                <h3> Title: <span>{{note.title}}</span></h3>
                <p>Subtitle: {{note.info.txt}}</p>
            </div>
            <select v-model="note.style.backgroundColor" @change.stop="save(note)">
                <option>white</option>
                <option>coral</option>
                <option>pink</option>
                <option>blue</option>
                <option>green</option>
                <option>yellow</option>
            </select>
        </section>
        `,
    // note.style Add color

    data() {
        return {
            answers: [],
            currNote: null,
            color: 'white',


        };
    },
    methods: {
        setInput(ev) {
            this.answers = ev;
            console.log('Survey Got ev', ev);
        },
        save(note) {
            console.log('Survey Answers');
            this.$emit('save', note)
        },
        remove() {
            this.$emit('remove')
        },
        openEdit(noteId) {
            this.$emit('openEdit', noteId)
        },

    },
    computed: {
        bcg() {
            const currColor = this.note.style.backgroundColor
            return {
                white: currColor === 'white',
                coral: currColor === 'coral',
                pink: currColor === 'pink',
                blue: currColor === 'blue',
                green: currColor === 'green',
                yellow: currColor === 'yellow',
            }
        },
    },
}