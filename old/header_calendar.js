'use strict'

const monthYearElement= document.getElementById('monthYear');
const datesElement= document.getElementById('dates');
const prevBtn= document.getElementById('prevBtn')
const nextBtn= document.getElementById('nextBtn')
const checkIn=document.querySelector('span.check-inDate')
const checkOut=document.querySelector('span.check-outDate')


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

function updateCalendar(){
    const currentYear= currentDate.getFullYear();
    const currentMonth= currentDate.getMonth()

    // me triti parametros 0 epistrefei tin teleutaia mera tou proigoumenou mina
    const firstDay= new Date(currentYear, currentMonth,0);   //teleutaia mera proigoumenou mina
    const lastDay=new Date(currentYear,currentMonth+1,0);    //teleutaia mera torinou mina
    const totalDays= lastDay.getDate();
    const firstDayIndex= firstDay.getDay()
    const lastDayIndex= lastDay.getDay()
    const monthYearString= currentDate.toLocaleString('el', {month:'long', year:'numeric'})


    monthYearElement.textContent= monthYearString;

    let datesHTML="";
    datesElement.style.gridColumnStart=firstDayIndex


    for(let i=firstDayIndex; i>0; i--){
        const prevDate= new Date(currentYear, currentMonth, 0-i+1)
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    for(let i=1; i<=totalDays; i++){
        const date=new Date(currentYear,currentMonth,i);
        datesHTML += `<div class="date" id="date${i}"><span>${i}</span><span>20€</span></div>`
    }

    if(lastDayIndex!==0){
        for(let i=1; i<=7 -lastDayIndex; i++){
            const nextDate=new Date(currentYear, currentMonth+1,i);
            datesHTML += `<div class="date inactive"> ${nextDate.getDate()}</div>`;

        }
    }

    datesElement.innerHTML =datesHTML

    klismenes()
    const selectable_dates=document.querySelectorAll('.date:not(.inactive):not(.full)')
    selectable_dates.forEach(element => {
        element.addEventListener("click",(ev)=>{
            selectDates(ev)
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
    currentDate.setMonth(currentDate.getMonth()+1)
    updateCalendar()
})


// endiktika kapoies klismenes imerominies

function klismenes(){
    const klismenes=[12,17];
    for(let i=0;i<klismenes.length;i++){
    const date=document.getElementById(`date${klismenes[i]}`)
    date.classList.add("full")
    }
}

function selectDates(ev){
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

        const checkOutDate=Number(secondDateSpan.textContent)
        let checkOutMonth=monthYearElement.textContent.split(' ')[0]
        checkOutMonth=Number(monthMap[checkOutMonth])
        const checkOutYear=Number(monthYearElement.textContent.split(' ')[1])

    
        const checkInDate=Number(checkIn.textContent.split("/")[0])
        const checkInMonth=Number(checkIn.textContent.split("/")[1])
        const checkInYear=Number(checkIn.textContent.split("/")[2])
        const firstDateBiggerThanSecond= checkInYear*400+checkInMonth*31+checkInDate > checkOutYear*400+checkOutMonth*31+checkOutDate
        if(firstDateBiggerThanSecond || !roomTypeAvailable(1,1,'deluxe')){
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
    // oles oi imerominies metaksi checkIn kai checkOut thetontai active
    if(checkIn.textContent!=="-" && checkOut.textContent!=='-' && kratisiSeDiaforetikousMines()){

        const checkInDate=Number(checkIn.textContent.split("/")[0])
        const checkInMonth=Number(checkIn.textContent.split("/")[1])
        const checkInYear=Number(checkIn.textContent.split("/")[2])

        const checkOutDate=Number(checkOut.textContent.split("/")[0])
        const checkOutMonth=Number(checkOut.textContent.split("/")[1])
        const checkOutYear=Number(checkOut.textContent.split("/")[2])

        let currentCalendarMonth=monthYearElement.textContent.split(' ')[0]
        currentCalendarMonth=Number(monthMap[currentCalendarMonth])
        const currentCalendarYear=Number(monthYearElement.textContent.split(' ')[1])
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
    
}

// Meni na ilopoiithi. Epistrefei an enas sigkekrimenos tipos domatiou einai diathesimos metaksi ton imerominion date1,date2
function roomTypeAvailable(date1,date2,roomtype){
    return true
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

updateCalendar()


