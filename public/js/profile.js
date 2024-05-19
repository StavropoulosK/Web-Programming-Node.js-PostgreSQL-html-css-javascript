'use strict'

function imageSelect(){
    const fileName = this.files[0] ? this.files[0].name : 'Επιλέξτε';
    document.getElementById('custom-text').textContent = fileName;

    if (this.files.length> 0) {
        document.getElementById('profilePictureForm').submit();
    }
}

document.getElementById('profileImage').addEventListener('change', imageSelect);

