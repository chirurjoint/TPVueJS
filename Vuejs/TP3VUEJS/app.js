Vue.filter('monnaie', function (param) {
   return accounting.formatMoney(param, "€ ", 2, " ", ".");
});

Vue.filter('uppercase', function (param) {
    return param.toUpperCase()
});


let app =  new Vue({
    el: "#application",
    data: {
        listOfMobiles: [
            {model: "IPhone 6", price: 200},
            {model: "IPhone 7", price: 300},
            {model: "IPhone 8", price: 400},
            {model: "IPhone 9", price: 500},
            {model: "IPhone 10", price: 600},
            {model: "IPhone 11", price: 0},
        ],

        destinataires: [
            {nom: "zinzin 1"},
            {nom: "zinzin 2"},
            {nom: "zinzin 3"},
            {nom: "zinzin 4"},
        ],

        messages: [
            {nom: "zinzin 1", date:new Date(1800,5,28),content:"zinzin"},
            {nom: "zinzin 2", date:new Date(2012,5,2),content:"bite"},
            {nom: "zinzin 3", date:new Date(1998,5,28),content:"bonjour"},
            {nom: "zinzin 4", date:new Date(2020,5,28),content:"coucouc !"},
        ],
        history:[
        ],
        order:1,
        order2:1,
        texteArea:"",
        maxChar:140,
        class_change: "zinzin",
        class_change2: "clickable",
        selected:""
    },
    computed: {


        size(){
            return this.texteArea.length;
        },
        sortTable() {
            return this.listOfMobiles.sort((a, b) => {
                return (a.price > b.price) ? this.order : (a.price < b.price) ? -this.order : 0
            })
        },

        sortTableDate() {
            return this.messages.sort((a, b) => {
                return (a.date > b.date) ? this.order2 : (a.date < b.date) ? -this.order2 : 0
            })
        }

    },

    methods: {
        inversion() {
            this.order = this.order * -1
        },
        inversion2(){
            this.order2 = this.order2 * -1
        },
        envoyer(){
            this.messages.push({nom: this.selected, date: new Date(), content:this.texteArea});
            this.texteArea = ""
        },
        annuler(){
            this.texteArea = ""
        }
    }
});