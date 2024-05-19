

function showFirstPage(req,res,next){
    res.render('templates/index', { css: [ 'start_page.css'], js:['index.js'] });
}

function showAksiotheata(req,res){

    res.render('templates/aksiotheata', { css: ['aksiotheata.css']  });
}

function displayRoom(req,res){
    const profileImg=''
    const room=req.params.room
    const rooms={

        yperpoliteli:{
            img:{  
                img1Url:'/resources/room_photos/yperpoliteli/yper2.jpg',
                img2Url:'/resources/room_photos/yperpoliteli/presidential_suit.jpg',
                img3Url:'/resources/room_photos/yperpoliteli/dex_b.jpg'},
            titlos:'Υπερπολυτελή Σουίτα',perigrafi:'Tοποθετημένη σε ένα ήσυχο και ελαφρά υπερυψωμένο μέρος με θέα την θάλλασα, η υπερπολυτελή σουίτα θα σας προσφέρει ό,τι χρειάζεστε για να έχετε αξέχαστες διακοπές',
            option:[{value:'4_imidipla', text:'4 Ημίδιπλα κρεβάτια'}],
            stoixiaText:'150 τ.μ.,  3 μπάνια  με τζακούζι, 4 υπνοδωμάτια, 4 ημίδιπλα κρεβάτια.',
            anesi:[ 
                {backgroundImageUrl:'/resources/icons/jacuzzi.png',text:'Ζακούζι' },
                {backgroundImageUrl:'/resources/icons/iaponikes_toualetes.png',text:'Ιαπωνικές Τουαλέτες' },
                {backgroundImageUrl:'/resources/icons/tv.png',text:"50' τηλεόραση" },
                {backgroundImageUrl:'/resources/icons/kentites_kourtines.png',text:'Κεντητά υφάσματα' }],
            siskeui:[
                {backgroundImageUrl:'/resources/icons/cafe.png',text:'Καφέ' },
                {backgroundImageUrl:'/resources/icons/ksiristiki.png',text:'Ξυριστική' },
                {backgroundImageUrl:'/resources/icons/tsai.png',text:' Τσάι' }],
            accessibilityText:'Η υπερπολυτελή σουίτα  δεν προσφέρεται για άτομα ΑμεΑ'
        },

        deluxe2:{
            img:{  
                img1Url:'/resources/room_photos/deluxe_2_room/deluxe_2_room.jpg',
                img2Url:'/resources/room_photos/deluxe_2_room/break-649351_1280.jpg',
                img3Url:'/resources/room_photos/deluxe_2_room/sim2.jpg'},
            titlos:'Deluxe Σουίτα 2 Υπνοδωματίων',perigrafi:'Ζήστε το απόγειο της πολυτέλειας στην μοντέρνα και αναζωογονητική σουίτα δύο υπνοδωματίων.',
            option:[{value:'1_diplo_2_mona', text:'1 Διπλό Κρεβάτι, 2 Μονά Κρεβάτια'},
                    {value:'4_mona', text:'4 Μονά Κρεβάτια'}],
            stoixiaText:'50 τ.μ.,  2 μπάνια, με όλες τις ανέσεις ',
            anesi:[ 
                {backgroundImageUrl:'/resources/icons/iaponikes_toualetes.png',text:'Ιαπωνικές Τουαλέτες' },
                {backgroundImageUrl:'/resources/icons/tv.png',text:"40' τηλεόραση" },
                {backgroundImageUrl:'/resources/icons/kentites_kourtines.png',text:"Κεντητά υφάσματα" }],
            siskeui:[
                {backgroundImageUrl:'/resources/icons/cafe.png',text:'Καφέ' },
                {backgroundImageUrl:'/resources/icons/ksiristiki.png',text:'Ξυριστική' },
                {backgroundImageUrl:'/resources/icons/tsai.png',text:' Τσάι' }],
            accessibilityText:'Η deluxe σουίτα  δύο υπνοδωματίων διατίθεται και τροποποιημένη για να φιλοξενήσει άτομα ΑΜΕΑ'
        },


        deluxe1:{
            img:{  
                img1Url:'/resources/room_photos/deluxe_1_room/del2.jpg',
                img2Url:'/resources/room_photos/deluxe_1_room/del1_2.jpg',
                img3Url:'/resources/room_photos/deluxe_1_room/deluxe_1_room.jpg'},
            titlos:'Deluxe Σουίτα 1 Υπνοδωματίου',perigrafi:'Περάστε αξέχαστες και άνετες διακοπες στη deluxe σουίτα μας. ',
            option:[{value:'1_diplo', text:'1 Διπλό Κρεβάτι'},
                    {value:'2_mona', text:'2 Μονά Κρεβάτια'}],
            stoixiaText:'40 τ.μ.,  1 μπάνιο, με όλες τις ανέσεις',
            anesi:[ 
                {backgroundImageUrl:'/resources/icons/iaponikes_toualetes.png',text:'Ιαπωνικές Τουαλέτες' },
                {backgroundImageUrl:'/resources/icons/tv.png',text:"40' τηλεόραση" },
                {backgroundImageUrl:'/resources/icons/kentites_kourtines.png',text:"Κεντητά υφάσματα" }],
            siskeui:[
                {backgroundImageUrl:'/resources/icons/cafe.png',text:'Καφέ' },
                {backgroundImageUrl:'/resources/icons/ksiristiki.png',text:'Ξυριστική' },
                {backgroundImageUrl:'/resources/icons/tsai.png',text:' Τσάι' }],
            accessibilityText:'Η deluxe σουίτα  ενός υπνοδωματίου δεν προσφέρεται για άτομα ΑμεΑ'
        },

        simple2:{
            img:{  
                img1Url:'/resources/room_photos/simple_2_room/apartment_2_room.jpg',
                img2Url:'/resources/room_photos/simple_2_room/balcony.jpg',
                img3Url:'/resources/room_photos/simple_2_room/bathroom.jpg'},
            titlos:'Διαμέρισμα 2 Υπνοδωματίων',perigrafi:'Το ιδανικό μέρος για να απολαύσετε τις διακοπές σας. ',
            option:[{value:'1_diplo_2_mona', text:'1 Διπλό Κρεβάτι, 2 Μονά Κρεβάτια'},
                    {value:'4_mona', text:'4 Μονά Κρεβάτια'}],
            stoixiaText:'35 τ.μ.,  1 μπάνιο, με όλες τις ανέσεις',
            anesi:[ 
                {backgroundImageUrl:'/resources/icons/tv.png',text:"30' τηλεόραση" },
                {backgroundImageUrl:'/resources/icons/kentites_kourtines.png',text:"Κεντητά υφάσματα" }],
            siskeui:[
                {backgroundImageUrl:'/resources/icons/cafe.png',text:'Καφέ' },
                {backgroundImageUrl:'/resources/icons/ksiristiki.png',text:'Ξυριστική' },
                {backgroundImageUrl:'/resources/icons/tsai.png',text:' Τσάι' }],
            accessibilityText:'Το διαμέρισμα δύο υπνοδωματίων διατίθεται και τροποποιημένο για να φιλοξενήσει άτομα ΑΜΕΑ',
        
        },

        simple1:{
            img:{  
                img1Url:'/resources/room_photos/simple_1_room/apartment_1_room.jpg',
                img2Url:'/resources/room_photos/simple_1_room/bathroom-2094733_1280.jpg',
                img3Url:'/resources/room_photos/simple_1_room/living-room-8539168_1280.jpg'},
            titlos:'Διαμέρισμα 1 Υπνοδωματίου',perigrafi:' Ένα μοντέρνο και άνετο διαμέρισμα για να απολαύσετε τις διακοπές σας. ',
            option:[{value:'2_mona', text:'2 Μονά Κρεβάτια'}],
            stoixiaText:'30 τ.μ.,  1 μπάνιο, με όλες τις ανέσεις',
            anesi:[ 
                {backgroundImageUrl:'/resources/icons/tv.png',text:"30' τηλεόραση" },
                {backgroundImageUrl:'/resources/icons/kentites_kourtines.png',text:"Κεντητά υφάσματα" }],
            siskeui:[
                {backgroundImageUrl:'/resources/icons/cafe.png',text:'Καφέ' },
                {backgroundImageUrl:'/resources/icons/ksiristiki.png',text:'Ξυριστική' },
                {backgroundImageUrl:'/resources/icons/tsai.png',text:' Τσάι' }],
            accessibilityText:'Το διαμέρισμα ενός υπνοδωματίου δεν προσφέρεται για άτομα ΑμεΑ',
        
        }

    }

    if(room==='yperpoliteli' || room==='deluxe1' || room==='simple1'){
        // Kanei override to css tou header gia na to diksi xoris Amea epilogi
        res.render('templates/domatio', { css: [ '/room.css','/header_withoutAmea.css'], js:['/roomPage.js','/header_calendar.js'],  room: rooms[room], notAmeaAvailable:'1', roomPage:'1'});

    }
    else{
        res.render('templates/domatio', { css: [ '/room.css'], js:['/roomPage.js','/header_calendar.js'],  room: rooms[room], roomPage:'1'});

    }


}


export {showFirstPage, showAksiotheata, displayRoom}