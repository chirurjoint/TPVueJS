//Fonctionnement des promises

let promiseCleanKitchen  = new Promise(function(resolve,reject){
    let isDone = true;
    if(isDone){ //test si ça c'est bien passer
        resolve("Oui c'est fait");
    }else{ // test si ça s'est mal passer
        reject("Non j'ai la fleme");
    }
});
//creer un element de la reponse qui intervient a un momment inconnu

let AddToEndOfDiv = (htmlTostring,divId)=>{
    //permet d'afficher les éléments a afficher dans le div selectionner avec son id 
    let my_div = document.getElementById(divId);
    let zinzin = document.createElement('div');
    zinzin.innerText = htmlTostring;
    my_div.insertAdjacentElement('beforeend',zinzin);
}



//main

$(document).ready(function () {
    promiseCleanKitchen.then(function (DataFromResolver) {
        //traitement de l'evenement réussit
        console.log(DataFromResolver);
        AddToEndOfDiv(DataFromResolver,'promise')
    }).catch(function (DataFromReject) {
        //traitement de l'venement qui à échouer
        AddToEndOfDiv(DataFromReject,'promise')
    
    });
});


