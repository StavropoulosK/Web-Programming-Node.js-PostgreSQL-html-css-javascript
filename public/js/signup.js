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
 
        widgetError.textContent = `Field is required.`;
        widgetError.className = "error active";
        return false
      }

    else if(widget===username){

        
        if(widget.value.length<8){
            widgetError.textContent = "Username must be at least 8 characters long";
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
                widgetError.textContent = "This username is taken. Please chose another";
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
                widgetError.textContent = "Password must be at least 8 characters long";
                widgetError.className = "error active";

                return false


            }
            else if(! /\d/.test(widget.value)){
                widgetError.textContent = "Password must contain at least a number";
                widgetError.className = "error active";

                return false


            }
            return true

        }

    else if(widget===kodikosCheck){
        if(widget.value!==kodikos.value){
            widgetError.textContent = "Passwords are not the same";
            widgetError.className = "error active";

            return false

        }

        return true


    }

    else if (widget===email) {
        if(widget.validity.typeMismatch){
            
            // If the field doesn't contain an email address,
            // display the following error message.
            widgetError.textContent = "Please fill in a valid email address.";
            widgetError.className = "error active";

            return false


        }

        return true


      } 

      else if (widget===tilefono) {

        // Afairesi ton [+- ]
        const tilefonoString = widget.value.replace(/[+\- ]/g, '')
        if( ! /^\d{10}$/.test(tilefonoString)){
            
            widgetError.textContent = "Please fill in a valid phone number(10 digits).";
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