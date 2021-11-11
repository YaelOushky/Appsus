export default {
    props: ['info', 'bcg'],
    template: `
        <div class="txt-cmp cmp-smart">
        <a @click="closeModal" title="back" >X</a>
            <label>
                <input :class=color type="text" v-model="info.title" @input="update"  placeholder="title"/>
                <input :class=color type="text" v-model="info.txt" @input="update"  placeholder="Note txt"/>
            </label>
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
        };
    },
    created() {

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
    }
};