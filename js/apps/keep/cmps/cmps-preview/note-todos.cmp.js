import { noteService } from '../../pages/service/keep-service.js'



export default {
    props: ['info', 'bcg', 'id'],
    template: `
        <div class="todos-cmp cmp-smart" >

        <div class="note-cmp-smart">
                <i  class="fas fa-thumbtack"></i>
                <i class="fas fa-backspace back" @click="closeModal" title="back"></i>
            </div>

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
        <div class="todos-cmp-container">

            <img v-if="info.url" :src=info.url  :id=id >
            
            <ul>    
                    <li  v-for="(todo,idx) in info.todos" :key="idx">
                        <span :class={done:todo.doneAt} @click="onToggleTodo(todo.id)">{{todo.txt}}</span>
                        <i class="fas fa-times" @click="remove(idx)" title="remove"></i>
                    </li>
                </ul>

            <div class=add-note>
                <input :class=color type="text" v-model="currTxt.txt" @change="addTodo" />
                
                <i class="fas fa-plus" @click="addTodo" title="Add"></i>
            </div>

            </div>          
                 

            <div class="txt-cmp-edit">
               
                    <i class="fab fa-youtube" for="youtube"></i>
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

                    <label class="far fa-image" for="id"  > 
                    <!-- <input  id="id" type="file" :name=id  @change="onImgInput" hidden/> -->
                </label>
               
            </div>
                 
               
            
        </div>
    `,
    // @input="update"
    data() {
        return {
            sortBy: {
                category: 'IMPORTANCE',
                active: 'ALL'
            },
            currTxt: null,
        };
    },
    created() {
        this.currTxt = noteService.getEmptyTodo()
    },

    methods: {
        update() {
            console.log(this.bcg.backgroundColor);
            this.$emit('update');
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
            this.info.todos.push(this.currTxt)
            this.update()
            this.currTxt = noteService.getEmptyTodo()
        },
        // onImgInput(e) {
        //     const file = e.target.files[0];
        //     this.info.url = URL.createObjectURL(file);
        //     this.update()
        // },
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