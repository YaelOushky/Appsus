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
            <select v-show="hover" v-model="note.style.backgroundColor" @change.stop="save(note)" :class=bcg>
                <option>white</option>
                <option>coral</option>
                <option>pink</option>
                <option>blue</option>
                <option>green</option>
                <option>yellow</option>
            </select>

            <!-- <label  v-show="hover" class="img-up add-img" for="file"  > Add img -->
                    <input @change="onImgInput" id="file" type="file" name="image"  />
                <!-- </label> -->
                <img v-if="note.info.url" :src=note.info.url  height="200" id="myimage">
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
            img: null,

        };
    },
    methods: {
        onImgInput(e) {
            const file = e.target.files[0];
            this.note.info.url = URL.createObjectURL(file);
            this.save(this.note)
        },
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
        loadImageFromInput(event, onImageReady) {
            element /*choose DOM element*/ .innerHTML = ''
            var reader = new FileReader()

            console.log(reader);
            return reader.onload = function(event) {
                var img = new Image()
                img.onload = onImageReady.bind(null, img)
                img.src = event.target.result
                return img
            }
            reader.readAsDataURL(event.target.files[0])
        },
        img1() {
            return this.img
        }
    },
}