'use strict'

const onoma=document.getElementById("onoma")
const onomaError = document.querySelector("#onoma + p.error");


const eponimo=document.getElementById("eponimo")
const eponimoError = document.querySelector("#eponimo + p.error");


const kodikos=document.getElementById("kodikos")
const kodikosError = document.querySelector("#kodikos + p.error");


const kodikosCheck=document.getElementById("kodikosCheck")
const kodikosCheckError = document.querySelector("#kodikosCheck + p.error");


const username=document.getElementById("username")
const usernameError = document.querySelector("#username + p.error");


const email=document.getElementById("email")
const emailError = document.querySelector("#email + p.error");


const tilefono=document.getElementById("tilefono")
const tilefonoError = document.querySelector("#tilefono + p.error");


const form = document.querySelector("form.login");

let widget;
let widgetError;

const widgetContainer=[onoma,eponimo,kodikos,kodikosCheck,username,email,tilefono]
const widgetErrorContainer=[onomaError,eponimoError,kodikosError,kodikosCheckError,usernameError,emailError,tilefonoError]

function checkField(field){


    if(field==="onoma"){
        widget=onoma
        widgetError=onomaError
    }

    else if(field==="eponimo"){
        widget=eponimo
        widgetError=eponimoError
    }

    else if(field==="kodikos"){
        widget=kodikos
        widgetError=kodikosError
    }

    else if(field==="kodikosCheck"){
        widget=kodikosCheck
        widgetError=kodikosCheckError
    }

    else if(field==="username"){
        widget=username
        widgetError=usernameError
    }

    else if(field==="email"){
        widget=email
        widgetError=emailError
    }


    else if(field==="tilefono"){
        widget=tilefono
        widgetError=tilefonoError
    }

    widgetError.textContent = ""; 
    widgetError.className = "error";

    showWidgetError();

}

async function showWidgetError(){


    if (widget.validity.valueMissing) {
        // ονομα/επώνυμο και τα άλλα
 
        widgetError.textContent = `Το πεδίο είναι υποχρεωτικό.`;
        widgetError.className = "error active";
        return false
      }

    else if(widget===username){

        
        if(widget.value.length<8){
            widgetError.textContent = "Το username πρέπει να είναι τουλάχιστον 8 χαρακτήρες";
            widgetError.className = "error active";

            return false


        }

        // elegxos an einai piasmeno to username

        try{
            const response= await fetch(`/usernameExists/${widget.value}`)
            if(!response.ok){
                throw new Error()
            }
            const result= (await response.json()).valid

            if(result==true){
                widgetError.textContent = "Το username είναι πιασμένο. Παρακαλώ εισάγετε άλλο";
                widgetError.className = "error active";
                return false
            }
    
        }
        catch(error){
            console.error(error)
        }
        

        return true

      }

    else if(widget===kodikos){
            if(widget.value.length<8){
                widgetError.textContent = "Ο κωδικός πρέπει να είναι τουλάχιστον 8 χαρακτήρες";
                widgetError.className = "error active";

                return false


            }
            else if(! /\d/.test(widget.value)){
                widgetError.textContent = "Ο κωδικός πρέπει να έχει ένα τουλάχιστον αριθμό";
                widgetError.className = "error active";

                return false


            }
            return true

        }

    else if(widget===kodikosCheck){
        if(widget.value!==kodikos.value){
            widgetError.textContent = "Ο κωδικός δεν ταυτίζεται";
            widgetError.className = "error active";

            return false

        }

        return true


    }

    else if (widget===email) {
        if(widget.validity.typeMismatch){
            
            // If the field doesn't contain an email address,
            // display the following error message.
            widgetError.textContent = "Παρακαλώ εισάγετε μία έγκυρη διεύθυνση.";
            widgetError.className = "error active";

            return false


        }

        return true


      } 

      else if (widget===tilefono) {

        // Afairesi ton [+- ]
        const tilefonoString = widget.value.replace(/[+\- ]/g, '')
        if( ! /^\d{10}$/.test(tilefonoString)){
            
            widgetError.textContent = "Παρακαλώ εισάγετε ένα  τηλέφωνο(10 αριθμούς).";
            widgetError.className = "error active";

            return false

        }
        return true
      }

      else{
        return true
      }

}

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    let res=true
    const tilefonoField=document.getElementById('tilefono')
    
    // Afairesi ton [+- ]
    tilefonoField.value = tilefonoField.value.replace(/[+\- ]/g, '');

    for(let i=0;i<widgetContainer.length;i++){
        widget=widgetContainer[i]
        widgetError= widgetErrorContainer[i]

        widgetError.textContent = ""; 
        widgetError.className = "error";
        let check=  await showWidgetError()

        if(! check  ){
           res=false
           break;
        }

    }
    if(res===true){
        form.submit();

    }
  });

  
//   widgetError.textContent = ""; 
//   widgetError.className = "error";