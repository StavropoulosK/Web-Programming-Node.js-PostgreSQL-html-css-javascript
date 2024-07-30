'use strict'


const inputField = document.getElementById("date");
const form=document.querySelector('.paymentForm form')
const poso=document.getElementById('poso')

document.addEventListener('DOMContentLoaded',(ev)=>{
    alert('The whole website was created for a learning project and nothing about the hotel is real, the hotel doesnt exist and the reservations are imaginery.Όλη η ιστοσελίδα δημιουργήθηκε στα πλαίσια ενός project, όλα όσα αναφέρονται για το ξενοδοχείο είναι πλασματικά, το ξενοδοχείο δεν υπάρχει και ούτε γίνονται πραγματικά κρατήσεις.')
})


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


const fields=document.querySelectorAll(".required input")

function setProigoumenoValue(){

    fields.forEach(element => {
        element.setAttribute('value', element.value);
    });

}

poso.addEventListener("keyup",function(event){

    poso.value=poso.value.replaceAll(',','.')
    const dekadiko=poso.value.split(".")[1]
    const akeraio=poso.value.split(".")[0]
    if(dekadiko!=null && dekadiko.length>2){
        poso.value=akeraio+'.'+dekadiko[0]+dekadiko[1]
    }
})



form.addEventListener("submit", (event) => {
    const posoPliromis=Number(poso.value)
    const xrostoumenoPoso=Number( (document.getElementById('xrostoumenoPoso').textContent).split('€')[0])
    if(posoPliromis>xrostoumenoPoso){
        event.preventDefault()
        document.querySelector('.response').textContent='The amount stated exceeds owed amount'
    }
})