'use strict'
const inputField = document.getElementById("date");
const proino=document.querySelector('#checkbox1')
const propliromi=document.querySelector('#checkbox2')

const proinoTimi=document.getElementById("proinoTimi")
const kostosKsenodoxiou=document.getElementById('kostosKsenodoxiou')
const atomaNumber=Number(document.getElementById('atoma').value)
const sinolikoPoso=document.getElementById('sinolikoPoso')
const posoPliromis=document.getElementById('posoPliromis')

proino.addEventListener('click',calculateSinolikoPoso)

if(propliromi!==null){
    propliromi.addEventListener('click',showPosoPliromis)

}

document.addEventListener('DOMContentLoaded',(ev)=>{
    alert('The whole website was created for a learning project and nothing about the hotel is real, the hotel doesnt exist and the reservations are imaginery.Όλη η ιστοσελίδα δημιουργήθηκε στα πλαίσια ενός project, όλα όσα αναφέρονται για το ξενοδοχείο είναι πλασματικά, το ξενοδοχείο δεν υπάρχει και ούτε γίνονται πραγματικά κρατήσεις.')
})


function calculateSinolikoPoso(event){
    let proinoKostos
    if(proino.checked){
        proinoKostos=atomaNumber*5
        proinoTimi.textContent=proinoKostos+'€'
    }
    else{
        proinoTimi.textContent='-'
        proinoKostos=0
    }

    const ksenodoxioKostos=Number(kostosKsenodoxiou.textContent.split('€')[0])
    sinolikoPoso.textContent=(proinoKostos+ksenodoxioKostos)+'€'

    showPosoPliromis()

    

}

function showPosoPliromis(event){
    const sinolikoPosoNumber= Number(sinolikoPoso.textContent.split('€')[0])

    if(propliromi!==null && propliromi.checked){
        posoPliromis.textContent= (sinolikoPosoNumber/2)+'€'
    }
    else{
        posoPliromis.textContent= (sinolikoPosoNumber)+'€'
    }


}

inputField.addEventListener("input", function(event) {
    let inputValue = inputField.value;
    let firstString
    let secondString=''
    if(inputValue.indexOf('/')===-1){
        firstString=inputValue
    }
    else{
        firstString=inputValue.split("/")[0]
        secondString=inputValue.split("/")[1]
    }


    if(firstString.length==1 && Number(firstString)>2){
        inputField.value ='0'+ firstString + '/'+secondString;

    }

    // Check if input consists of exactly 2 digits
    if (inputValue.length===2 && event.inputType !== "deleteContentBackward") {
        // If 2 digits are entered, automatically add a slash
        inputField.value = inputValue + '/';
    }


}
);

window.addEventListener('load', setProigoumenoValue);
window.addEventListener('load', calculateSinolikoPoso);

window.addEventListener('load', showPosoPliromis);





const fields=document.querySelectorAll(".required input")

function setProigoumenoValue(){

    fields.forEach(element => {
        element.setAttribute('value', element.value);
    });

}
