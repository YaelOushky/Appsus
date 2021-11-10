export default {
    props: ['note'],
    template: `
        <div class="slect-box" >

            <select v-model="note.info.ans" @change.stop="save">
                <option v-for="ops in note.info.ops">{{ops}}</option>
            </select>
            
        </div>
    `,
    data() {
        return {

        };
    },
    methods: {
        save() {
            console.log(this.ans);
            // this.$emit('setInput', this.txt);
        },

    },
};