'use strict'
const min_width_of_imer=94


function shiftLeft(ev) {

    // const room_class=ev.target.parentElement.parentElement.classList[1]
    // const room=document.getElementsByClassName(room_class)[0]
    const room=ev.target.parentElement.parentElement

    const container = room.getElementsByClassName('times')[0];
    
    const firstInner = container.firstElementChild;
    const lastInner = container.querySelector('div:last-of-type');
    
    const currentId=(firstInner.classList[1]).slice(1)

    
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
    
    let prevId=((lastInner.classList)[1]).slice(1)
    let currentId=((container.firstElementChild.classList)[1]).slice(1)

    if(prevId!='e'){
        prevId=Number(prevId)
    }

    if(currentId!='e'){
        currentId=Number(currentId)
    }

    if(prevId<currentId  || currentId=='e'){
        container.removeChild(lastInner)
        container.insertBefore(lastInner, container.firstElementChild);
    }
}

window.onload = checkOverFlowInTimes

window.onresize = checkOverFlowInTimes;


function checkOverFlowInTimes(){

    const allTimes=document.getElementsByClassName('times')

    for(let i=0;i<allTimes.length;i++){
        const container = allTimes[i];
        const buttons=container.querySelectorAll("button")

        
        if(container.scrollHeight > container.clientHeight || container.scrollWidth > container.clientWidth){
            buttons[0].hidden=false
            buttons[1].hidden=false

        }
        else{
            buttons[0].hidden=true
            buttons[1].hidden=true
        }

        const imer=container.querySelectorAll(" .inner")
        const times=imer[0]
        const times_width_con=times.parentElement.offsetWidth
        const imer_pou_xorane= Math.floor(times_width_con/min_width_of_imer)

        const new_width=times_width_con/(imer_pou_xorane)
        imer.forEach(element => {
            element.style.minWidth=new_width+'px' ;
        });

    }




}