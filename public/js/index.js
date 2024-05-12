'use strict'

function enlargeImage(src) {
    document.getElementById("enlarged-image").src = src;
    document.getElementById("enlarged-image-container").style.display = "flex";
    document.getElementById("enlarged-image-container").style.justifyContent = "center";
    document.getElementById("enlarged-image-container").style.alignItems = "center";

}

function closeImage() {
    document.getElementById("enlarged-image-container").style.display = "none";
}

function changeImage(event){
    let el=event.target
    let current_img=document.getElementById("enlarged-image")

    let images = document.querySelectorAll('.pictures .image-item');

    let i=0;
    
    // trexei to buffer
    for(;i<images.length;i++){
        if(images[i].src===current_img.src){
            break;
        }
    }

    if(el.classList.contains('right-arrow')){
        if(i<images.length-1){
            i +=1
        }
        else{
            i=0
        }
    }
    else{
        if(i!=0){
            i=i-1
        }
        else{
            i=images.length-1
        }
    }

    let new_src=images[i].src

    enlargeImage(new_src)



}


document.querySelectorAll("#enlarged-image-container .arrow").forEach(el => el.addEventListener("click", changeImage));


const button_close=document.querySelector("#enlarged-image-container button")
button_close.addEventListener("click",closeImage)