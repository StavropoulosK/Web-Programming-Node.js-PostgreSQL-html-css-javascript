import * as generalMiddlewareModel from '../model/generalMiddleware.mjs';


async function getLocals(req,res,next){
    const userID = req.session.userID

    if(userID){
        const profileImg=await generalMiddlewareModel.getProfileImage(userID)
        res.locals.profileImg=profileImg
        res.locals.loginned=1
    }

    next()
}

function authorise(req,res,next){
  if (!req.session.userID) {
      res.redirect('/login');
    } else {
      next();
    }
}


// Trexei automata to bradi gia na akirosoi tis aplirotes kratisis pou exi liksi i prothesmia ton 10 imeron mexri to checkIn
async function cancelDueDates() {
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
}


// Oi kratisis poy den exoun plirothi kai menoun ligotero apo 10 meres akironontai. Kalite arxika apo to server kai meta epanalambanomena ta mesanixta.
// blepe https://stackoverflow.com/questions/26306090/running-a-function-everyday-midnight
function resetAtMidnight() {


  const now = new Date();
  const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0, 0, 0 // ...at 00:00:00 hours
    );

  const msToMidnight = night.getTime() - now.getTime();
    
  setTimeout( async function() {
    await cancelDueDates();              //      <-- This is the function being called at midnight.
    resetAtMidnight();                  //       Then, reset again next midnight.
  }, msToMidnight);
}


export {getLocals,authorise,resetAtMidnight}