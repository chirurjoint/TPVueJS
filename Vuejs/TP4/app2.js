Vue.component("soundicon",{
    props: ["level"],
    template:
        `<span>{{setIcon}}
        <button @click="$emit('mute')">Mute</button>
        <button @click="$emit('max')">Max</button>
        <input type="texte" v-model="user_mood">
        <button @click="$emit('mood',user_mood)">Ajouter</button>
        </span>`
    ,
    data() {
        return {
            soundicon: ['🔇', '🔈', '🔉', '🔊'],
            user_mood: ""
        }
    },
    computed: {
        setIcon(){
            let zinz=  Math.floor(this.level/25);
            if (zinz ===4){
                return this.soundicon[3]
            }else{
                return this.soundicon[zinz]
            }
        }
    },
    methods: {

    }
});




let app = new Vue({
    el: "#application",

    data : {
        soundlevel:0,
        new_mood: ""
    },

    computed: {

    },
    methods:{
        newMood(mood){
            this.new_mood = mood
        }
    }
});