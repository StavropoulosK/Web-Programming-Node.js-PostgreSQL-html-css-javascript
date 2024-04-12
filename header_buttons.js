document.addEventListener('click', e => {
    const isDropdownButton = e.target.matches(".booking-button");
    const isInfoButton= e.target.matches("#pressed_image");

    // console.log(e.target)
    console.log("aaa")
    console.log(e.target)

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



