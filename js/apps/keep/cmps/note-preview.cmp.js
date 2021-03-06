import { noteService } from '../pages/service/keep-service.js';

export default {
    props: ['note'],
    template: `
        <section class="note-preview" :class="bcg"  @mouseover="hover = true"
    @mouseleave="hover = false" @click="openEdit(note.id)">
      
            <div  class="note-preview-icons">
                <i v-show="hover || note.isPinned" class="fas fa-thumbtack" @click.stop="thumbtack(note)"></i>
               
                <i v-show="hover" class="fas fa-backspace" @click.stop="remove"></i>
            </div>
            
                <div class="note-preview-container" >

                <div  class="tube">
                   
                    <iframe v-if="note.info.tube" :src=note.info.tube > </iframe>

                </div>

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
               
            <i class="fab fa-youtube" for="youtube" @click="openEdit(note.id)"   ></i>
            <!-- @click=search(beatles) -->
            
            <i class="fas fa-list" for="list" @click="openEdit(note.id)"></i>            
            <!-- @click=addList  -->
            
            <i class="fab fa-autoprefixer" for="palette"></i>
              
               <label class="fas fa-palette" :for="note.id"></label>
                    <select  :id="note.id" v-model="note.style.backgroundColor"  @change.stop="save(note)" >
                        <option>white</option>
                        <option>coral</option>
                        <option>pink</option>
                        <option>blue</option>
                        <option>green</option>
                        <option>yellow</option>
                    </select>

                    <i class="far fa-image" for="palette" @click="openEdit(note.id)"></i>
                
            </div>
               
        </section>
        `,
    // note.style Add color

    data() {
        return {
            answers: [],
            currNote: null,
            color: 'white',
            hover: false,
        };
    },
    created() {
        this.currNote = this.note
    },
    methods: {
        onImgInput(e) {
            console.log(this.currNote);
            const file = e.target.files[0];
            this.note.info.url = URL.createObjectURL(file);
            this.save(this.note)
        },
        setInput(ev) {
            this.answers = ev;
        },
        save(note) {
            this.$emit('save', note)
        },
        remove() {
            this.$emit('remove')
        },
        openEdit(noteId) {
            this.$emit('openEdit', noteId)
        },
        addList() {
            this.note.type = 'noteTodos'
            this.save(this.note)
        },
        thumbtack(note) {
            note.isPinned = !note.isPinned
            this.save(note)
        },
        search(val) {
            this.note.type = 'noteTube'
            noteService.getYoutubeVid(val)
                .then(this.renderVideos)
        },
        renderVideos(videos) {
            console.log('videos', videos);
            var firstVid = videos[0].id.videoId;
            this.onSelectedVid(firstVid);
        },
        onSelectedVid(id) {
            this.note.info.tube = `https://www.youtube.com/embed/${id}`;
            console.log(this.note.info.tube);
            this.save(this.note)
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