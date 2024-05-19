import {checkIfTenDays}  from './finaliseReservation.mjs';
import * as userOptionsModel from '../model/userOptions.mjs';
import {insertPayment} from '../model/finaliseReservation.mjs'
import multer from 'multer'
import path from 'path'

const storage = multer.memoryStorage();

const upload = multer({
     storage: storage ,
     fileFilter: function (req, file, handler) {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            req.failureImg='1' 

            handler(true,null)
        }
        handler(null, true)
    },
    limits:{
        fileSize: 1921 * 1281
    }}).single('profileImage');

function readImage(req,res,next){
    upload(req,res,function(err){
        next()
    })
}

function aposindesi(req,res){
    req.session.destroy()
    res.redirect('/')
}
async function makePaymentToBank(cardHolderName,creditCard,date,cvv,poso){
    //edo ginetai diasindesi me to dbms tis trapezas kai epalitheontai ta stoixeia tis kartas tou xristi kai pragmatopoiteitai i pliromi.
    return true
}

function kritikiTime(check_In){
    //o pelatis mporei na grapsi kritiki mia mera meta to checkIn

    const checkIn= new Date(check_In).setHours(0,0,0,0)
    const today= new Date().setHours(0,0,0,0);
    const timeDifference = today - checkIn
    const daysDifference = (timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference>=1
        
    
}

async function showKratisis(req,res){
    
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

    //class singleBeds_doubleBeds
    let mapper={
        'Υπερπολυτελή Σουίτα 0_4':'yperpoliteli',
        'Deluxe Σουίτα 2 Υπνοδωματίων 2_1':'deluxe2_a',       
        'Deluxe Σουίτα 2 Υπνοδωματίων 4_0':'deluxe2_b',       
        'Deluxe Σουίτα 2 Υπνοδωματίων ΑΜΕΑ 2_1':'deluxe2_Amea_1',
        'Deluxe Σουίτα 2 Υπνοδωματίων ΑΜΕΑ 4_0':'deluxe2_Amea_2',
        'Deluxe Σουίτα 1 Υπνοδωματίου 2_0':'deluxe1_1',
        'Deluxe Σουίτα 1 Υπνοδωματίου 0_1':'deluxe1_2',

        'Διαμέρισμα 2 Υπνοδωματίων 2_1':'simple2_1',       
        'Διαμέρισμα 2 Υπνοδωματίων 4_0':'simple2_3',       
        'Διαμέρισμα 2 Υπνοδωματίων ΑΜΕΑ 2_1':'simple2_Amea1',
        'Διαμέρισμα 2 Υπνοδωματίων ΑΜΕΑ 4_0':'simple2_Amea2',
        'Διαμέρισμα 1 Υπνοδωματίου 2_0':'simple1_1',
    }

    const userID=req.session.userID
    const kratisisAll= await userOptionsModel.getKratisis(userID)

    const result=[]

    console.log(kratisisAll)

    for(let i=0;i<kratisisAll.length;i++){
        const kratisi=kratisisAll[i]
        const roomName=kratisi.class
        const num_single_beds=kratisi.num_single_beds
        const num_double_beds=kratisi.num_double_beds
        let theaStiThalasa=kratisi.sea_view
        const amea=kratisi.accessibility_for_disabled
        const checkIn=kratisi.check_in
        const checkOut=kratisi.check_out
        const atoma=kratisi.num_people
        const kostos=Number(kratisi.total_cost)
        let proino=kratisi.breakfast
        const cancelled=kratisi.cancelled
        const roomNumber=kratisi.roomnumber
        const pliromena=Number(kratisi.sumpaymentamount)


        //https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
        let apomenoun=(kostos-pliromena)
        apomenoun= +apomenoun.toFixed(2)

        if(proino==false){
            proino=''
        }

        let tipos=roomName

        if(amea==true){
            tipos= tipos+' ΑΜΕΑ'
        }

        tipos=tipos+` ${num_single_beds}_${num_double_beds}`
        const room=rooms[mapper[tipos]]

        let katastasi=''
        if(cancelled==true){
            katastasi='Ακυρωμένη'
        }
        else{
            if(apomenoun==0){
                katastasi='Εξοφλημένη'
            }
            else{
                katastasi='Προς εξόφληση'
            }
        }

        // ta ala domatia exoun default thea sti thalasa
        if(roomName=='Διαμέρισμα 2 Υπνοδωματίων' || roomName=='Διαμέρισμα 1 Υπνοδωματίου'){

            if(amea==true){
                theaStiThalasa='1'
            }
            else{
                if(theaStiThalasa==true){
                    theaStiThalasa='1'
                }
                else{
                    theaStiThalasa=''
                }
            }
        }
        else{
            theaStiThalasa=''
        }



        let oxiKritiki
        let oxipliromi
        let notAkirosimo

        if(apomenoun==0 ||cancelled==true){
            oxipliromi='1'
        }
        else{
            oxipliromi=''
        }

        let checkInDate=checkIn.split('-')[2]
        let checkInMonth=checkIn.split('-')[1]
        let checkInYear=checkIn.split('-')[0]

        if(checkIfTenDays(checkInDate,checkInMonth,checkInYear) && cancelled!=true){
            notAkirosimo=''
        }
        else{
            notAkirosimo='1'
        }

        if(katastasi=='Εξοφλημένη' && kritikiTime(checkIn)){
            oxiKritiki=''
        }
        else{
            oxiKritiki='1'
        }

        const kratisiToDisplay={
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
            oxiKritiki:oxiKritiki,
            notAkirosimo:notAkirosimo,
            oxipliromi:oxipliromi,
            roomNumber:roomNumber
        }

        result.push(kratisiToDisplay)
       
    }

    res.render('templates/kratisis', {css: [ 'kratisis.css'], kratisis:result})


}

async function writeKritiki(req,res){
    const kritiki=req.body.kritiki
    const checkIn=req.body.checkIn
    const checkOut=req.body.checkOut
    const roomNumber=Number(req.body.roomNumber)

    const kratisiId= await userOptionsModel.getKratisiId(roomNumber,checkIn,checkOut)

    // An den iparxi kritiki grapse tin. An iparxei idi antikatestise tin palia me tin nea kritiki

    const existingReviewId= await userOptionsModel.findReview(kratisiId)

    if(existingReviewId!=-1){
        await userOptionsModel.updateKritiki(kritiki,existingReviewId)

    }
    else{
        await userOptionsModel.insertKritiki(kritiki,kratisiId)

    }

    res.redirect('/kratisis')
}

async function akirosiKratisis(req,res){

    const checkIn=req.body.checkIn
    const checkOut=req.body.checkOut
    const roomNumber=Number(req.body.roomNumber)
    const kratisiId= await userOptionsModel.getKratisiId(roomNumber,checkIn,checkOut)

    
    let checkInDate=checkIn.split('-')[2]
    let checkInMonth=checkIn.split('-')[1]
    let checkInYear=checkIn.split('-')[0]

    if(checkIfTenDays(checkInDate,checkInMonth,checkInYear)){
        await userOptionsModel.akirosiKratisis(kratisiId)
    }

    res.redirect('/kratisis')
}

async function makeNextBookPayment(req,res){

    const checkIn=req.body.checkIn
    const checkOut=req.body.checkOut
    const roomNumber=Number(req.body.roomNumber)

    const kratisiId= await userOptionsModel.getKratisiId(roomNumber,checkIn,checkOut)

    const result= await userOptionsModel.getPosaPliromis(kratisiId)

    let sinolo=Number(result.total_cost)
    sinolo= +sinolo.toFixed(2) 

    const pliromena=Number(result.sumpaymentamount)

    let xrostoumeno=(sinolo-pliromena)
    xrostoumeno= +xrostoumeno.toFixed(2) 

    req.session.sinolo=sinolo
    req.session.pliromena=pliromena
    req.session.kratisiId=kratisiId

    res.render('templates/nextPaymentForm', {css: [ 'paymentFormStyle.css'],js:['secondPaymentForm.js'],sinolo:sinolo,xrostoumeno:xrostoumeno})

}

async function displayNextBookPayment(req,res){

    
    const cardHolderName=req.body.cardHolderName
    const creditCard=req.body.creditCard
    const date=req.body.date
    const cvv=Number(req.body.cvv)
    const poso=Number(req.body.poso)

    const sinolo=req.session.sinolo
    const pliromena=req.session.pliromena
    const kratisiId=req.session.kratisiId
    let xrostoumeno=sinolo-pliromena

    const toMakeNextPayment=req.session.toMakeNextPayment

    let response=''


    if(poso>xrostoumeno){
        response='Το ποσό που πληρώνεται υπερβαίνει το χρωστούμενο'
    }
    
    // aitima stin trapeza gia epibebaiosi tis sinalagis
    else if(await makePaymentToBank(cardHolderName,creditCard,cvv,poso)){
        await insertPayment(kratisiId,poso)
        response='Η πληρωμή πραγματοποιήθηκε'
        xrostoumeno=xrostoumeno-poso
        req.session.pliromena= pliromena+poso

    }
    else{
        response='Τα στοιχεία της τράπεζας είναι λανθασμένα'
    }
    
    

    res.render('templates/nextPaymentForm', {css: [ 'paymentFormStyle.css'],js:['secondPaymentForm.js'],sinolo:sinolo,xrostoumeno:xrostoumeno,response:response})

}

async function showProfile(req,res){
    const userID=req.session.userID
    let result= await userOptionsModel.getUserProfile(userID)
    const first_name=result.first_name
    const last_name=result.last_name
    const email=result.email
    const phonenumber=result.phonenumber

    res.render('templates/profile', {css: [ 'profile.css'],js:['profile.js'], name:first_name, surname:last_name, email:email, phone:phonenumber})

}

async function uploadProfileImage(req,res){

    const userID=req.session.userID
    if(!req.failureImg){
        try{
            const imageBuffer = req.file.buffer;
            await userOptionsModel.insertPhoto(imageBuffer,userID)

        }
        catch(err){
            //o xristis isigage poli megalo arxio
        }
    }

    res.redirect('/profile')
}

export {aposindesi, showKratisis,writeKritiki,akirosiKratisis,makeNextBookPayment,displayNextBookPayment,showProfile,uploadProfileImage,readImage}