'use strict'

document.addEventListener('click', e => {
    const isDropdownButton = e.target.matches(".booking-button");
    const isInfoButton= e.target.matches("#pressed_image");


    if ( isDropdownButton  || e.target.closest('#dropdown_book') == null ) {
        const currentDropdown = document.getElementById("dropdown_book")

        if(isDropdownButton){
            currentDropdown.classList.toggle('active');

        }
        else {
            currentDropdown.classList.remove('active');

        }
    
    }

    if( isInfoButton  || e.target.closest('#info_container') == null){


        const currentDropdown = document.querySelector("header .display_info")

        if(isInfoButton){
            currentDropdown.classList.toggle('active');

        }
        else{
            currentDropdown.classList.remove('active');

        }

    }
    


});

const atoma_buttons=document.querySelectorAll("button.countButton")

atoma_buttons.forEach( (el)=>{
    el.addEventListener('click', function(event){
        const atoma_label=document.querySelector(".booking-wrapper .numAdults")
        const button = event.target;
        let atoma=parseInt(atoma_label.textContent)
        if(button.classList.contains("more")){
            if(atoma<4){

                atoma_label.textContent=atoma+1
            }

        }
        else if(button.classList.contains("less")){
            if(atoma>1){

                atoma_label.textContent=atoma-1

            }
        }




    })
})

