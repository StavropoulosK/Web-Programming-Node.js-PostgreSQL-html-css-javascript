'use strict'

const monthYearElement= document.getElementById('monthYear');
const datesElement= document.getElementById('dates');
const prevBtn= document.getElementById('prevBtn')
const nextBtn= document.getElementById('nextBtn')
const checkIn=document.querySelector('span.check-inDate')
const checkOut=document.querySelector('span.check-outDate')
const atomaLabel=document.querySelector('.numAdults')

let diamorfosi
let amea
let roomName
let atoma
let checkOutDate
let checkOutMonth
let checkOutYear
let checkInDate
let checkInMonth
let checkInYear
let currentCalendarMonth
let currentCalendarYear


const monthMap = {
    'Ιανουάριος': '01',
    'Φεβρουάριος': '02',
    'Μάρτιος': '03',
    'Απρίλιος': '04',
    'Μάιος': '05',
    'Ιούνιος': '06',
    'Ιούλιος': '07',
    'Αύγουστος': '08',
    'Σεπτέμβριος': '09',
    'Οκτώβριος': '10',
    'Νοέμβριος': '11',
    'Δεκέμβριος': '12'
  };

let currentDate=new Date();

async function updateCalendar(){
    const currentYear= currentDate.getFullYear();
    const currentMonth= currentDate.getMonth()

    // me triti parametros 0 epistrefei tin teleutaia mera tou proigoumenou mina
    const firstDay= new Date(currentYear, currentMonth,0);   //teleutaia mera proigoumenou mina
    const lastDay=new Date(currentYear,currentMonth+1,0);    //teleutaia mera torinou mina
    const totalDays= lastDay.getDate();
    const firstDayIndex= firstDay.getDay()
    const lastDayIndex= lastDay.getDay()
    const monthYearString= currentDate.toLocaleString('el', {month:'long', year:'numeric'})
   
    diamorfosi=selectBoxDiamorfosi.value

    if(ameaCheckBox){
        amea=ameaCheckBox.checked
    }
    else{
        amea=false
    }

    let currentCalendarMonth=monthYearString.split(' ')[0]
    currentCalendarMonth=(monthMap[currentCalendarMonth])
    const currentCalendarYear=(monthYearString.split(' ')[1])

    // console.log(roomName,currentCalendarMonth,currentCalendarYear)
    let times

    try{
        const response=await fetch(`/timesDomatiou/${roomName}/${currentCalendarYear}/${currentCalendarMonth}`)

        if(!response.ok){
            throw new Error()
        }

        times=(await response.json()).times
    }
    catch(error){
        console.error()
    }




    monthYearElement.textContent= monthYearString;


    let datesHTML="";
    datesElement.style.gridColumnStart=firstDayIndex

    const dayNow= new Date().getDate()
    const monthNow=new Date().getMonth()
    const yearNow=new Date().getFullYear()

    // console.log(Number(currentCalendarMonth)-1,currentCalendarYear,dayNow,monthNow,yearNow,currentCalendarMonth==monthNow)


    for(let i=firstDayIndex; i>0; i--){
        const prevDate= new Date(currentYear, currentMonth, 0-i+1)
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    for(let i=1; i<=totalDays; i++){
        const date=new Date(currentYear,currentMonth,i);
        if(Number(currentCalendarMonth)-1==monthNow && currentCalendarYear==yearNow && i<dayNow){
            datesHTML += `<div class="date inactive" id="date${i}"><span>${i}</span><span>${times[i-1]}€</span></div>`

        }
        else{
            datesHTML += `<div class="date" id="date${i}"><span>${i}</span><span>${times[i-1]}€</span></div>`

        }
    }

    if(lastDayIndex!==0){
        for(let i=1; i<=7 -lastDayIndex; i++){
            const nextDate=new Date(currentYear, currentMonth+1,i);
            datesHTML += `<div class="date inactive"> ${nextDate.getDate()}</div>`;

        }
    }
    datesElement.innerHTML =datesHTML

    await showDatesThatRoomsAreNotAvailable()
    const selectable_dates=document.querySelectorAll('.date:not(.inactive):not(.full)')
    selectable_dates.forEach(element => {
        element.addEventListener("click",async (ev)=>{
            await selectDates(ev)
            choseSelectedDates()
        })
    });


    choseSelectedDates()

}



prevBtn.addEventListener('click', function(){
    let yearNow= new Date().getFullYear()
    let monthNow= new Date().getMonth()

    let calendarYear=currentDate.getFullYear()
    let calendarMonth=currentDate.getMonth()

    // den emfanizei parelthontikes imerominies
    if(calendarYear*12+calendarMonth-1 >= yearNow*12+monthNow){
        currentDate.setMonth(currentDate.getMonth()-1)
        updateCalendar()

    }


})

nextBtn.addEventListener('click', function(){


    let yearNow= new Date().getFullYear()
    let monthNow= new Date().getMonth()

    let calendarYear=currentDate.getFullYear()
    let calendarMonth=currentDate.getMonth()
    // console.log(calendarMonth,calendarYear,yearNow,(calendarYear-yearNow)*12+(calendarMonth-monthNow)+1)

    // Emfanizi mexri 2 xronia meta

    if((calendarYear-yearNow)*12+(calendarMonth-monthNow)+1 <= 24){
        currentDate.setMonth(currentDate.getMonth()+1)
        updateCalendar()

    }
})


// endiktika kapoies klismenes imerominies

async function showDatesThatRoomsAreNotAvailable(){
    //Elegxei tis katilimenes imerominies

    let year=monthYearElement.textContent.split(' ')[1]
    let month=monthMap[monthYearElement.textContent.split(' ')[0]]

    let klismenes=[]


    try{
        const response=await fetch(`/olaTaDomatiaKlismena/${year}/${month}/${diamorfosi}/${amea}/${roomName}`)

        if(!response.ok){
            throw new Error()
        }

        klismenes=(await response.json()).klismenes
    }
    catch(error){
        console.error()
    }
        

    // To klismenes periexei tis imerominies opou kanena domatio den einai diathesimo

    for(let i=0;i<klismenes.length;i++){
    const date=document.getElementById(`date${klismenes[i]}`)
    date.classList.add("full")
    }

    
}

async function selectDates(ev){
    const elem=ev.currentTarget
    if( checkIn.textContent=="-" || checkIfMonthIsSame()){

        const activeDates=document.querySelectorAll(".date.active")
        const itIsSecondClick= activeDates.length==1
        const itIsFirstClick= activeDates.length==0
        if(itIsFirstClick){
            elem.classList.add("active")
            updateDatesHeader(0)

        }
        else if(itIsSecondClick){

            const firstDateElem=activeDates[0]
            const secondDateSpan=elem.querySelector('span')
            let secondDate=Number(secondDateSpan.textContent)
    
            const firstDateSpan=firstDateElem.querySelector('span')
            let firstDate=Number(firstDateSpan.textContent)

           if(firstDate==secondDate){
                return
           }
    
            if(firstDate>secondDate){
                // swap
                const temp=firstDate
                firstDate=secondDate
                secondDate=temp
                
            }
            if(checkIfIntermediateDatesAreFreeForSameMonthBooking(firstDate,secondDate)){
                const date_arr=[]
                for(let i=firstDate;i<=secondDate;i++){
                    let el=document.getElementById(`date${i}`)
                    date_arr.push(el)
                }
                date_arr.forEach(element => {
                    element.classList.add("active")
                    
                });

                updateDatesHeader(1)

    
    
            }
            else{
                // parembalete katilimeni imerominia
                elem.classList.add("active")
                firstDateElem.classList.remove("active")
                updateDatesHeader(0)

            }

        }
        else{

            // exei dialeksi imerominies kai patai triti fora gia na arxisi apo tin arxi

            const  prevDates=document.querySelectorAll(".date.active")

            prevDates.forEach(element => {
                element.classList.remove("active")
            });
            elem.classList.add("active")
            updateDatesHeader(2)


        }
    }
    // i kratisi epidioketai na gini checkIn checkOut se diaforetikous mines
    else if(checkOut.textContent==='-'){

        const secondDateSpan=elem.querySelector('span')

        checkOutDate=(secondDateSpan.textContent)
        checkOutMonth=monthYearElement.textContent.split(' ')[0]
        checkOutMonth=(monthMap[checkOutMonth])
        checkOutYear=(monthYearElement.textContent.split(' ')[1])

        const checkInDate=Number(checkIn.textContent.split("/")[0])
        const checkInMonth=Number(checkIn.textContent.split("/")[1])
        const checkInYear=Number(checkIn.textContent.split("/")[2])
        const firstDateBiggerThanSecond= checkInYear*400+checkInMonth*31+checkInDate > Number(checkOutYear)*400+Number(checkOutMonth)*31+Number(checkOutDate)
        if(firstDateBiggerThanSecond || ! (await roomTypeAvailable() ) ){
            elem.classList.add("active")
            updateDatesHeader(0)
        }
        else{
            // kratisi se diaforetikous mines
            elem.classList.add("active")

            updateDatesHeader(1,false)
        }
    }
    else{
        // trito klik
            const  prevDates=document.querySelectorAll(".date.active")

            prevDates.forEach(element => {
                element.classList.remove("active")
            });
            elem.classList.add("active")
            updateDatesHeader(2)
    }
    

}

function kratisiSeDiaforetikousMines(){

    const checkInMonth=Number(checkIn.textContent.split("/")[1])
    const checkInYear=Number(checkIn.textContent.split("/")[2])

    const checkOutMonth=Number(checkOut.textContent.split("/")[1])
    const checkOutYear=Number(checkOut.textContent.split("/")[2])
    return (checkInMonth!==checkOutMonth || checkInYear !== checkOutYear)
}

function choseSelectedDates(){


    const checkInDate=Number(checkIn.textContent.split("/")[0])
    const checkInMonth=Number(checkIn.textContent.split("/")[1])
    const checkInYear=Number(checkIn.textContent.split("/")[2])

    const checkOutDate=Number(checkOut.textContent.split("/")[0])
    const checkOutMonth=Number(checkOut.textContent.split("/")[1])
    const checkOutYear=Number(checkOut.textContent.split("/")[2])

    let currentCalendarMonth=monthYearElement.textContent.split(' ')[0]
    currentCalendarMonth=Number(monthMap[currentCalendarMonth])
    const currentCalendarYear=Number(monthYearElement.textContent.split(' ')[1])


    // oles oi imerominies metaksi checkIn kai checkOut thetontai active
    if(checkIn.textContent!=="-" && checkOut.textContent!=='-' && kratisiSeDiaforetikousMines()){

        
        const dates=Array.from(document.querySelectorAll('.date:not(.inactive):not(.full)'))


        if(checkInMonth+checkInYear*12 < currentCalendarMonth+currentCalendarYear*12 && currentCalendarMonth+currentCalendarYear*12 < checkOutMonth+checkOutYear*12){
            dates.forEach(element => {
                element.classList.add('active')
            });
        }
        else if(checkInMonth+checkInYear*12 === currentCalendarMonth+currentCalendarYear*12){
            const firstdate=document.getElementById(`date${checkInDate}`)
            let i=dates.indexOf(firstdate)
            for(;i<dates.length;i++){
                dates[i].classList.add('active')
            }
        }

        else if(checkOutMonth+checkOutYear*12 === currentCalendarMonth+currentCalendarYear*12){
            const lastDate=document.getElementById(`date${checkOutDate}`)
            let i_end=dates.indexOf(lastDate)
            for(let i=0;i<=i_end;i++){
                dates[i].classList.add('active')
            }
        }

        
    }
    else if(checkIn.textContent!=="-" && checkOut.textContent==='-' && checkInMonth+checkInYear*12 === currentCalendarMonth+currentCalendarYear*12){
        const date=document.getElementById(`date${checkInDate}`)

        date.classList.add('active')

    }

    else if(checkIn.textContent!=="-" && checkOut.textContent!=='-'  && checkInMonth+checkInYear*12 === currentCalendarMonth+currentCalendarYear*12){


        const lastDate=document.getElementById(`date${checkOutDate}`)
        const firstDate=document.getElementById(`date${checkInDate}`)

        const dates=Array.from(document.querySelectorAll('.date:not(.inactive):not(.full)'))

            let i_end=dates.indexOf(lastDate)
            let i_start=dates.indexOf(firstDate)
            for(let i=i_start;i<=i_end;i++){
                dates[i].classList.add('active')
            }

    }
    
}

// Meni na ilopoiithi. Epistrefei an enas sigkekrimenos tipos domatiou einai diathesimos metaksi ton imerominion date1,date2
async function roomTypeAvailable(){
    getDates()
    if(checkOutDate.length===1){
        checkOutDate='0'+checkOutDate
    }

    // console.log(roomName,amea,atoma,diamorfosi,checkInDate,checkInMonth,checkInYear,checkOutDate,checkOutMonth,checkOutYear,currentCalendarMonth,currentCalendarYear)
    let result

    try{
        const response=await fetch(`/roomTypeAvailable/${roomName}/${amea}/${diamorfosi}/${checkInDate}/${checkInMonth}/${checkInYear}/${checkOutDate}/${checkOutMonth}/${checkOutYear}`)

        if(!response.ok){
            throw new Error()
        }

        result=(await response.json()).result
    }
    catch(error){
        console.error()
    }

    return result
}

    // Elegxei an to checkin kai to checkout ginontai ton idio mina
function checkIfMonthIsSame(){
    let checkOutMonth=monthYearElement.textContent.split(' ')[0]
    checkOutMonth=Number(monthMap[checkOutMonth])
    const checkOutYear=Number(monthYearElement.textContent.split(' ')[1])

    const checkInMonth=Number(checkIn.textContent.split("/")[1])
    const checkInYear=Number(checkIn.textContent.split("/")[2])

    // console.log(checkOutMonth,checkInMonth ,checkOutYear,checkInYear)

    return (checkOutMonth===checkInMonth && checkOutYear===checkInYear)



}

function checkIfIntermediateDatesAreFreeForSameMonthBooking(firstDate,secondDate){
    for(let i=firstDate+1;i<secondDate;i++){
        let el=document.getElementById(`date${i}`)
        if(el.classList.contains("full")){
            return false
        }
    }

    return true
}

function updateDatesHeader(senario,idiosMinas=true){
    const  dates=document.querySelectorAll(".date.active")
    const firstDateElem=dates[0]
    const firstDateSpan=firstDateElem.querySelector('span')
    let firstDate=firstDateSpan.textContent


    if(firstDate.length==1){
        firstDate= '0'+firstDate
    }

    if(senario==0 || senario==2){

        let firstyear=monthYearElement.textContent.split(' ')[1]
        let firstmonth=monthYearElement.textContent.split(' ')[0]
    
        firstmonth=monthMap[firstmonth]
        checkIn.textContent= firstDate+'/'+firstmonth+'/'+firstyear
        if(senario==2){
            checkOut.textContent= '-'

        }
    }

    if(senario==1){

        const lastDateElem=dates[dates.length-1]
        const lastDateSpan=lastDateElem.querySelector('span')
        let lastDate=lastDateSpan.textContent
        let lastyear=monthYearElement.textContent.split(' ')[1]
        let lastmonth=monthYearElement.textContent.split(' ')[0]
        lastmonth=monthMap[lastmonth]

        if(lastDate.length==1){
            lastDate= '0'+lastDate
        }

        if(idiosMinas==true){
            const firstDateElem=dates[0]
            const firstDateSpan=firstDateElem.querySelector('span')
            let firstDate=firstDateSpan.textContent
            let firstyear=monthYearElement.textContent.split(' ')[1]
            let firstmonth=monthYearElement.textContent.split(' ')[0]
            firstmonth=monthMap[firstmonth]

            if(firstDate.length==1){
                firstDate= '0'+firstDate
            }

            checkIn.textContent=firstDate+'/'+firstmonth+'/'+firstyear
        }
        checkOut.textContent=lastDate+'/'+lastmonth+'/'+lastyear
        

    }


}

function getDates(){
    
    checkInDate=(checkIn.textContent.split("/")[0])
    checkInMonth=(checkIn.textContent.split("/")[1])
    checkInYear=(checkIn.textContent.split("/")[2])

    currentCalendarMonth=monthYearElement.textContent.split(' ')[0]
    currentCalendarMonth=(monthMap[currentCalendarMonth])
    currentCalendarYear=(monthYearElement.textContent.split(' ')[1])
}



const selectBoxDiamorfosi=document.getElementById('bed-type')
selectBoxDiamorfosi.addEventListener('change',()=>{
    checkIn.textContent='-'
    checkOut.textContent='-'
    updateCalendar()
})


let ameaCheckBox

try{
    // den exoun ola ta domatia epilogi amea
    ameaCheckBox=document.querySelector('.Amea .checkbox-field')
    ameaCheckBox.addEventListener('change',()=>{
        checkIn.textContent='-'
        checkOut.textContent='-'
        updateCalendar()}
)

}
catch(err){
    
}

const form=document.querySelector('.bookForm')

form.addEventListener("submit", (event) => {
    // Epeidi to select gia tin diamorfosi tou domatiou brisketai ektos formas tha stiloume custom forma
    event.preventDefault()

    if(checkIn.textContent=='-' || checkOut.textContent=='-'){
        return
    }
    else{
        const atoma=atomaLabel.textContent
        getDates()

        const checkOutDate=checkOut.textContent.split("/")[0]
        const checkOutMonth=checkOut.textContent.split("/")[1]
        const checkOutYear=checkOut.textContent.split("/")[2]

        // apostoli custom formas

        let myForm = document.createElement('form');
        myForm.classList.add('invisibleForm')

        let element1=document.createElement("input")
        element1.setAttribute("value", roomName);
        element1.setAttribute("name", "roomName");
        myForm.appendChild(element1);

        let element2=document.createElement("input")
        element2.setAttribute("value", amea);
        element2.setAttribute("name", "amea");
        myForm.appendChild(element2);

        let element3=document.createElement("input")
        element3.setAttribute("value", atoma);
        element3.setAttribute("name", "atoma");
        myForm.appendChild(element3);

        let element4=document.createElement("input")
        element4.setAttribute("value", diamorfosi);
        element4.setAttribute("name", "diamorfosi");
        myForm.appendChild(element4);

        let element5=document.createElement("input")
        element5.setAttribute("value", checkInDate);
        element5.setAttribute("name", "checkInDate");
        myForm.appendChild(element5);

        let element6=document.createElement("input")
        element6.setAttribute("value", checkInMonth);
        element6.setAttribute("name", "checkInMonth");
        myForm.appendChild(element6);

        let element7=document.createElement("input")
        element7.setAttribute("value", checkOutDate);
        element7.setAttribute("name", "checkOutDate");
        myForm.appendChild(element7);

        let element8=document.createElement("input")
        element8.setAttribute("value", checkOutMonth);
        element8.setAttribute("name", "checkOutMonth");
        myForm.appendChild(element8);

        let element9=document.createElement("input")
        element9.setAttribute("value", checkOutYear);
        element9.setAttribute("name", "checkOutYear");
        myForm.appendChild(element9);

        let element10=document.createElement("input")
        element10.setAttribute("value", checkInYear);
        element10.setAttribute("name", "checkInYear");
        myForm.appendChild(element10);
        console.log(myForm)

        myForm.setAttribute("action", "/confirmReservation")
        myForm.setAttribute("method", "POST")
        document.body.appendChild(myForm)
        myForm.submit();

    }
  });

roomName=document.querySelector('.room-title h2').textContent


updateCalendar()


