import { utilService } from '../../services/util-service.js'
import { eventBus } from '../../services/event-bus-service.js'


export default {
    template: `
        <header class="app-header">
            <div class="logo-container-img">
                <img src="img/logo.png" v-if="isGmail" class="gmail">
               
                <div v-if="isKeep" class="logo-container">
                    <p> Keep</p>
                    <img src="img/logo-keep.png" v-if="isKeep">
                </div>
                
                <div v-if="isBook" class="logo-container">
                    <p> Book</p>
                    <img class="logo" src="img/books.png" v-if="isBook">
                </div>
                
                <div class="logo-container " v-if="isHome">
                    <p> Home</p>
                    <img class="logo" src="img/home.png" v-if="isHome">
                </div>
                
                </div>
                <div class="search-container">
                    <input class="search" autocomplete="off" placeholder="Search"  name="q" type="text" @input="search" v-model="txtSearch">
                    <i class="fas fa-search icon" ></i>
       

                
                </div>
                
                <nav>
                
        
                <img class="grid" src="img/grid.png" @click="closeModal" >
            
                <transition name="slide-fade">
            
                    <div class="grid-modal"  v-if="show">
                        <router-link to="/" active-class="active-link" exact><img  @click="closeModal('isHome')" class="logo" src="img/home.png"/></router-link> 
                        <router-link  to="/mail" on><img @click="closeModal('isGmail')" class="logo" src="img/gmail.png"/></router-link> 
                        <router-link  to="/keep" @click="isKeep"><img @click="closeModal('isKeep')" class="logo" src="img/logo-keep.png"/></router-link>
                        <router-link  to="/book" @click="isBook"><img @click="closeModal('isBook')" class="logo" src="img/books.png"/></router-link>
                    </div>
            
                </transition>
            </nav>
        
        </header>
    `,
    data() {
        return {
            txtSearch: '',
            isMailc: false,
            isKeep: false,
            show: false,
            isGmail: false,
            isKeep: false,
            isHome: true,
            isBook: false
        }
    },
    destroyed() {
        this.hover = false
    },
    methods: {
        img() {
            this.$router.push('/book')
        },
        closeModal(is) {
            this.show = !this.show
            this.changeLogo(is)
        },
        changeLogo(is) {
            if (is === 'isGmail') {
                this.isBook = false
                this.isGmail = true
                this.isKeep = false
                this.isHome = false
            }
            if (is === 'isKeep') {
                this.isGmail = false
                this.isKeep = true
                this.isHome = false
                this.isBook = false
            }
            if (is === 'isHome') {
                this.isGmail = false
                this.isKeep = false
                this.isHome = true
                this.isBook = false
            }
            if (is === 'isBook') {
                this.isGmail = false
                this.isKeep = false
                this.isHome = false
                this.isBook = true
            }
        },
        search() {
            let txtFilter = this.txtSearch.toLowerCase()
            eventBus.$emit('filterMail', txtFilter)
        }

    },
}