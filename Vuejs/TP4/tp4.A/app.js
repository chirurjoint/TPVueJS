Vue.component("pannier",{
    props: ["pannier"],
    template:
        ` 
        <div>
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <td>Id</td>
                    <td>Nom</td>
                    <td>Quantité</td>
                    <td>Prix</td>
                    <td>Opération</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pannier">
                    <td>{{item.id_item}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.qte}}</td>
                    <td>{{item.price}} €</td>
                    <td>
                        <button class="btn btn-success" @click="plus(item)"><img src="plus.png" alt=""></button> 
                        <button class="btn btn-warning" @click="moins(item)"><img src="less.png" alt=""></button>
                        <button class="btn btn-danger" @click="$emit('delete',item)"><img src="bin.png" alt=""></button>  
                    </td>
                </tr>
                <tr class="bg-primary" style="text-align: center">
                    <td colspan="5" v-bind="setTotal">le total de la commande est: {{total}} €</td>
                </tr>
            </tbody>
        
        </table>
        </div>
        `,
    data(){
        return {
            item: null,
            total : 0

        }

    },computed:{
        setTotal(){
            this.total = 0;
            this.pannier.forEach(item => {
                this.total += item.price * item.qte
            })
        }
    },
    methods: {
        plus(item){
            this.$emit('plus',item)
        },
        moins(item){
            this.$emit('moins',item)
            if(item.qte < 1){
                this.pannier.splice(item.id_item -1,1)
            }
        }
    }
});

let app =  new Vue({
    el: "#application",
    data: {
        pannier : [
            {id_item:1 ,name: "Clée USB 128Go", qte:12, price:15},
            {id_item:2 ,name: "Cable Ethernet 20m", qte:7, price:13.4},
            {id_item:3 ,name: "Cable USB", qte:2, price:4},
            {id_item:4 ,name: "Clable USB-C", qte:4, price:8},
            {id_item:5 ,name: "Souris", qte:12, price:7.5},
            {id_item:6 ,name: "Souris sans fil", qte:3, price:9.99},
        ],
    },

    methods: {
        oneLess(item){

            this.pannier.forEach(item_ref => {
                if(item_ref.id_item === item.id_item){
                    item.qte = item.qte -1
                }
            })

        },
        oneMore(item){
            this.pannier.forEach(item_ref => {
                if(item_ref.id_item === item.id_item){
                    item.qte = item.qte +1
                }
            })
        },
        deleteItem(item){
            console.log("zinzin");
            this.pannier.forEach(item_ref => {
                if(item_ref.id_item === item.id_item){
                    this.pannier.splice(item_ref.id_item -1,1)
                }
            })
        }
    }
});