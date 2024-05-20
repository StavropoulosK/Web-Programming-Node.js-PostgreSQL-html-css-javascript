function errorHandler(err, req, res, next) {
    console.log('error Handler')
    if (res.headersSent) {
       // Αν έχει σταλεί απάντηση, τότε δεν μπορούμε να στείλουμε και άλλη οπότε παραπέμπουμε στον default error handler
       return next(err); // ο default error handler
    } else {
        res.status(500).send('<p>Σφάλμα: ' + err.message +'<br>'+err.stack+'</br>'+ '</p><a href="/">Επιστροφή</a>')
    }
 
 }

 export{errorHandler}


