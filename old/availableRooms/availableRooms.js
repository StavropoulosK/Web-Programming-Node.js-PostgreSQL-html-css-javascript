'use strict'
const min_width_of_imer=90


function shiftLeft(ev) {

    // const room_class=ev.target.parentElement.parentElement.classList[1]
    // const room=document.getElementsByClassName(room_class)[0]
    const room=ev.target.parentElement.parentElement
    console.log(ev.target.parentElement.parentElement==room)
    const container = room.getElementsByClassName('times')[0];
    
    const firstInner = container.firstElementChild;
    const lastInner = container.querySelector('div:last-of-type');
    
    const currentId=(firstInner.classList[1][1])
    
    const imer=container.querySelectorAll(".times .inner")
    
    const times=imer[0]
    const times_width_con=times.parentElement.offsetWidth
    const imer_pou_xorane= Math.floor(times_width_con/min_width_of_imer)

    if(imer.length-imer_pou_xorane>=currentId){

        container.insertBefore(firstInner, lastInner.nextSibling);
    }

  }

function shiftRight(ev) {
    // const room_class=ev.target.parentElement.parentElement.classList[1]
    // const room=document.getElementsByClassName(room_class)[0]
    const room=ev.target.parentElement.parentElement

    const container = room.getElementsByClassName('times')[0];

    const lastInner = container.querySelector('div:last-of-type');
    
    const prevId=(lastInner.classList)[1][1]
    const currentId=(container.firstElementChild.classList)[1][1]
    if(prevId<currentId){
        
        container.removeChild(lastInner)
        container.insertBefore(lastInner, container.firstElementChild);
    }
}

window.onload = checkOverFlowInTimes

window.onresize = checkOverFlowInTimes;


function checkOverFlowInTimes(){
    const container = document.getElementsByClassName('times')[0];

    const buttons=document.querySelectorAll(".times button")
    if(container.scrollHeight > container.clientHeight || container.scrollWidth > container.clientWidth){
        buttons[0].hidden=false
        buttons[1].hidden=false

    }
    else{
        buttons[0].hidden=true
        buttons[1].hidden=true
    }

    const imer=document.querySelectorAll(".times .inner")

    const times=imer[0]
    const times_width_con=times.parentElement.offsetWidth
    const imer_pou_xorane= Math.floor(times_width_con/min_width_of_imer)

    const new_width=times_width_con/(imer_pou_xorane)
    imer.forEach(element => {
        element.style.minWidth=new_width+'px' ;
    });

}