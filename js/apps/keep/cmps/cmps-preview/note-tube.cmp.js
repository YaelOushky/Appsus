import { noteService } from "../../pages/service/keep-service.js"

export default {
    props: ['info', 'bcg', 'id'],
    template: `
        <div class="tube-cmp cmp-smart">

        <div class="tube-cmp-smart">
                <i  class="fas fa-thumbtack" @click="thumbtack"></i>
                <i class="fas fa-backspace" @click="closeModal" title="back"></i>
            </div>

        <div class="tube-cmp-container">
                    
                <div class="tube">
                    <iframe v-if="info.tube" :src=info.tube > </iframe>
                </div>
                <input :class=color type="text" v-model="info.title" @input="update"  placeholder="title"/>
                
                <input :class=color type="text" v-model="info.subtitle" @input="update"  placeholder="Note txt"/>
        </div>

  
            <div class="tube-cmp-edit">
               
                    <i class="fab fa-youtube" for="youtube" @click=search(beatles)></i>
                    <i class="fas fa-list" for="list"></i>            
                    <i class="fab fa-autoprefixer" for="palette"></i>

                    <select class="fas fa-palette" :class=color v-model="bcg.backgroundColor" @change="update">
                        <option>white</option>
                        <option>coral</option>
                        <option>pink</option>
                        <option>blue</option>
                        <option>green</option>
                        <option>yellow</option>
                    </select>           
            </div>
        </div>
    `,
    data() {
        return {
            src: '',
            beatles: 'beatles'
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
        search(val) {
            console.log(val);
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
            this.info.tube = `https://www.youtube.com/embed/${id}`;
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