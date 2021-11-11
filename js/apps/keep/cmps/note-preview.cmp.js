export default {
    props: ['note'],
    template: `
        <section class="note-preview" :class="bcg"  @mouseover="hover = true"
    @mouseleave="hover = false" @click="openEdit(note.id)">
      
            <div v-show="hover" class="note-preview-icons">
                <i  class="fas fa-thumbtack" @click.stop></i>
                <i class="fas fa-backspace" @click.stop="remove"></i>
            </div>
            
            <div class="note-preview-container" >
                <img v-if="note.info.url" :src=note.info.url  :id=note.id>
                 <strong v-show="note.info.title">{{note.info.title}}</strong>
                
               <p v-show="note.info.subtitle"> {{note.info.subtitle}}</p>
              
               <ul v-show="note.info.todos">    
                    <li  v-for="(todo,idx) in note.info.todos" :key="idx">
                        <span :class={done:todo.doneAt} >{{todo.txt}}</span>
                        <i class="fas fa-times"></i>
                    </li>
                </ul>
            </div>  
            <div v-show="hover" class="note-preview-edit" @click.stop>
               
            <i class="fab fa-youtube" for="youtube" ></i>
               <i class="fas fa-list" for="list"></i>            
               <i class="fab fa-autoprefixer" for="palette"></i>

                    <select  class="fas fa-palette" v-model="note.style.backgroundColor"  @change.stop="save(note)" :class=bcg>
                        <option>white</option>
                        <option>coral</option>
                        <option>pink</option>
                        <option>blue</option>
                        <option>green</option>
                        <option>yellow</option>
                    </select>

                    <label class="far fa-image" :for="note.id" > 
                    <input  :id="note.id" type="file" :name=note.id  @change="onImgInput" hidden/>
                </label>
                
            </div>
               
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
    created() {
        this.currNote = this.note
        console.log(this.currNote);
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
    },
}