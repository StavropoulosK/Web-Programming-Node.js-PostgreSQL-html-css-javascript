'use strict'



function changeImage(event){
    let el=event.target

    let current_img=document.querySelector('.container img.displayed')

    let images = Array.prototype.slice.call(document.querySelectorAll('.container img'));
    console.log(current_img)
    console.log(images)

    let i=images.indexOf(current_img);
    console.log(i)
    
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

    let new_img=images[i]

    current_img.classList.remove('displayed')
    current_img.classList.add('invisible')

    new_img.classList.add("displayed")
    new_img.classList.remove("invisible")






}


document.querySelectorAll(".container .arrow").forEach(el => el.addEventListener("click", changeImage));

