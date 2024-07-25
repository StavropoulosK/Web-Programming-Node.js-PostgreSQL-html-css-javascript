import * as reservationModel from '../model/reservation.mjs';

async function datesNotAvailable(req,res,next){

    try{
        const year=req.params.year
        const month=req.params.month
        const diamorfosi=req.params.diamorfosi
        const amea=req.params.amea
        const roomType=req.params.roomName

        const map={
            '4_imidipla':[0 ,4],
            '1_diplo_2_mona':[2 ,1],
            '4_mona':[4,0],
            '1_diplo':[0,1],
            '2_mona':[2,0]
        }
        const firstDateOfMonth=year+'-'+month+'-'+'01'
        const lastDateOfMonth=getLastDate(year,month)
        
        const singleBeds=map[diamorfosi][0]
        const doubleBeds=map[diamorfosi][1]

        const klismenes= await reservationModel.datesNotAvailable(firstDateOfMonth,lastDateOfMonth,singleBeds,doubleBeds,roomType,amea)

        let result=[]
        for(let t=0;t<klismenes.length;t++){
            const imer=Number(klismenes[t].i.split('-')[2])
            result.push(imer)
        }

        // Epestrepse tis imerominies pou gia to sigkekrimeno tipo domatiou gia ton sigkekrimeno mina einai ola piasmena

        res.json({ klismenes: result });
    }catch(error){
        next(error)
    }    

}

async function checkIfRoomTypeIsAvailable(req,res,next){
    try{
        const roomType=req.params.roomName
        const amea=req.params.amea
        const diamorfosi=req.params.diamorfosi
        const checkInDate=req.params.checkInDate
        const checkInMonth=req.params.checkInMonth
        const checkInYear=req.params.checkInYear
        const checkOutDate=req.params.checkOutDate
        const checkOutMonth=req.params.checkOutMonth
        const checkOutYear=req.params.checkOutYear

        const map={
            '4_imidipla':[0 ,4],
            '1_diplo_2_mona':[2 ,1],
            '4_mona':[4,0],
            '1_diplo':[0,1],
            '2_mona':[2,0]
        }

        const firstDate=checkInYear+'-'+checkInMonth+'-'+checkInDate
        const lastDate=checkOutYear+'-'+checkOutMonth+'-'+checkOutDate
        
        const singleBeds=map[diamorfosi][0]
        const doubleBeds=map[diamorfosi][1]
        
        const klismenes= await reservationModel.datesNotAvailable(firstDate,lastDate,singleBeds,doubleBeds,roomType,amea)

        const result=klismenes.length==0

        // Epestrepse true i false gia to an to domatio einai diathesimo 

        res.json({result:result})

    }catch(error){
        next(error)
    }
    
}

function getLastDate(year, month) {
    // maios = minas 5, year =2024
    // epistrefei  2024-05-31

    const lastDate = new Date(year, month , 1);

    // Format the dates in yyyy-mm-dd format
    const lastDateFormatted = lastDate.toISOString().split('T')[0];

    return lastDateFormatted.toString()
}

export function getTimes(times,firstDate,lastDate){
    //times einai to apotelesma tis klisis reservationModel.getTimesDomatiou
    let result=[]
    if(times[0].length!==0){
        let startDate=firstDate
        let endDate

        if(times[0][0].enddate<lastDate){
            endDate=times[0][0].enddate
        }
        else{
            endDate=lastDate
        }
    
        let price=times[0][0].price

        if (price % 1 === 0) {
            // If it's an integer, convert to integer
            price= parseInt(price);
        }
        let Difference_In_Days = ( (new Date(endDate)).setHours(0,0,0,0) - (new Date(startDate)).setHours(0,0,0,0) ) / (1000*60*60*24) + 1
        for(let i=0;i<Difference_In_Days;i++){
            result.push(price)
        }


    }
    if(times[1].length!==0){
        for(let i=0;i<times[1].length;i++){
            const obj=times[1][i]
            let price=obj.price
            let startDate=obj.startdate
            let endDate=obj.enddate

            if (price % 1 === 0) {
                // If it's an integer, convert to integer
                price= parseInt(price);
            }

            let Difference_In_Days = ( (new Date(endDate)).setHours(0,0,0,0) - (new Date(startDate)).setHours(0,0,0,0) ) / (1000*60*60*24) + 1
            for(let i=0;i<Difference_In_Days;i++){
                result.push(price)
            }

        }


    }

    if(times[2].length!==0){
        let startDate

        startDate=times[2][0].startdate
        

        // if(times[2][0].enddate)
        let price=times[2][0].price
        let enddate=lastDate

        if (price % 1 === 0) {
            // If it's an integer, convert to integer
            price= parseInt(price);
        }


        let Difference_In_Days = ( (new Date(enddate)).setHours(0,0,0,0) - (new Date(startDate)).setHours(0,0,0,0) ) / (1000*60*60*24) + 1
        for(let i=0;i<Difference_In_Days;i++){
            result.push(price)
        }


    }

    return result;

}

async function returnTimesDomatiou(req,res,next){
    try{
        const roomType=req.params.roomName
        const year=req.params.currentCalendarYear
        const month=req.params.currentCalendarMonth
        
        const firstDate=year+'-'+month+'-'+'01'
        const lastDate=getLastDate(year,month)

        
        
        const times=await reservationModel.getTimesDomatiou(roomType,firstDate,lastDate)
        
        let result=getTimes(times,firstDate,lastDate)

        res.json({times:result})
    }catch(error){
        next(error)
    }
}

function getTotalCost(arr){
    let res=0
    for(let i=0;i<arr.length;i++){
        res += arr[i]
    }
    return res
}

function generateDates(startDate, endDate) {
    // Convert input strings to Date objects
    let start = new Date(startDate);
    let end = new Date(endDate);
    
    // Array to hold all the dates
    let dates = [];

    // Iterate from start date to end date
    while (start <= end) {
        // Push the current date to the array (formatted as 'YYYY-MM-DD')
        let dateTemp=new Date(start).toISOString().split('T')[0]

        const year=(dateTemp.split('-')[0]).substring(2)
        const month=dateTemp.split('-')[1]
        const date=dateTemp.split('-')[2]

        dateTemp= date+'/'+month+'/'+year

        dates.push( dateTemp );
        // Increment the date by 1 day
        start.setDate(start.getDate() + 1);
    }
    
    return dates;
}

function getImerominiesTimes(imerominies,times){
    let result=[]
    for(let i=0;i<imerominies.length;i++){
        const klasi=`d${i+1}`
        result.push({imerominia:imerominies[i], timi:times[i], klasi:klasi})
    }
    return result

}

function formatDates(reservedDates){
    let res=[]
    let previous=-1
    for(let i=0;i<reservedDates.length;i++){
        const obj=reservedDates[i]
        if(previous!=obj.number){
            let kat={number:obj.number,sea_view:obj.sea_view,kratisis:[{ start: obj.check_in, end: obj.check_out }]}
            res.push(kat)
            previous=obj.number
        }
        else{
            let current_obj=res[res.length-1]
            current_obj.kratisis.push({ start: obj.check_in, end: obj.check_out })
        }
        
    }
    return res
}


function filterReservedDates(check_in, check_out, reservedPeriods) {
    let result = [];
    
    // Parse the input dates
    let checkInDate = new Date(check_in);
    let checkOutDate = new Date(check_out);
    
    // Sort the reserved periods by start date
    reservedPeriods.sort((a, b) => new Date(a.start) - new Date(b.start));
    
    let currentStart = checkInDate;
    
    for (let period of reservedPeriods) {
        let reservedStart = new Date(period.start);
        let reservedEnd = new Date(period.end);

        if (currentStart <= reservedStart) {
            result.push({
                start: currentStart.toISOString().split('T')[0].toString(),
                end: reservedStart.toISOString().split('T')[0].toString()
            });
        }
        
        currentStart = reservedEnd;
    }
    
    // Add the last free period from the end of the last reserved period to check_out
    if (currentStart <= checkOutDate) {
        result.push({
            start: currentStart.toISOString().split('T')[0],
            end: checkOutDate.toISOString().split('T')[0]
        });
    }

    return result;
}


function getFreeDates(reservedDates,check_in,check_out){
    let res=[]

    for(let i=0;i<reservedDates.length;i++){
        const number=reservedDates[i].number
        const sea_view=reservedDates[i].sea_view
        let reservedPeriods=reservedDates[i].kratisis
  
        let availableDates=filterReservedDates(check_in, check_out,reservedPeriods);
        availableDates= removeSameDate(availableDates)
        const obj={number:number,sea_view:sea_view,freeDates:availableDates}
        res.push(obj)
    }

    return res

}

function removeSameDate(availableDates){
    let res=[]
    for(let i=0;i<availableDates.length;i++){
        const obj=availableDates[i]
        if(obj.start!=obj.end){
            res.push(obj)
        }
    }

    return res
}

function getTotalDates(Dates){
    let allDates=[]
    for(let i=0;i<Dates.length;i++){
        let temp=Dates[i].freeDates
        for(let j=0;j<temp.length;j++){
            allDates.push(temp[j])
        }
    }
    return allDates
}

function removeOverlappingElements(array) {
    // Iterate through each element
    let res=[]
    for (let i = 0; i < array.length; i++) {
        let toInsert=true
        let currentElem = array[i]
        const currentStart=new Date(currentElem.start).toISOString().split('T')[0]
        const currentEnd=new Date(currentElem.end).toISOString().split('T')[0]
        for(let j=0;j<array.length;j++){
            let otherElem = array[j]
            if(otherElem!==currentElem){
                const otherStart=new Date(otherElem.start).toISOString().split('T')[0]
                const otherEnd=new Date(otherElem.end).toISOString().split('T')[0]
                if(otherStart<=currentStart && otherEnd>=currentEnd && (otherStart!=currentStart || otherEnd!=currentEnd) ){
                
                    toInsert=false
                    break;
                    
                }
            }
        }
        if(toInsert===true){

            res.push(currentElem)
        }
    }
    // afairesi diplotipon

    let result=res.filter((element, index, self) => 
            index === self.findIndex(e => 
            e.start === element.start && e.end === element.end
        )
    );
    return  result
}



async function confirmReservation(req,res,next){
    try{
        const roomType=req.body.roomName
        const amea=req.body.amea
        const atoma=req.body.atoma
        const diamorfosi=req.body.diamorfosi
        const checkInDate=req.body.checkInDate
        const checkInMonth=req.body.checkInMonth
        const checkInYear=req.body.checkInYear
        const checkOutDate=req.body.checkOutDate
        const checkOutMonth=req.body.checkOutMonth
        const checkOutYear=req.body.checkOutYear
        
        const checkIn= checkInYear+'-'+checkInMonth+'-'+checkInDate
        const checkOut= checkOutYear+'-'+checkOutMonth+'-'+checkOutDate

        let tipos=roomType

        if(amea=='true'){
            tipos+=' ΑΜΕΑ'
        }
        tipos +=' '+ diamorfosi

        // Kathe domatio kathorizetai apo ton tipo tou, tin diamorfosi ton krebation, kai an einai gia AmeA

        let mapper={
            'Υπερπολυτελή Σουίτα 4_imidipla':'yperpoliteli',
            'Deluxe Σουίτα 2 Υπνοδωματίων 1_diplo_2_mona':'deluxe2_a',       
            'Deluxe Σουίτα 2 Υπνοδωματίων 4_mona':'deluxe2_b',       
            'Deluxe Σουίτα 2 Υπνοδωματίων ΑΜΕΑ 1_diplo_2_mona':'deluxe2_Amea_1',
            'Deluxe Σουίτα 2 Υπνοδωματίων ΑΜΕΑ 4_mona':'deluxe2_Amea_2',
            'Deluxe Σουίτα 1 Υπνοδωματίου 2_mona':'deluxe1_1',
            'Deluxe Σουίτα 1 Υπνοδωματίου 1_diplo':'deluxe1_2',

            'Διαμέρισμα 2 Υπνοδωματίων 1_diplo_2_mona':'simple2_1',       
            'Διαμέρισμα 2 Υπνοδωματίων 4_mona':'simple2_3',       
            'Διαμέρισμα 2 Υπνοδωματίων ΑΜΕΑ 1_diplo_2_mona':'simple2_Amea1',
            'Διαμέρισμα 2 Υπνοδωματίων ΑΜΕΑ 4_mona':'simple2_Amea2',
            'Διαμέρισμα 1 Υπνοδωματίου 2_mona':'simple1_1',
        }

        const rooms={

            yperpoliteli:{
                className:"yperpoliteli",
                img:'/resources/room_photos/yperpoliteli/dex_b.jpg',
                titlos:'Presidential Suite',
                amenity:['Jacuzzi','Japanese Toilets','Sea view'],
                tetragonika:150,
                krebati:[{onoma:'4 semi-double beds',ikonaSrc:'/resources/icons/double_bed.png'}],
            },
            deluxe2_a:{
                className:"deluxe2_a",
                img:'/resources/room_photos/deluxe_2_room/break-649351_1280.jpg',
                titlos:'Deluxe Two Bedroom Suite',
                amenity:['Japanese Toilets','Modern design','Sea view'],
                tetragonika:50,
                krebati:[{onoma:'1 double bed',ikonaSrc:'/resources/icons/double_bed.png'},
                        {onoma:'2 single beds',ikonaSrc:'/resources/icons/single_bed.png'}]
            },
            deluxe2_b:{
                className:"deluxe2_b",
                img:'/resources/room_photos/deluxe_2_room/break-649351_1280.jpg',
                titlos:'Deluxe Two Bedroom Suite',
                amenity:['Japanese Toilets','Modern design','Sea view'],
                tetragonika:50,
                krebati:[{onoma:' 4 Single Beds',ikonaSrc:'/resources/icons/single_bed.png'}]
            },
            deluxe2_Amea_1:{
                className:"deluxe2_Amea_1",
                img:'/resources/room_photos/deluxe_2_room/break-649351_1280.jpg',
                titlos:'Deluxe Two Bedroom Suite disabled-friendly',
                amenity:['Japanese Toilets','Modern design','Sea view'],
                tetragonika:50,
                krebati:[{onoma:'1 double bed',ikonaSrc:'/resources/icons/double_bed.png'},
                        {onoma:'2 single beds',ikonaSrc:'/resources/icons/single_bed.png'}]
            },
            deluxe2_Amea_2:{
                className:"deluxe2_Amea_2",
                img:'/resources/room_photos/deluxe_2_room/break-649351_1280.jpg',
                titlos:'Deluxe Two Bedroom Suite disabled friendly',
                amenity:['Japanese Toilets','Modern design','Sea view'],
                tetragonika:50,
                krebati:[{onoma:'4 single beds',ikonaSrc:'/resources/icons/single_bed.png'}]
            },
            deluxe1_1:{
                className:"deluxe1_1",
                img:'/resources/room_photos/deluxe_1_room/del1_2.jpg',
                titlos:'Deluxe One Bedroom Suite ',
                amenity:['Japanese Toilets','Modern design','Sea view'],
                tetragonika:40,
                krebati:[{onoma:'2 single beds',ikonaSrc:'/resources/icons/single_bed.png'}]
            },
            deluxe1_2:{
                className:"deluxe1_1",
                img:'/resources/room_photos/deluxe_1_room/del1_2.jpg',
                titlos:'Deluxe One Bedroom Suite ',
                amenity:['Japanese Toilets','Modern design','Sea view'],
                tetragonika:40,
                krebati:[{onoma:'1 double bed',ikonaSrc:'/resources/icons/double_bed.png'}]
            },
            simple2_1:{
                className:"simple2_1",
                img:'/resources/room_photos/simple_2_room/apartment_2_room.jpg',
                titlos:'Two bedroom apartment',
                amenity:['Aegean architecture','Air condition'],
                tetragonika:35,
                krebati:[{onoma:'1 double bed',ikonaSrc:'/resources/icons/double_bed.png'},
                        {onoma:'2 single beds',ikonaSrc:'/resources/icons/single_bed.png'}]
            },
            simple2_3:{
                className:"simple2_3",
                img:'/resources/room_photos/simple_2_room/balcony.jpg',
                titlos:'Two bedroom apartment',
                amenity:['Aegean architecture','Air condition'],
                tetragonika:35,
                krebati:[{onoma:' 4 single beds',ikonaSrc:'/resources/icons/single_bed.png'}]
            },
            simple2_Amea1:{
                className:"simple2_Amea1",
                img:'/resources/room_photos/simple_2_room/balcony.jpg',
                titlos:'Two bedroom apartment disabled friendly',
                amenity:['Aegean architecture','Air condition'],
                tetragonika:35,
                krebati:[{onoma:'1 double bed',ikonaSrc:'/resources/icons/double_bed.png'},
                        {onoma:'2 single beds',ikonaSrc:'/resources/icons/single_bed.png'}]
            },
            simple2_Amea2:{
                className:"simple2_Amea2",
                img:'/resources/room_photos/simple_2_room/balcony.jpg',
                titlos:'Two bedroom apartment disabled friendly',
                amenity:['Aegean architecture','Air condition'],
                tetragonika:35,
                krebati:[{onoma:'4 single beds',ikonaSrc:'/resources/icons/single_bed.png'}]
            },
            simple1_1:{
                className:"simple1_1",
                img:'/resources/room_photos/simple_1_room/living-room-8539168_1280.jpg',
                titlos:'One bedroom apartment ',
                amenity:['Aegean architecture','Air condition'],
                tetragonika:30,
                krebati:[{onoma:'2 single beds',ikonaSrc:'/resources/icons/single_bed.png'}]
            }
        }

        const room=rooms[mapper[tipos]]

        

        const bedroomMap={
            '4_imidipla':[0 ,4],
            '1_diplo_2_mona':[2 ,1],
            '4_mona':[4,0],
            '1_diplo':[0,1],
            '2_mona':[2,0]
        }

        const singleBeds=bedroomMap[diamorfosi][0]
        const doubleBeds=bedroomMap[diamorfosi][1]

        const availableRooms= await reservationModel.getRoomsThatAreAvailableForAllDates(roomType,amea,singleBeds,doubleBeds,checkIn,checkOut)

        
        // const reservation={
        //     roomName:roomType,
        //     amea:amea,
        //     atoma:atoma,
        //     diamorfosi:diamorfosi,
        //     checkInDate:checkInDate,
        //     checkInMonth:checkInMonth,
        //     checkInYear:checkInYear,
        //     checkOutDate:checkOutDate,
        //     checkOutMonth:checkOutMonth,
        //     checkOutYear:checkOutYear,
        //     kostos:kostos,
        //     theaStiThalasa:theaStiThalasa
        // }

        


        let kratisis=[]
        let sinafis=''




        if(availableRooms.length!=0){
            

            let theaStiThalasa=''

            if(roomType=='Διαμέρισμα 2 Υπνοδωματίων' || roomType=='Διαμέρισμα 1 Υπνοδωματίου'){
                // Elegxos an iparxi domatio me thea stin thalasa apo tis katigories pou den exoun default thea stin thalasa
                if(amea=='true'){
                    theaStiThalasa='true'
                }
                else{
                    for(let i=0;i<availableRooms.length;i++){
                        if(availableRooms[i].sea_view==true){
                            theaStiThalasa='true'
                            break;

                        }
                    }
                }

            }

            // console.log(availableRooms)

            const diathesima=availableRooms.length

            const timesTemp=await reservationModel.getTimesDomatiou(roomType,checkIn,checkOut)
            const times= getTimes(timesTemp,checkIn,checkOut,timesTemp)


            // o pelatis den plironi gia tin imerominia pou kani check_out
            times[times.length-1]=0
            

            let dates = generateDates(checkIn, checkOut);

            // let imerominiesTimes=[{imerominia:'21/04/23',timi:20,klasi:"d1"},{imerominia:'21/04/23',timi:30,klasi:"d2"},{imerominia:'21/04/23',timi:40,klasi:"d3"},{imerominia:'21/04/23',timi:50,klasi:"d4"},{imerominia:'21/04/23',timi:26,klasi:"d5"}]
            let imerominiesTimes=getImerominiesTimes(dates,times)
            const kostos=getTotalCost(times)

            let reservation={
                roomName:roomType,
                amea:amea,
                atoma:atoma,
                diamorfosi:diamorfosi,
            }

            reservation.checkInDate=checkInDate
            reservation.checkInMonth=checkInMonth
            reservation.checkInYear=checkInYear
            reservation.checkOutDate=checkOutDate
            reservation.checkOutMonth=checkOutMonth
            reservation.checkOutYear=checkOutYear
            reservation.kostos=kostos
            reservation.theaStiThalasa=theaStiThalasa

            kratisis=[{room:room,reservation:reservation,diathesima:diathesima,times:imerominiesTimes,checkIn:checkIn,checkOut:checkOut,kostos:kostos}]

        }

        else{
            // Den iparxi kanena domatio diathesimo sinexomena apo checkIn mexri checkOut.

            sinafis='1'
    
            const reservedDatesTemp=await reservationModel.getReservedDates(roomType,amea,singleBeds,doubleBeds,checkIn,checkOut)
            const reservedDates=formatDates(reservedDatesTemp)
            const freeDates=getFreeDates(reservedDates,checkIn,checkOut)
            const totalDates=getTotalDates(freeDates)
            const freeDatesNoOverlap=removeOverlappingElements(totalDates)
            for(let i=0;i<freeDatesNoOverlap.length;i++){

                let reservation={
                    roomName:roomType,
                    amea:amea,
                    atoma:atoma,
                    diamorfosi:diamorfosi,
                }


                const check_in=freeDatesNoOverlap[i].start
                const checkOut=freeDatesNoOverlap[i].end
                let theaStiThalasa=''

                if(roomType=='Διαμέρισμα 2 Υπνοδωματίων' || roomType=='Διαμέρισμα 1 Υπνοδωματίου'){
                    // Elegxos an iparxi domatio me thea stin thalasa apo tis katigories pou den exoun default thea stin thalasa
                    if(amea=='true'){
                        theaStiThalasa='true'
                    }
                    else{
                        
                        for(let i=0;i<freeDates.length  && theaStiThalasa=='';i++){
                            if(freeDates[i].sea_view==true){
                                let dates= freeDates[i].freeDates
                                for(let j=0;j<dates.length && theaStiThalasa=='';j++){
                                    let dayStart=dates[j].start
                                    let dayEnd=dates[j].end
                                    if(dayStart==check_in  && dayEnd==checkOut){
                                        theaStiThalasa='true'
                                    }
                                }
                            }
                        }
                    }
        
                }

                reservation.checkInDate=check_in.split('-')[2]
                reservation.checkInMonth=check_in.split('-')[1]
                reservation.checkInYear=check_in.split('-')[0]
                reservation.checkOutDate=checkOut.split('-')[2]
                reservation.checkOutMonth=checkOut.split('-')[1]
                reservation.checkOutYear=checkOut.split('-')[0]

                // reservation.kostos=kostos
                reservation.theaStiThalasa=theaStiThalasa

                const diathesima=''

                const timesTemp=await reservationModel.getTimesDomatiou(roomType,check_in,checkOut)
                const times= getTimes(timesTemp,check_in,checkOut)
                // o pelatis den plironi gia tin imerominia pou kani check_out
                times[times.length-1]=0




                // console.log(times,check_in,checkOut)
                let dates = generateDates(check_in, checkOut);
        
                let imerominiesTimes=getImerominiesTimes(dates,times)
                const kostos=getTotalCost(times)

                // console.log(kostos,imerominiesTimes)
                reservation.kostos=kostos

        

            // let imerominiesTimes=[{imerominia:'21/04/23',timi:20,klasi:"d1"},{imerominia:'21/04/23',timi:30,klasi:"d2"},{imerominia:'21/04/23',timi:40,klasi:"d3"},{imerominia:'21/04/23',timi:50,klasi:"d4"},{imerominia:'21/04/23',timi:26,klasi:"d5"}]

                kratisis.push({room:room,reservation:reservation,diathesima:diathesima,times:imerominiesTimes,checkIn:check_in,checkOut:checkOut,kostos:kostos})


            }

        }

        res.render('templates/toMakeReservation', {css: [ '/availableRooms.css'], js:['/availableRooms.js'],sinafis:sinafis,  kratisis:kratisis});
        
    }catch(error){
        next(error)
    }

    


}

export {datesNotAvailable, checkIfRoomTypeIsAvailable, returnTimesDomatiou,confirmReservation}