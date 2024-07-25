import * as finaliseReservationModel from '../model/finaliseReservation.mjs';
import * as reservationModel from '../model/reservation.mjs';
import {getTimes} from './reservation.mjs'

function checkIfTenDays(checkInDate,checkInMonth,checkInYear){
    const checkIn= new Date(Number(checkInYear),Number(checkInMonth)-1,Number(checkInDate)).setHours(0,0,0,0)
    const today= new Date().setHours(0,0,0,0);
    const timeDifference = checkIn - today
    const daysDifference = (timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference>=10
    
}

function getKostos(arr){
    let res=0
    for(let i=0;i<arr.length;i++){
        res +=arr[i]
    }
    return res
}

async function makeFirstBookPayment(req,res,next){
    try {
        const roomName=req.params.roomName
        const amea=req.params.amea
        const atoma=req.params.atoma
        const diamorfosi=req.params.diamorfosi
        const checkInDate=req.params.checkInDate
        const checkInMonth=req.params.checkInMonth
        const checkInYear=req.params.checkInYear
        const checkOutDate=req.params.checkOutDate
        const checkOutMonth=req.params.checkOutMonth
        const checkOutYear=req.params.checkOutYear

        const kostos=req.params.kostos
        let theaStiThalasa=req.params.theaStiThalasa

        let eksoflisiMisouPosou=''

        const map={
            '4_imidipla':[0 ,4],
            '1_diplo_2_mona':[2 ,1],
            '4_mona':[4,0],
            '1_diplo':[0,1],
            '2_mona':[2,0]
        }

        const singleBeds=map[diamorfosi][0]
        const doubleBeds=map[diamorfosi][1]


        if(checkIfTenDays(checkInDate,checkInMonth,checkInYear)){
            eksoflisiMisouPosou='1'
        }
        
        const reservation={
            atoma:atoma,
            checkInDate:checkInDate,
            checkInMonth:checkInMonth,
            checkInYear:checkInYear,
            checkOutDate:checkOutDate,
            checkOutMonth:checkOutMonth,
            checkOutYear:checkOutYear,
            kostos:kostos,
            singleBeds:singleBeds,
            doubleBeds:doubleBeds,
            roomName:roomName,
            amea:amea,
            theaStiThalasa:theaStiThalasa
        }


        res.render('templates/firstPayment', { css: [ 'paymentFormStyle.css'], js:['firstPaymentForm.js'], eksoflisiMisouPosou:eksoflisiMisouPosou,kostosKsenodoxiou:kostos,reservation:reservation });
    } catch (error) {
       next(error)
    }
    

}

async function makePaymentToBank(cardHolderName,creditCard,date,cvv,poso){
    //edo ginetai diasindesi me to dbms tis trapezas kai epalitheontai ta stoixeia tis kartas tou xristi kai pragmatopoiteitai i pliromi.
    return true
}

async function finaliseReservation(req,res,next){
    try {
        let proino= req.body.checkbox1
        let pliromiMisouPosou= req.body.checkbox2
        const checkInDate=req.body.checkInDate
        const checkInMonth=req.body.checkInMonth
        const checkInYear= req.body.checkInYear
        const checkOutDate=req.body.checkOutDate
        const checkOutMonth=req.body.checkOutMonth
        const checkOutYear= req.body.checkOutYear

        const cardHolderName=req.body.cardHolderName
        const creditCard= req.body.creditCard
        const date= req.body.date
        const cvv=  req.body.cvv

        const checkIn=checkInYear+'-'+checkInMonth+"-"+checkInDate
        const checkOut=checkOutYear+'-'+checkOutMonth+"-"+checkOutDate
        const roomName=req.body.roomName
        const singleBeds=Number(req.body.singleBeds)
        const doubleBeds=Number(req.body.doubleBeds)
        const atoma= Number(req.body.atoma)
        const kostosKsenodoxiou=Number(req.body.kostos)


        let amea=req.body.amea
        let theaStiThalasa=req.body.theaStiThalasa


        if(proino=='on'){
                proino=true
        }
        else{
                proino=false
        }

        if(pliromiMisouPosou=='on'){
                pliromiMisouPosou=true
        }
        else{
                pliromiMisouPosou=false
        }

        if(amea=='true'){
                amea=true
            }
            else{
                amea=false
            }



            if(roomName!='Διαμέρισμα 2 Υπνοδωματίων' && roomName!='Διαμέρισμα 1 Υπνοδωματίου'){
                theaStiThalasa=true
            }
            else{
                if(theaStiThalasa=='' || theaStiThalasa===undefined){
                    theaStiThalasa=false
                }
                else{
                    theaStiThalasa=true
                }
            
            }


            const reservation={
                atoma:req.body.atoma,
                checkInDate:req.body.checkInDate,
                checkInMonth:req.body.checkInMonth,
                checkInYear:req.body.checkInYear,
                checkOutDate:req.body.checkOutDate,
                checkOutMonth:req.body.checkOutMonth,
                checkOutYear:req.body.checkOutYear,
                kostos:req.body.kostos,
                singleBeds:req.body.singleBeds,
                doubleBeds:req.body.doubleBeds,
                roomName:req.body.roomName,
                amea:req.body.amea,
                theaStiThalasa:req.body.theaStiThalasa
            }

            // Bres domatio. An den iparxei (giati piastike mexri na kani tin pliromi o pelatis) enimerose.
            // Kataxorise tin kratisi. An proekipse epikalipsi mexri na tin kataxorisis(apo tin stigmi poy enimerose proigoumenos mexri na kataxorithi i kratisi egine kratisi sto domatio apo alon pelati) bgale tin kratisi kai enimerose
            // Kane tin pliromi. An apotixi bgale tin kratisi kai enimerose. 

            const roomNumber= await finaliseReservationModel.findRoom(checkIn,checkOut,roomName,singleBeds,doubleBeds,amea,theaStiThalasa)


            const timesTemp=await reservationModel.getTimesDomatiou(roomName,checkIn,checkOut)
            const times= getTimes(timesTemp,checkIn,checkOut)

            // o pelatis den plironi gia tin imerominia pou kani check_out
            times[times.length-1]=0
            const kostosKsenodoxiouEpalitheusi=getKostos(times)

            let response=''


            if(kostosKsenodoxiouEpalitheusi==kostosKsenodoxiou && roomNumber!=-1){

                const sinolikoKostos=kostosKsenodoxiou+atoma*5
                const userId=req.session.userID
                
                const kratisiId= await finaliseReservationModel.insertReservation(userId,checkIn,checkOut,roomNumber,proino,atoma,sinolikoKostos)

                // bale tin kratisi
                // an iparxei epikalpi bgale tin kai enimerose. Epikalipsi mporei na prokipsi epeidi o kodikas einai asigxronos kai mporei na epixirisoun tautoxrona dio xristes
                // na kanoun kratisi sto idio domatio. Se auti tin periptosi to kratisiId leitourgei san timestamp kai paramenei i kratisi pou mpike proti.

                const epikalipsi=await finaliseReservationModel.checkEpikalipsi(checkIn,checkOut,roomNumber,kratisiId)

                if(epikalipsi==true){
                    await finaliseReservationModel.removeReservation(kratisiId)
                    response='Reservation failed'
                }
                else{
                        //kane tin pliromi. An apotixi bgale tin kratisi kai enimerose.

                        let paymentAmount=0

                        if(pliromiMisouPosou==true){
                            paymentAmount=sinolikoKostos/2
                        }
                        else{
                            paymentAmount=sinolikoKostos
                        }

                        const pliromiDone= await makePaymentToBank(cardHolderName,creditCard,date,cvv,paymentAmount)

                        if(pliromiDone==true){
                            await finaliseReservationModel.insertPayment(kratisiId,paymentAmount)
                            response='Your reservation has been made.'
                        }
                        else{

                            await finaliseReservationModel.removeReservation(kratisiId)

                            response='Reservation failed'

                        }

                }

            }

            else{
                response='Reservation failed'
            }

            

            let eksoflisiMisouPosou=''

            if(checkIfTenDays(checkInDate,checkInMonth,checkInYear)){
                eksoflisiMisouPosou='1'
            }

            res.render('templates/firstPayment', { css: [ 'paymentFormStyle.css'], js:['firstPaymentForm.js'], eksoflisiMisouPosou:eksoflisiMisouPosou,kostosKsenodoxiou:kostosKsenodoxiou,response:response,reservation:reservation });
    } catch (error) {
       next(error)
    }

}

export {checkIfTenDays,makeFirstBookPayment,finaliseReservation}