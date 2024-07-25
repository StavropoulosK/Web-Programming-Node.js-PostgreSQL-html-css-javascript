

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
            titlos:'Presidential Suite',perigrafi:'Located in a quiet and slightly elevated place overlooking the sea, the Presidential Suite will offer you everything you need to have an unforgettable vacation',
            option:[{value:'4_imidipla', text:'4 semi double beds'}],
            stoixiaText:'150 sq.m.,  3 bathrooms with jacuzzi, 4 bedrooms, 4 semi double beds.',
            anesi:[ 
                {backgroundImageUrl:'/resources/icons/jacuzzi.png',text:'Jacuzzi' },
                {backgroundImageUrl:'/resources/icons/iaponikes_toualetes.png',text:'Japanese Toilets' },
                {backgroundImageUrl:'/resources/icons/tv.png',text:"50' TV" },
                {backgroundImageUrl:'/resources/icons/kentites_kourtines.png',text:'Embroidered fabrics' }],
            siskeui:[
                {backgroundImageUrl:'/resources/icons/cafe.png',text:'Coffee machine' },
                {backgroundImageUrl:'/resources/icons/ksiristiki.png',text:'Shaving machine' },
                {backgroundImageUrl:'/resources/icons/tsai.png',text:' Tea maker' }],
            accessibilityText:'The Presidential Suite is not available for people with disabilities'
        },

        deluxe2:{
            img:{  
                img1Url:'/resources/room_photos/deluxe_2_room/deluxe_2_room.jpg',
                img2Url:'/resources/room_photos/deluxe_2_room/break-649351_1280.jpg',
                img3Url:'/resources/room_photos/deluxe_2_room/sim2.jpg'},
            titlos:'Deluxe 2 Bedroom Suite',perigrafi:'Experience the height of luxury in the modern and refreshing two bedroom deluxe suite.',
            option:[{value:'1_diplo_2_mona', text:'1 Double Bed, 2 Single Beds'},
                    {value:'4_mona', text:'4 Single Beds'}],
            stoixiaText:'50 sq.m.,  2 bathrooms, with all amenities ',
            anesi:[ 
                {backgroundImageUrl:'/resources/icons/iaponikes_toualetes.png',text:'Japanese Toiletes' },
                {backgroundImageUrl:'/resources/icons/tv.png',text:"40' TV" },
                {backgroundImageUrl:'/resources/icons/kentites_kourtines.png',text:"Embroidered fabrics" }],
            siskeui:[
                {backgroundImageUrl:'/resources/icons/cafe.png',text:'Coffee machine' },
                {backgroundImageUrl:'/resources/icons/ksiristiki.png',text:'Shaving machine' },
                {backgroundImageUrl:'/resources/icons/tsai.png',text:' Tea maker' }],
            accessibilityText:'The deluxe two-bedroom suite is also available modified to accommodate people with disabilities'
        },


        deluxe1:{
            img:{  
                img1Url:'/resources/room_photos/deluxe_1_room/del2.jpg',
                img2Url:'/resources/room_photos/deluxe_1_room/del1_2.jpg',
                img3Url:'/resources/room_photos/deluxe_1_room/deluxe_1_room.jpg'},
            titlos:'Deluxe 1 Bedroom Suite',perigrafi:'Have unforgettable and comfortable holidays in our deluxe suite.',
            option:[{value:'1_diplo', text:'1 Double Bed'},
                    {value:'2_mona', text:'2 Single Beds'}],
            stoixiaText:'40 sq.m., 1 bathroom, with all amenities',
            anesi:[ 
                {backgroundImageUrl:'/resources/icons/iaponikes_toualetes.png',text:'Japanese Toiletes' },
                {backgroundImageUrl:'/resources/icons/tv.png',text:"40' TV" },
                {backgroundImageUrl:'/resources/icons/kentites_kourtines.png',text:"Embroidered fabrics" }],
            siskeui:[
                {backgroundImageUrl:'/resources/icons/cafe.png',text:'Coffee machine' },
                {backgroundImageUrl:'/resources/icons/ksiristiki.png',text:'Shaving machine' },
                {backgroundImageUrl:'/resources/icons/tsai.png',text:' Tea maker' }],
            accessibilityText:'The Deluxe 1 Bedroom Suite is not available for people with disabilities'
        },

        simple2:{
            img:{  
                img1Url:'/resources/room_photos/simple_2_room/apartment_2_room.jpg',
                img2Url:'/resources/room_photos/simple_2_room/balcony.jpg',
                img3Url:'/resources/room_photos/simple_2_room/bathroom.jpg'},
            titlos:'2 Bedroom Apartment',perigrafi:'The ideal place to enjoy your holidays. ',
            option:[{value:'1_diplo_2_mona', text:'1 Double Bed, 2 Single Beds'},
                    {value:'4_mona', text:'4 Single Beds'}],
            stoixiaText:'35 sq.m., 1 bathroom, with all amenities',
            anesi:[ 
                {backgroundImageUrl:'/resources/icons/tv.png',text:"30' TV" },
                {backgroundImageUrl:'/resources/icons/kentites_kourtines.png',text:"Embroidered fabrics" }],
            siskeui:[
                {backgroundImageUrl:'/resources/icons/cafe.png',text:'Coffee machine' },
                {backgroundImageUrl:'/resources/icons/ksiristiki.png',text:'Shaving machine' },
                {backgroundImageUrl:'/resources/icons/tsai.png',text:' Tea maker' }],
            accessibilityText:'The 2 Bedroom Apartment is also available modified to accommodate people with disabilities',
        
        },

        simple1:{
            img:{  
                img1Url:'/resources/room_photos/simple_1_room/apartment_1_room.jpg',
                img2Url:'/resources/room_photos/simple_1_room/bathroom-2094733_1280.jpg',
                img3Url:'/resources/room_photos/simple_1_room/living-room-8539168_1280.jpg'},
            titlos:'1 Bedroom Apartment',perigrafi:' A modern and comfortable apartment to enjoy your vacation. ',
            option:[{value:'2_mona', text:'2 Single Beds'}],
            stoixiaText:'30 sq.m., 1 bathroom, with all amenities',
            anesi:[ 
                {backgroundImageUrl:'/resources/icons/tv.png',text:"30' TV" },
                {backgroundImageUrl:'/resources/icons/kentites_kourtines.png',text:"Embroidered fabrics" }],
            siskeui:[
                {backgroundImageUrl:'/resources/icons/cafe.png',text:'Coffee machine' },
                {backgroundImageUrl:'/resources/icons/ksiristiki.png',text:'Shaving machine' },
                {backgroundImageUrl:'/resources/icons/tsai.png',text:' Tea maker' }],
            accessibilityText:'The 1 Bedroom Apartment is not available for people with disabilities',
        
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