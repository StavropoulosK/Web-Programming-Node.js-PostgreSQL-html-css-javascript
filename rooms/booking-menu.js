document.addEventListener('click',e=>{
    const isDropdownButton = e.target.matches("[booking-dropdown-button]")
    if(!isDropdownButton && e.target.closest('[booking-dropdown]') != null) return

    let currentDropdown
    if(isDropdownButton){
        currentDropdown = e.target.closest('[booking-dropdown]')
        currentDropdown.classList.toggle('active')
    }


    document.querySelectorAll('[booking-dropdown].active').forEach(dropdown => {
        if(dropdown === currentDropdown) return
        dropdown.classList.remove('active')
    })
})