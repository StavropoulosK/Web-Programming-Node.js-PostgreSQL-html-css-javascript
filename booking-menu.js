document.addEventListener('click', e => {
    const isDropdownButton = e.target.matches("[booking-dropdown-button]");
    const isDropdownClose = e.target.matches("[booking-dropdown-close]");
    
    // If the clicked element is not a dropdown button, a close button, or inside a dropdown, return early.
    if (!isDropdownButton && !isDropdownClose && e.target.closest('[booking-dropdown]') !== null) return;

    // Find the closest dropdown element.
    const currentDropdown = e.target.closest('[booking-dropdown]');

    // If the clicked element is a dropdown button, toggle the active class of the dropdown.
    if (isDropdownButton && currentDropdown) {
        currentDropdown.classList.toggle('active');
    }

    // If the clicked element is a close button, close the corresponding dropdown.
    if (isDropdownClose && currentDropdown) {
        currentDropdown.classList.remove('active');
    }

    // Close other dropdowns.
    document.querySelectorAll('[booking-dropdown].active').forEach(dropdown => {
        if (dropdown !== currentDropdown) {
            dropdown.classList.remove('active');
        }
    });
});

