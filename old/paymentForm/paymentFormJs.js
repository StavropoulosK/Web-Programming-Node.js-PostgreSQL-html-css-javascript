const inputField = document.getElementById("date");

inputField.addEventListener("input", function() {
    let inputValue = inputField.value;
    // Check if input consists of exactly 2 digits
    if (/^\d{2}$/.test(inputValue)) {
        // If 2 digits are entered, automatically add a slash
        inputField.value = inputValue + '/';
    }
}
);
