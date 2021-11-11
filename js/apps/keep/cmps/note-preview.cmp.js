export default {
    props: ['note'],
    components: {},
    template: `
        <section class="note-preview" :class="bcg"  @mouseover="hover = true"
    @mouseleave="hover = false">
       
            <a @click="remove" >X</a>
            <div @click="openEdit(note.id)">
                 <p> <strong v-show="note.info.title"> Title: </strong><span>{{note.info.title}}</span></p>
                
               <p><strong v-show="note.info.title">Subtitle:</strong><span> {{note.info.txt}}</span></p>
                <!-- <img v-if="note.info.url" src="previewImage" > -->
            </div>
            <select v-show="hover" v-model="note.style.backgroundColor" @change.stop="save(note)" >
                <option>white</option>
                <option>coral</option>
                <option>pink</option>
                <option>blue</option>
                <option>green</option>
                <option>yellow</option>
            </select>

            <label v-show="hover" class="img-up add-img" for="file"  > Add img
                    <input id="file" type="file" name="image" hidden />
                </label>
            <!-- <div role="button">
                <div role="button">white</div>
                <div role="button">coral</div>
                <div role="button">pink</div>
                <div role="button">blue</div>
                <div role="button">green</div>
                <div role="button">yellow</div>
            </div>  -->
        </section>
        `,
    // note.style Add color

    data() {
        return {
            answers: [],
            currNote: null,
            color: 'white',
            previewImage: null,
            hover: false,

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