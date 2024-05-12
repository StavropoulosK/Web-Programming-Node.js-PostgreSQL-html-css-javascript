const checkIfTenDays=(checkInDate,checkInMonth,checkInYear)=>{
    const checkIn= new Date(Number(checkInYear),Number(checkInMonth)-1,Number(checkInDate))
    const today= new Date();
    const timeDifference = checkIn.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference>10
    
}

const findroom= async (roomName,amea,diamorfosi,checkInDate,checkInMonth,checkInYear,checkOutDate,checkOutMonth,checkOutYear,theaStiThalasa)=>{
    return 4
}

const makeFirstBookPayment= async(req,res)=>{
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
    const theaStiThalasa=req.params.theaStiThalasa

    let eksoflisiMisouPosou=''


    if(checkIfTenDays(checkInDate,checkInMonth,checkInYear)){
        eksoflisiMisouPosou='1'
    }

    // Bres domatio. An den iparxei kane redirect. An iparxi stilto san parametro.
    // Otan labo tin apantisi apo tin forma
    // Bale tin kratisi. An iparxei epikalipsi bgale tin kratisi kai enimerose
    // Kane tin pliromi. An apotixi bgale tin kratisi kai enimerose. 
    
    const room= await findroom(roomName,amea,diamorfosi,checkInDate,checkInMonth,checkInYear,checkOutDate,checkOutMonth,checkOutYear,theaStiThalasa)

    if(room==null){
        res.redirect('/')
        return
    }

    const reservation={
        atoma:atoma,
        room:room,
        checkInDate:checkInDate,
        checkInMonth:checkInMonth,
        checkInYear:checkInYear,
        checkOutDate:checkOutDate,
        checkOutMonth:checkOutMonth,
        checkOutYear:checkOutYear,
        kostos:kostos
    }


    let response=''


    const profileImg=''

    res.render('templates/firstPayment', { css: [ 'paymentFormStyle.css'], js:['firstPaymentForm.js'], eksoflisiMisouPosou:eksoflisiMisouPosou,kostosKsenodoxiou:kostos,response:response,reservation:reservation, loginned:'1',profileImg:profileImg });


}

const finaliseReservation= async(req,res)=>{
    //bale tin kratisi
    // an iparxei epikalipsi bgale tin kai enimerose

   const cardHolderName=req.body.cardHolderName
   const creditCard= req.body.creditCard
   const date= req.body.date
   const cvv=  req.body.cvv
   const checkbox1= req.body.checkbox1
   const atoma= req.body.atoma
   const room= req.body.roomNumber
   const checkInDate=req.body.checkInDate
   const checkInMonth=req.body.checkInMonth
   const checkInYear= req.body.checkInYear
   const checkOutDate=req.body.checkOutDate
   const checkOutMonth=req.body.checkOutMonth
   const checkOutYear= req.body.checkOutYear
   const kostos=req.body.kostos

    const reservation={
        atoma:atoma,
        room:room,
        checkInDate:checkInDate,
        checkInMonth:checkInMonth,
        checkInYear:checkInYear,
        checkOutDate:checkOutDate,
        checkOutMonth:checkOutMonth,
        checkOutYear:checkOutYear,
        kostos:kostos
    }

    let response=''


    const profileImg=''

    let eksoflisiMisouPosou=''

    if(checkIfTenDays(checkInDate,checkInMonth,checkInYear)){
        eksoflisiMisouPosou='1'
    }

    // bale tin kratisi
    // an iparxei epikalpi bgale tin kai enimerose
    if(false){
        response='Η κράτηση απέτυχε'
    }
    else{
        response='Η κράτηση πραγματοποιήθηκε'
    }

    //kane tin pliromi. An apotixi bgale tin kratisi kai enimerose

    if(true){
        response='Η κράτηση απέτυχε'
    }
    else{

    }


    res.render('templates/firstPayment', { css: [ 'paymentFormStyle.css'], js:['firstPaymentForm.js'], eksoflisiMisouPosou:eksoflisiMisouPosou,kostosKsenodoxiou:kostos,response:response,reservation:reservation, loginned:'1',profileImg:profileImg });

}

export {checkIfTenDays,findroom,makeFirstBookPayment,finaliseReservation}