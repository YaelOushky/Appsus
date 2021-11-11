export default {
    props: ['info', 'bcg'],
    template: `
        <div class="todos-cmp cmp" >
        <a @click="closeModal" title="back" >X</a>
            <label>
                {{info.label}}
                <template v-for="todo in info.todos">                      
                   
                <input :class=color type="text" v-model="info.txt" @input="update" />
                </template>
            </label>
            <div>
            <!-- <input v-model="style" type="color"> -->
            <!-- <input v-model="url" type="text"> -->
            <!-- <button @click="doUploadImg">img</button> -->


            </div>
            <select :class=color v-model="bcg.backgroundColor" @change="update">
                <option>white</option>
                <option>coral</option>
                <option>pink</option>
                <option>blue</option>
                <option>green</option>
                <option>yellow</option>
            </select>
        </div>
    `,
    data() {
        return {
            txt: '',
            style: '',
            url: null,
        };
    },
    methods: {
        update() {
            console.log(this.bcg.backgroundColor);
            this.$emit('update', this.info, this.bcg);
        },
        closeModal() {
            this.$emit('closeModal');
        },
    },
    computed: {
        color() {
            return this.bcg.backgroundColor
        },
    },
};