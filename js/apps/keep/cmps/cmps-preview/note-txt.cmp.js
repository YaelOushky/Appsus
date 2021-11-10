export default {
    props: ['info'],
    template: `
        <div class="row">
        <a @click="closeModal" title="back" >X</a>
            <label>
                <input type="text" v-model="info.txt" @blur="update" />
            </label>
            <!-- <select v-model="bcg.backgroundColor" @change.stop="update">
                <option>white</option>
                <option>coral</option>
                <option>pink</option>
                <option>blue</option>
                <option>green</option>
                <option>yellow</option>
            </select> -->
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
            this.$emit('update', this.info, this.bcg);
        },
        closeModal() {
            this.$emit('closeModal');
        },
    }
};