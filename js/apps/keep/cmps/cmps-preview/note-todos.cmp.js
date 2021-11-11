import { noteService } from '../../pages/service/keep-service.js'



export default {
    props: ['info', 'bcg'],
    template: `
        <div class="todos-cmp cmp-smart" >
        <a @click="closeModal" title="back" >X</a>
            <!-- <label>
                <template v-for="(todo,idx) in info.todos">                                      
                                               
                <div> 
                    <span @click="editTodo(idx)" v-show="false" :class=color>{{todo.txt}}</span>
                    
                    <input v-show="true" :class=color type="text" v-model="todo.txt" @input="update" />
                
                    <a @click="remove(idx)" title="remove" >X</a>
                    
                    
                </div>

            </template>
            </label> -->
            <!-- <select v-model="sortBy.active">
            <option>All</option>
            <option>Active</option>
            <option>Done</option>
        </select>

        <select v-model="sortBy.category"  @change="getTodosForDisplaySort">
            <option>importance</option>
            <option>created</option>
        </select> -->

        <ul>    
            <li  v-for="(todo,idx) in info.todos" :ket="idx">
                <span :class={done:todo.doneAt} @click="onToggleTodo(todo.id)">{{todo.txt}}</span>
             </li>
        </ul>

        <input :class=color type="text" v-model="txt"  />
        <a @click="addTodo" title="Add" >+</a>

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
    // @input="update"
    data() {
        return {
            sortBy: {
                category: 'IMPORTANCE',
                active: 'ALL'
            },
            txt: ''
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
        remove(idx) {
            this.$emit('removeTodo', idx);

        },
        editTodo(idx) {

        },
        onToggleTodo(todoId) {
            this.info.todos.forEach(todo => {
                if (todo.id === todoId) {
                    if (!todo.doneAt) todo.doneAt = Date.now()
                    else todo.doneAt = null
                }
            })
            console.log(this.info.todos);
            this.update()
        },
        addTodo() {

        },
        // getTodosForDisplaySort() {
        //     if (this.sortBy.category === 'IMPORTANCE') this.info.todos.sort((a, b) => a.importance - b.importance)
        //     if (this.sortBy.category === 'CREATED') this.info.todos.sort((a, b) => (a.createdAt - b.createdAt))
        //     console.log(this.info.todos);
        // },
    },
    computed: {
        color() {
            return this.bcg.backgroundColor
        },
        // getTodosForDisplay() {
        //     if (gFilterBy === 'ALL') return gTodos;
        //     const todos = gTodos.filter(function(todo) {
        //         return (todo.isDone && gFilterBy === 'DONE') ||
        //             (!todo.isDone && gFilterBy === 'ACTIVE')
        //     })
        //     renderMessage(gFilterBy, todos)

        //     return todos;
        // }

    }
};