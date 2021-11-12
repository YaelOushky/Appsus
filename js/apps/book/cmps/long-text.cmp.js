// export default {
//     props: ['txt'],
//     template: `
//       <p @click="isMore =!isMore">Description :<br>{{bookDescription}}</p>
//     `,
//     data() {
//         return {
//             isMore: false
//         }
//     },
//     computed: {
//         bookDescription() {
//             if (this.isMore) return this.txt
//             else var cut = this.txt.substring(0, 100)
//             return cut + ' ...'
//         }
//     },
// }

export default {
    props: ['txt'],
    template: `
    <div>
    <p>{{textForDisplay}} <span v-if="!expandText && isLongTxt">...</span></p>
    <button v-if="isLongTxt" @click="toggleText">{{textButton}}</button>
    
</div>
    `,
    data() {
        return {
            expandText: false,
        }
    },
    methods: {
        toggleText() {
            this.expandText = !this.expandText
        }
    },
    computed: {
        textForDisplay() {
            return this.expandText ? this.txt : this.txt.slice(0, 100)
        },
        textButton() {
            return this.expandText ? 'less' : 'more'
        },
        isLongTxt() {   
            return this.txt.length > 100
        }
    }

}