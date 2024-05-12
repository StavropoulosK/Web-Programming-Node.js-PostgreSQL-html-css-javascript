import {checkIfTenDays}  from './finaliseReservation.mjs';

const aposindesi=(req,res)=>{
    console.log('aposindesi')
    res.redirect('/')
}

const showKratisis=(req,res)=>{
    
    const rooms={

        yperpoliteli:{
            className:"yperpoliteli",
            img:'/resources/room_photos/yperpoliteli/dex_b.jpg',
            titlos:'Υπερπολυτελή Σουίτα',
            amenity:['Ζακούζι','Ιαπωνικές Τουαλέτες','Θέα στη Θάλασσα'],
            tetragonika:150,
            krebati:[{onoma:'4 Ημίδιπλα Κρεβάτια',ikonaSrc:'/resources/icons/double_bed.png'}],
        },
        deluxe2_a:{
            className:"deluxe2_a",
            img:'/resources/room_photos/deluxe_2_room/break-649351_1280.jpg',
            titlos:'Deluxe 2 Υπνοδωματια',
            amenity:['Ιαπωνικές Τουαλέτες','Μοντέρνος σχεδιασμός','Θέα στη Θάλασσα'],
            tetragonika:50,
            krebati:[{onoma:'1 Διπλό Κρεβάτι',ikonaSrc:'/resources/icons/double_bed.png'},
                     {onoma:'2 Μονά Κρεβάτια',ikonaSrc:'/resources/icons/single_bed.png'}]
        },
        deluxe2_b:{
            className:"deluxe2_b",
            img:'/resources/room_photos/deluxe_2_room/break-649351_1280.jpg',
            titlos:'Deluxe 2 Υπνοδωματια',
            amenity:['Ιαπωνικές Τουαλέτες','Μοντέρνος σχεδιασμός','Θέα στη Θάλασσα'],
            tetragonika:50,
            krebati:[{onoma:' 4 Μονά Κρεβάτια',ikonaSrc:'/resources/icons/single_bed.png'}]
        },
        deluxe2_Amea_1:{
            className:"deluxe2_Amea_1",
            img:'/resources/room_photos/deluxe_2_room/break-649351_1280.jpg',
            titlos:'Deluxe 2 Υπνοδωματια ΑΜΕΑ',
            amenity:['Ιαπωνικές Τουαλέτες','Μοντέρνος σχεδιασμός','Θέα στη Θάλασσα'],
            tetragonika:50,
            krebati:[{onoma:'1 Διπλό Κρεβάτι',ikonaSrc:'/resources/icons/double_bed.png'},
                     {onoma:'2 Μονά Κρεβάτια',ikonaSrc:'/resources/icons/single_bed.png'}]
        },
        deluxe2_Amea_2:{
            className:"deluxe2_Amea_2",
            img:'/resources/room_photos/deluxe_2_room/break-649351_1280.jpg',
            titlos:'Deluxe 2 Υπνοδωματια ΑΜΕΑ',
            amenity:['Ιαπωνικές Τουαλέτες','Μοντέρνος σχεδιασμός','Θέα στη Θάλασσα'],
            tetragonika:50,
            krebati:[{onoma:'4 Μονά Κρεβάτια',ikonaSrc:'/resources/icons/single_bed.png'}]
        },
        deluxe1_1:{
            className:"deluxe1_1",
            img:'/resources/room_photos/deluxe_1_room/del1_2.jpg',
            titlos:'Deluxe 1 Υπνοδωματιο',
            amenity:['Ιαπωνικές Τουαλέτες','Μοντέρνος σχεδιασμός','Θέα στη Θάλασσα'],
            tetragonika:40,
            krebati:[{onoma:'2 Μονά Κρεβάτια',ikonaSrc:'/resources/icons/single_bed.png'}]
        },
        deluxe1_2:{
            className:"deluxe1_1",
            img:'/resources/room_photos/deluxe_1_room/del1_2.jpg',
            titlos:'Deluxe 1 Υπνοδωματιο',
            amenity:['Ιαπωνικές Τουαλέτες','Μοντέρνος σχεδιασμός','Θέα στη Θάλασσα'],
            tetragonika:40,
            krebati:[{onoma:'1 Διπλό Κρεβάτι',ikonaSrc:'/resources/icons/double_bed.png'}]
        },
        simple2_1:{
            className:"simple2_1",
            img:'/resources/room_photos/simple_2_room/apartment_2_room.jpg',
            titlos:'Διαμέρισμα 2 Υπνοδωματίων',
            amenity:['Νησιώτικη αρχιτεκτονική','Κλιματιστικό'],
            tetragonika:35,
            krebati:[{onoma:'1 Διπλό Κρεβάτι',ikonaSrc:'/resources/icons/double_bed.png'},
                     {onoma:'2 Μονά Κρεβάτια',ikonaSrc:'/resources/icons/single_bed.png'}]
        },
        simple2_3:{
            className:"simple2_3",
            img:'/resources/room_photos/simple_2_room/balcony.jpg',
            titlos:'Διαμέρισμα 2 Υπνοδωματίων',
            amenity:['Νησιώτικη αρχιτεκτονική','Κλιματιστικό'],
            tetragonika:35,
            krebati:[{onoma:' 4 Μονά Κρεβάτια',ikonaSrc:'/resources/icons/single_bed.png'}]
        },
        simple2_Amea1:{
            className:"simple2_Amea1",
            img:'/resources/room_photos/simple_2_room/balcony.jpg',
            titlos:'Διαμέρισμα 2 Υπνοδωματίων ΑΜΕΑ',
            amenity:['Νησιώτικη αρχιτεκτονική','Κλιματιστικό'],
            tetragonika:35,
            krebati:[{onoma:'1 Διπλό Κρεβάτι',ikonaSrc:'/resources/icons/double_bed.png'},
                     {onoma:'2 Μονά Κρεβάτια',ikonaSrc:'/resources/icons/single_bed.png'}]
        },
        simple2_Amea2:{
            className:"simple2_Amea2",
            img:'/resources/room_photos/simple_2_room/balcony.jpg',
            titlos:'Διαμέρισμα 2 Υπνοδωματίων ΑΜΕΑ',
            amenity:['Νησιώτικη αρχιτεκτονική','Κλιματιστικό'],
            tetragonika:35,
            krebati:[{onoma:'4 Μονά Κρεβάτια',ikonaSrc:'/resources/icons/single_bed.png'}]
        },
        simple1_1:{
            className:"simple1_1",
            img:'/resources/room_photos/simple_1_room/living-room-8539168_1280.jpg',
            titlos:'Διαμέρισμα 1 Υπνοδωματίου',
            amenity:['Νησιώτικη αρχιτεκτονική','Κλιματιστικό'],
            tetragonika:30,
            krebati:[{onoma:'2 Μονά Κρεβάτια',ikonaSrc:'/resources/icons/single_bed.png'}]
        }
    }



    const room=rooms.deluxe2_a

    const theaStiThalasa=''
    const checkIn='03/05/2024'
    const checkOut='04/05/2024'
    const proino='1'
    const kostos=200.5
    const pliromena=99
    const apomenoun=kostos-pliromena
    const katastasi='Προς εξόφληση'
    const atoma=3
    const id=12012

    // console.log(checkIfTenDays('03','07','2024'))

    const kratisi1={
        room:room,
        theaStiThalasa:theaStiThalasa,
        checkIn:checkIn,
        checkOut:checkOut,
        proino:proino,
        kostos:kostos,
        pliromena:pliromena,
        apomenoun:apomenoun,
        katastasi:katastasi,
        atoma:atoma,
        oxiKritiki:'1',
        notAkirosimo:"",
        oxipliromi:'',
        id:id
    }

    const kratisi2={
        room:room,
        theaStiThalasa:theaStiThalasa,
        checkIn:checkIn,
        checkOut:checkOut,
        proino:proino,
        kostos:kostos,
        pliromena:pliromena,
        apomenoun:apomenoun,
        katastasi:katastasi,
        atoma:atoma,
        notAkirosimo:"1",
        oxipliromi:'1',
        oxiKritiki:'',
        id:id

    }

    const kratisis=[kratisi1,kratisi2]

    // const a=[{a:[{a1:1,a2:2},{a1:3,a2:4}]},{a:[{a1:5,a2:6}]}]
    // const b={a:[{a1:1,a2:2},{a1:3,a2:4}]}

    // res.render('templates/kratisis', {css: [ '/kratisis.css'],  room:room,theaStiThalasa:theaStiThalasa,checkIn:checkIn,checkOut:checkOut,proino:proino,kostos:kostos,pliromena:pliromena,apomenoun:apomenoun,katastasi:katastasi,atoma:atoma})
    res.render('templates/kratisis', {css: [ 'kratisis.css'], kratisis:kratisis})
    // res.render('templates/t', {css: [ '/kratisis.css'], a:b,layout:false})


}

const writeKritiki=(req,res)=>{
    const kritiki=req.body.kritiki
    const id=req.body.kratisiId
    console.log(kritiki,id)
    res.redirect('/kratisis')
}

const akirosiKratisis=(req,res)=>{
    const kratisi=req.body.kratisiId
    console.log(kratisi)

    // ean mpori na akirothi akirose tin

    res.redirect('/kratisis')
}

const makeNextBookPayment=(req,res)=>{
    const kratisiId=req.body.kratisiId
    const sinolo=req.body.sinolo
    const xrostoumeno=req.body.xrostoumeno

    res.render('templates/nextPaymentForm', {css: [ 'paymentFormStyle.css'],js:['secondPaymentForm.js'], kratisiId:kratisiId,sinolo:sinolo,xrostoumeno:xrostoumeno})

}

const displayNextBookPayment=(req,res)=>{

    const cardHolderName=req.body.cardHolderName
    const creditCard=req.body.creditCard
    const date=req.body.date
    const cvv=req.body.cvv
    const kratisiId=req.body.kratisiId
    const poso=req.body.poso

    const sinolo=req.body.sinolo
    const xrostoumeno=req.body.xrostoumeno-poso

    let response=''
    
    // aitima stin trapeza gia epibebaiosi tis sinalagis
    if(true){
        response='Η πληρωμή πραγματοποιήθηκε'
    }
    else{
        response='Η πληρωμή απέτυχε'
    }
    console.log(kratisiId,sinolo,xrostoumeno)
    res.render('templates/nextPaymentForm', {css: [ 'paymentFormStyle.css'],js:['secondPaymentForm.js'], kratisiId:kratisiId,sinolo:sinolo,xrostoumeno:xrostoumeno,response:response})

}

export {aposindesi, showKratisis,writeKritiki,akirosiKratisis,makeNextBookPayment,displayNextBookPayment}