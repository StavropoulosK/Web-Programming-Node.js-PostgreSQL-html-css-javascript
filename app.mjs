import express from 'express'
import { engine } from 'express-handlebars'
import session from "express-session";
import 'dotenv/config'


import path from "path";
import { fileURLToPath } from 'url';


import initialPagesRouter from './routes/initialPages.mjs'
import loginSignUpRouter from './routes/loginSignUp.mjs'
import reservationRouter from './routes/reservation.mjs'
import  finaliseReservationRouter from './routes/finaliseReservation.mjs';
import  userOptionsRouter from './routes/userOptions.mjs';
import * as generalMiddleware from './Controller/generalMiddleware.mjs';
import { errorHandler } from './Controller/errorHandler.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const router = express.Router();

const port = process.env.SERVERPORT || 8080
 


app.engine('hbs', engine({ extname: ".hbs" }))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use(session({
   name: 'cookieSid',
   secret: process.env.SESSION_SECRET || "PynOjAuHetAuWawtinAytVunar", // κλειδί για κρυπτογράφηση του cookie
   resave: false, // δεν χρειάζεται να αποθηκεύεται αν δεν αλλάξει
   saveUninitialized: false, // όχι αποθήκευση αν δεν έχει αρχικοποιηθεί
   cookie: {
     maxAge: 20 * 60 * 1000, //20 min χρόνος ζωής του cookie σε ms
     sameSite: true
   }
 }));



const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });


app.use('/',generalMiddleware.getLocals)
app.use('/',userOptionsRouter)
app.use('/',finaliseReservationRouter)
app.use('/',reservationRouter)
app.use('/',initialPagesRouter)
app.use('/',loginSignUpRouter)
app.use(errorHandler)


// litourgiko
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
       console.log('Http server closed.');
    });
 });
 
 //ctc c
 process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    console.log('Closing http server.');
    server.close(() => {
       console.log('Http server closed.');
    });
 });

 process.on('uncaughtException', (err) => {
   console.error('Uncaught Exception:', err);
 });
 
 // akironi tis kratisis pou exi liksi i prothesmia ta mesanixta

 generalMiddleware.resetAtMidnight()




