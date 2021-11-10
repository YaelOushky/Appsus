export default {
    props: ['info'],
    template: `
        <div class="row">
            <label>
                <input type="text" v-model="info.txt" @blur="reportVal" />
            </label>
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
        reportVal() {
            this.$emit('setInput', this.info);
        },

    }
};