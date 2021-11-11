export default {
    template: `
        <section class="home-page app-main">
            <h1>Home is where your favorite books are...</h1>


        </section>
    `,

    data() {
        return {

        }
    },
    methods: {

    },
    computed: {},
}










// export default {

//     template: `
//         <div class="home-page app-main">
//             <label>
//             <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
//             </label>
//         </div>
//     `,
//     data() {
//         return {
//             img: '',
//         };
//     },
//     methods: {
//         uploadImage(event) {
//             const URL = 'http://foobar.com/upload';
//             let data = new FormData();
//             data.append('name', 'my-picture');
//             data.append('file', event.target.files[0]);
//             let config = {
//                 header: {
//                     'Content-Type': 'image/png'
//                 }
//             }
//             axios.put(
//                 URL,
//                 data,
//                 config
//             ).then(
//                 response => {
//                     console.log('image upload response > ', response)
//                 }
//             )
//         }
//     }
// };