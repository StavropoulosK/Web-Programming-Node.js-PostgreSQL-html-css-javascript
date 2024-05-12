const datesNotAvailable=async (req,res)=>{
    const year=req.params.year
    const month=req.params.month
    const diamorfosi=req.params.diamorfosi
    const amea=req.params.amea
    const roomType=req.params.roomName


    // Epestrepse tis imerominies pou gia to sigkekrimeno tipo domatiou gia ton sigkekrimeno mina einai ola piasmena

    // console.log(year,month,diamorfosi,amea,roomType)
    
    res.json({ klismenes: [4,12,13,14] });

}

const checkIfRoomTypeIsAvailable= async (req,res)=>{
    const roomType=req.params.roomName
    const amea=req.params.amea
    const diamorfosi=req.params.diamorfosi
    const checkInDate=req.params.checkInDate
    const checkInMonth=req.params.checkInMonth
    const checkInYear=req.params.checkInYear
    const checkOutDate=req.params.checkOutDate
    const checkOutMonth=req.params.checkOutMonth
    const checkOutYear=req.params.checkOutYear

    // Epestrepse true i false gia to an to domatio einai diathesimo 

    res.json({result:true})
}

const returnTimesDomatiou=async (req,res) =>{
    const roomType=req.params.roomName
    const year=req.params.currentCalendarYear
    const month=req.params.currentCalendarMonth

    let randomNumbers = [];

    for (let i = 0; i < 31; i++) {
        randomNumbers.push(Math.floor(Math.random() * 100)); // Generate random numbers between 0 and 99
    }
    res.json({times:randomNumbers})
}

const confirmReservation= async(req,res)=>{
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

    const checkIn= checkInDate+'/'+checkInMonth+'/'+checkInYear
    const checkOut= checkOutDate+'/'+checkOutMonth+'/'+checkOutYear


    let theaStiThalasa=''

    if(roomType=='Διαμέρισμα 2 Υπνοδωματίων' || roomType=='Διαμέρισμα 1 Υπνοδωματίου'){
        // Elegxos an iparxi domatio me thea stin thalasa apo tis katigories pou den exoun default thea stin thalasa
        if(amea=='true'){
            theaStiThalasa='true'
        }
        else{
            // oxi false
            theaStiThalasa=''
        }

    }
    let diathesima=4

    let imerominiesTimes=[{imerominia:'21/04/23',timi:20,klasi:"d1"},{imerominia:'21/04/23',timi:30,klasi:"d2"},{imerominia:'21/04/23',timi:40,klasi:"d3"},{imerominia:'21/04/23',timi:50,klasi:"d4"},{imerominia:'21/04/23',timi:26,klasi:"d5"}]
    let kostos=200
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


    const room=rooms[mapper[tipos]]

    // Antikathisotume to _ me 9 gia na mpori na xrisimopoiithi sto url

    const reservation={
        roomName:roomType,
        amea:amea,
        atoma:atoma,
        diamorfosi:diamorfosi,
        checkInDate:checkInDate,
        checkInMonth:checkInMonth,
        checkInYear:checkInYear,
        checkOutDate:checkOutDate,
        checkOutMonth:checkOutMonth,
        checkOutYear:checkOutYear,
        kostos:kostos,
        theaStiThalasa:theaStiThalasa
    }


    try{

        res.render('templates/toMakeReservation', {css: [ '/availableRooms.css'], js:['/availableRooms.js'],  room:room,reservation:reservation,
                diathesima:diathesima,atoma:atoma,times:imerominiesTimes,checkIn:checkIn,checkOut:checkOut,kostos:kostos,loginned:'1',profileImg:''});

    }
    catch(error){
        console.log(error)
    }



}

export {datesNotAvailable, checkIfRoomTypeIsAvailable, returnTimesDomatiou,confirmReservation}