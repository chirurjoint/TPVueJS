/*affichage de la météo avec open weather map */


/*Permet d'envoyer la requete */
/*param : urlSend = url de l'api, success = la fonction à appeler en cas de succès */

/*return : inutitlisable*/
function sendXhr(urlSend) {
    // let xhr = new XMLHttpRequest();
    // xhr.open('GET',urlSend); 
    // xhr.responseType = 'json'; 
    // xhr.send();
    // xhr.addEventListener('load',function(data){success(data.target.response)})
    // xhr.addEventListener('error',function (data) {
    //     console.log("erreur dans le tranfers des datas !"+data.target.response)
    // })

    return new Promise(function (resolve, reject) {
        $("#spinner").show();
        let ajax = $.ajax({
            type: "GET",
            url: urlSend,
            dataType: "json",

        }).done(data => {
            resolve(data);
            console.log(data)
        }).fail(data => {
            reject(data);
            console.log(data)
        })
    })

}

/*affiche les données météo renvoyer par l'api*/

/*params : weatherData : Objet json contenant les données*/
function showWeatherData(weatherData) {
    // console.log("humidité"+weatherData['main']['humidity']);
    // console.log("degres: "+(weatherData['main']['temp']-273,15))
    // console.log("pression :"+weatherData['main']['pressure']);
    // if(weatherData["cod"]=="404"){
    //     let error = document.getElementById("error").innerText = weatherData["message"]
    //     document.getElementById("meteo").innerText = ""
    // }else{
    //     document.getElementById("meteo").innerText = "Météo à "+weatherData['name']
    //     let pression = document.getElementById("pression")
    //     pression.innerText = "pression : "+weatherData['main']['pressure']+" Pa"
    //     pression.setAttribute('style',"padding:2%")
    //     let humidity = document.getElementById('humidity')
    //     humidity.innerText = "humidité : "+weatherData['main']['humidity']+ "%"
    //     humidity.setAttribute('style',"padding:2%")
    //     let degres = document.getElementById("temp")
    //     degres.innerText = "degres : "+(weatherData['main']['temp']-273,15) +"°C"
    //     degres.setAttribute('style',"padding:2%")
    // }
    console.log('data : ', weatherData);
    $("#spinner").removeClass("sk-fading-circle");
    $("#spinner").html("<div id='card_success' class='card text-white bg-dark mb-3' style='max-width: 18rem;'>"
        + "<div class='card-header'> Voici le contenu :</div>"
        + "<div class='card-body'>"
        + "<div id='pression'></div>"
        + "<div id='temp'></div>"
        + "<div id='humidity'></div>"
        + "</div>"
        + "</div>");
    $("#meteo").text("Météo à " + weatherData['name']);
    let pression = $("#pression");
    pression.text("pression : " + weatherData['main']['pressure'] + " Pa");
    pression.css('style', "padding:2%");

    let humidity = $("#humidity");
    humidity.text("humidité : " + weatherData['main']['humidity'] + "%");
    humidity.css('style', "padding:2%");

    let degres = $("#temp");
    degres.text("degres : " + (weatherData['main']['temp'] - 273, 15) + "°C");
    degres.css('style', "padding:2%");


}

function error(data) {
    if (data["status"] === 404) {
        console.log(data);
        $("#spinner").removeClass("sk-fading-circle");

        $("#spinner").html("<div id='card_error' class='card text-white bg-danger mb-3' style='max-width: 18rem;'>"
            + "<div class='card-header'> Voici le contenu :</div>"
            + "<div class='card-body'>"
            + "<div id='error'></div>"
            + "</div>"
            + "</div>");
        $("#error").text("données non trouvées");
        $("#meteo").text("Ville non trouvé")

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
    const apikey = "667ca0b78505678902b66412b7adfa33";
    let city = "Désandans";
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apikey;
    $("#meteo").text("Recherche de prévision météo à " + city);
    sendXhr(url)
        .then(function (DataFromResolver) {
            //traitement de l'evenement réussit
            console.log(DataFromResolver);
            showWeatherData(DataFromResolver)
        }).catch(function (DataFromReject) {
        //traitement de l'venement qui à échouer
        error(DataFromReject)

    });

});