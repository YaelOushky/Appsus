export default {
    props: ['info'],
    template: `
        <div class="row">
            <label>
                {{info.title}}
            </label>
                <img :src="info.url" alt="">
        </div>
    `,
    data() {
        return {
            txt: '',
        };
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.txt);
        }
    }
};