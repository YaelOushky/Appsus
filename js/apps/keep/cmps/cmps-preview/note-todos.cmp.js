export default {
    props: ['info'],
    template: `
        <div class="todos" >
            <label>
                {{info.label}}
                <template v-for="todo in info.todos.length">                      
                   
                <input type="text" v-model="txt" @blur="reportVal" />
                </template>
            </label>
            <div>
            <!-- <input v-model="style" type="color"> -->
            <!-- <input v-model="url" type="text"> -->
            <!-- <button @click="doUploadImg">img</button> -->


            </div>

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
        reportVal() {
            this.$emit('setInput', this.txt);
        },

    },
};