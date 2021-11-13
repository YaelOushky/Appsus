import { noteService } from "../../pages/service/keep-service.js"

export default {
    props: ['info', 'bcg', 'id'],
    template: `
        <div class="txt-cmp cmp-smart">

        <div class="note-cmp-smart">
                <i  class="fas fa-thumbtack" @click="thumbtack"></i>
                <i class="fas fa-backspace" @click="closeModal" title="back"></i>
        </div>
        
        <div class="txt-cmp-container">
                <img v-if="info.url" :src=info.url  :id=id >
                
                <input :class=color type="text" v-model="info.title" @input="update"  placeholder="title"/>
                
                <input  :class=color type="text" v-model="info.subtitle" @input="update"  placeholder="Note txt"/>
        </div>

  
            <div class="txt-cmp-edit">
               
                    <i class="fab fa-youtube" for="youtube" @click=search(beatles)></i>
                    <i class="fas fa-list" for="list" @click=addList></i>            
                    <i class="fab fa-autoprefixer" for="palette"></i>

                    <select class="fas fa-palette" :class=color v-model="bcg.backgroundColor" @change="update">
                        <option>white</option>
                        <option>coral</option>
                        <option>pink</option>
                        <option>blue</option>
                        <option>green</option>
                        <option>yellow</option>
                    </select>

                    <label class="far fa-image" for="id"  > 
                    <input  id="id" type="file" :name=id  @change="onImgInput" hidden/>
                </label>
               
            </div>
        </div>
    `,
    data() {
        return {
            txt: '',
        };
    },
    created() {

    },
    methods: {
        update() {
            this.$emit('update');
        },
        closeModal() {
            this.$emit('closeModal');
        },
        onImgInput(e) {
            const file = e.target.files[0];
            this.info.url = URL.createObjectURL(file);
            this.update()
        },
        addList() {
            this.$emit('addList');
        },
        search(val) {
            this.$emit('addTube');
            noteService.getYoutubeVid(val)
                .then(this.renderVideos)
        },
        renderVideos(videos) {
            console.log('videos', videos);
            var firstVid = videos[0].id.videoId;
            this.onSelectedVid(firstVid);
        },
        onSelectedVid(id) {
            console.log(id);
            this.src = `https://www.youtube.com/embed/${id}`;
            this.info.tube = this.src
            console.log(this.info.tube);
            this.update()
        },
        thumbtack() {
            this.$emit('addPinned');
        }
    },
    computed: {
        color() {
            return this.bcg.backgroundColor
        },

    }
};