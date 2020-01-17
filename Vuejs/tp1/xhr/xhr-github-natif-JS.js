/*affichage de la météo avec open weather map */


/*Permet d'envoyer la requete */
/*param : urlSend = url de l'api, success = la fonction à appeler en cas de succès */
/*return : inutitlisable*/
function sendXhr(urlSend){
    return new Promise(function (resolve, reject) {
        $("#spinner").show();
        let ajax = $.ajax({
            type: "GET",
            url: urlSend,
            dataType: "json",

        }). done(data => {
            resolve(data);
            console.log(data)
        }).fail(data => {
            reject(data);
            console.log(data)
        })

    })



/*affiche les données github renvoyer par l'api*/
/*params : githubData : Objet json contenant les données*/
function getRepoUser(githubData) {
    return new Promise(function (resolve,reject) {
            let user = githubData[getRandomInt(29)];
            console.log(user);
            let url = "https://api.github.com/users/"+user['login']+"/repos";
            sendXhr(url);
            $("#spinner").removeClass("sk-fading-circle");
            $("#spinner").html(
                "<div class='user' style=''>"
                +"<div>"
                +"<img id='avatar' src='' alt=''>"
                +"</div>"
                +"<h3 id='login'></h3>"
                +"</div>"
            )
            $("#avatar").attr('src',user['avatar_url'])
            $("#login").text(user['login'])
            $("#afficherProfile").attr('href',user['html_url'])

            sendXhr(url)
    })
}


}

function showRepo(datagit) {
    return new Promise(function (resolve, reject) {
        console.log(datagit)
        let compteur = 0
        let tableau = "<table id='table' class='table table-striped'>"
            +"<thead>"
            + "<tr>"
            + "<th align='center' scope='col'>id</th>"
            + "<th align='center' scope='col'>Nom du repo</th>"
            + "<th align='center' scope='col'>Description</th>"
            + "<th align='center' scope='col'>lien du repo</th>"
            + "<th align='center' scope='col'>Last update</th>"

            +"</tr>"
            +"</thead>"
            +"<tbody id='tbody'></tbody>"
            +"</table>"

        $("#container").append(tableau)

        datagit.forEach(repo => {
            $("#tbody").append(
                "<tr>"
                +"<td align='center' id='id"+compteur+"'></td>"
                +"<td class='name' align='center' id='name"+compteur+"'></td>"
                +"<td align='center' id='description"+compteur+"'></td>"
                +"<td class='lien' align='center' id='lien"+compteur+"'></td>"
                +"<td align='center' id='update"+compteur+"'></td>"
                +"</tr>"
            )
            $("#name"+compteur).text(repo['name'])
            $("#id"+compteur).text(repo['id'])
            $("#lien"+compteur).text(repo['archive_url'])
            $("#description"+compteur).text(repo['description'])
            $("#update"+compteur).text(repo['pushed_at'])

            compteur= compteur +1
        });
    });
}

function error(data) {
    if(data["status"]==404){
        console.log("erreur")
    }
}



/*--------- MAIN ----------*/

/*appler lorsque le DOM est chargé*/
// document.addEventListener("DOMContentLoaded",function () { 
//     const apikey = "667ca0b78505678902b66412b7adfa33";
//     let city = "kervorel"
//     let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+apikey
//     document.getElementById("meteo").innerText = "Recherche de prévision météo à "+city
//     sendXhr(url,showWeatherData)
//     console.log(url)
// });

$(document).ready(function () {
    let toogle = true;
    const apikey = "667ca0b78505678902b66412b7adfa33";
    let url = "https://api.github.com/users";
    sendXhr(url)
    .then(function (DataFromResolver) {
        //traitement de l'evenement réussit
        showRepo(DataFromResolver);
    }).catch(function (DataFromReject) {
        //traitement de l'venement qui à échouer
        error(DataFromReject)
    })


        $("#afficherRepo").click(function () {
            $("#table").toggle()
            if (toogle == false) {
                $("#afficherRepo").text("Masquer le tableau")
            } else {
                $("#afficherRepo").text("Afficher le tableau des repos")

            }

            toogle = !toogle
        })



});
