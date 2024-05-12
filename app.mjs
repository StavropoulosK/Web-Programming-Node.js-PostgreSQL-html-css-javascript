import express from 'express'
import { engine } from 'express-handlebars'


import path from "path";
import { fileURLToPath } from 'url';


import initialPagesRouter from './routes/initialPages.mjs'
import loginSignUpRouter from './routes/loginSignUp.mjs'
import reservationRouter from './routes/reservation.mjs'
import  finaliseReservationRouter from './routes/finaliseReservation.mjs';
import  userOptionsRouter from './routes/userOptions.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const router = express.Router();

const port = process.env.PORT || 3000


app.engine('hbs', engine({ extname: ".hbs" }))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));


const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });


app.use('/',userOptionsRouter)
app.use('/',finaliseReservationRouter)
app.use('/',reservationRouter)
app.use('/',initialPagesRouter)
app.use('/',loginSignUpRouter)



function f(){

}

// Oi kratisis poy den exoun plirothi kai menoun ligotero apo 10 meres akironontai
// blepe https://stackoverflow.com/questions/26306090/running-a-function-everyday-midnight
function resetAtMidnight() {
    const now = new Date();
    let night = now;
    night.setDate(new Date().getDate()+1); 
    night.setHours(0, 0, 0)
    const msToMidnight = night.getTime() - now.getTime();

    setTimeout(function() {
        f();              //      <-- This is the function being called at midnight.
        resetAtMidnight();    //      Then, reset again next midnight.
    }, msToMidnight);
}


