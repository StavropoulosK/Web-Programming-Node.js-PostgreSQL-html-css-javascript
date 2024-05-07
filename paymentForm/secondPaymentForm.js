'use strict'


const inputField = document.getElementById("date");
const form=document.querySelector('.paymentForm form')
const poso=document.getElementById('poso')

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
