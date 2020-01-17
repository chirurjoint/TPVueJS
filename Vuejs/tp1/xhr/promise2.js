//gerer plusieurs promises

let collectFund = function (data) {
  return new Promise(function (resolve, reject) {
    resolve('Amount reached ');
    reject('zinzin ')
})
};

let buyConsole = function (data) {
    return new Promise(function (resolve, reject) {
        resolve(data+'console bought ');
        reject(data+'Not enought money ')

    })
};

let playCD = function (data) {
    return new Promise(function (resolve, reject) {
        resolve(data+'Play call of duty');
        reject(data+'I dont play ')

    })
};

function addEndToDiv(chaine, id) {
    let div_selected = document.getElementById(id);
    let p_added = document.createElement('p');
    p_added.innerText = chaine;
    div_selected.insertAdjacentElement('beforeend',p_added)
}

$(document).ready(function () {
    collectFund()
        .then(
            function (result) {
                return buyConsole(result);
            }
        )
        .then(
            function (result) {
                return playCD(result)

            }
        )
        .then(
            function (result) {
                addEndToDiv('Yeah'+result,'promise')
            }
        )
        .catch(
            function(result){
                addEndToDiv(result,'promise')
            }
        );
    /*---------------------------------------------------------------------*/
    Promise.all([collectFund(),buyConsole(),playCD()])
        .then(function () {
            addEndToDiv("task finish",'promise')
        })
        .catch(function () {
            addEndToDiv("task unfinish",'promise')
        });

    Promise.race([collectFund(),buyConsole(),playCD()])
        .then(function () {
            addEndToDiv("task finish",'promise')
        })
        .catch(function () {
            addEndToDiv("task unfinish",'promise')
        });


});