export default {
    template: `
        <header class="app-header">
            <div>
            <h1 >Appsus</h1>
            </div>
            <nav>
                <router-link to="/" active-class="active-link" exact>Home</router-link> 
                <router-link to="/mail">Gmail</router-link> 
                <router-link to="/keep">Keep</router-link>
            </nav>
        </header>
    `,
     methods:{
        //  page(){
        //      this.$router.push('/book')
        //  }
     },
}