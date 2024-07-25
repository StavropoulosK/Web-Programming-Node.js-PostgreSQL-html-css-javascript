import * as generalMiddlewareModel from '../model/generalMiddleware.mjs';


async function getLocals(req,res,next){
    try {
        const userID = req.session.userID

        if(userID){
            const profileImg=await generalMiddlewareModel.getProfileImage(userID)
            res.locals.profileImg=profileImg
            res.locals.loginned=1
        }

        next()

    } catch (error) {
      next(error)
    }
}

function authorise(req,res,next){
  console.log(req.session.userID)
  if (!req.session.userID) {
      res.redirect('/login');
    } else {
      next();
    }
}


// Trexei automata to bradi gia na akirosoi tis aplirotes kratisis pou exi liksi i prothesmia ton 10 imeron mexri to checkIn
async function cancelDueDates() {
      try {
          // Get the current date and set the time to midnight
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);

          
          // Add 9 days to the current date using setDate
          const futureDate = new Date(currentDate);
          futureDate.setDate(currentDate.getDate() + 9);
          
          // Format the date as a readable string (e.g., YYYY-MM-DD)
          const year = futureDate.getFullYear();
          const month = String(futureDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const day = String(futureDate.getDate()).padStart(2, '0');
          
          const dayOrio= `${year}-${month}-${day}`
          
          await generalMiddlewareModel.cancelDueReservations(dayOrio)

      } catch (error) {
        throw error
      }
  
}


// Oi kratisis poy den exoun plirothi kai menoun ligotero apo 10 meres akironontai. Kalite arxika apo to server kai meta epanalambanomena ta mesanixta.
// blepe https://stackoverflow.com/questions/26306090/running-a-function-everyday-midnight
//den einai middleware ala ti kali o server ta mesanixta. An o server einai se adrania apo to fly io ekeini tin ora profanos den litourgi(oute kai to paketo node-schedule
//leitourgei an o server einai se adrania). Opote the eprepe o diaxiristis na kanei  etima request se  route pou na trexei tin cancelDueDates
function resetAtMidnight() {

  const now = new Date();
  const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0, 0, 0 // ...at 00:00:00 hours
    );

  const msToMidnight = night.getTime() - now.getTime();
    
  setTimeout( async function() 
  {
    try {
      console.log('cancelled due dates with resetAtMidnight')
      await cancelDueDates();              
      resetAtMidnight();     //reset again next midnight.
    } catch (error) {
       console.error('resetAtMidnightError')
    }

  } , msToMidnight);}


export {getLocals,authorise,resetAtMidnight}