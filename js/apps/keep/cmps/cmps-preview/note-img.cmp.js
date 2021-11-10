export default {
    props: ['note'],
    template: `
        <div class="row">
            <label>
                {{info.title}}
            </label>
                <img :src="note.info.url" alt="">
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