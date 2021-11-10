export default {
    template: `
        <header class="app-header">
            <div >
                <p class="fas fa-grip-lines icon"></p>
                <img src="img/logo.png">
                <!-- <p >
                    <span>Keep</span> <img src="img/logo-keep.png" >
                </p> -->
            </div>
                <div class="search-container">
                    <input class="search" aria-label="חיפוש" autocomplete="off" placeholder="Search" role="combobox" value="" name="q" type="text">
                    <i class="fas fa-search icon"></i>
                </div>
            <nav>
            <i class="far fa-question-circle icon"></i>
            <i class="fas fa-cog icon"></i>
            <i class="fas fa-th icon"></i>
            <!-- <i class="far fa-list"></i> -->
                <router-link to="/" active-class="active-link" exact>Home</router-link> 
                <router-link to="/mail" on>Gmail</router-link> 
                <router-link to="/keep" @click="isKeep">Keep</router-link>
                <i class="far fa-user icon"></i>
            </nav>
        </header>
    `,
    data() {
        return {
            isMailc: false,
            isKeep: false,

        }
    },
    methods: {
         img(){
             this.$router.push('/book')
         }
    },
}