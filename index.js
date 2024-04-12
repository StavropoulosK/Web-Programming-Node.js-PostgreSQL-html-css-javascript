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
    el=event.target
    current_img=document.getElementById("enlarged-image")
    console.log(current_img.src)

    let images = document.querySelectorAll('.pictures .image-item');
    console.log(images)

    let i=0;
    
    for(;i<images.length;i++){
        if(images[i].src===current_img.src){
            console.log(i)
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

    new_src=images[i].src

    enlargeImage(new_src)



}


document.querySelectorAll("#enlarged-image-container .arrow").forEach(el => el.addEventListener("click", changeImage));


button_close=document.querySelector("#enlarged-image-container button")
button_close.addEventListener("click",closeImage)