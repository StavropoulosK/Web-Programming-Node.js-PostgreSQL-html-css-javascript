import * as signUpModel from '../model/loginSignUp.mjs';
import bcrypt from 'bcrypt'



async function checkSignUpParams(req){
    const onoma=req.body.onoma
    const eponimo=req.body.eponimo
    const username=req.body.username
    const kodikos= req.body.kodikos
    const kodikosCheck=req.body.kodikosCheck
    const email= req.body.email
    const tilefono=req.body.tilefono
    
    if(onoma.length>40 || eponimo.length>40 || username.length>40 || kodikos.length>40 || email.length>40){
        return false
    }

    if(onoma==='' || eponimo==='' || username==="" || kodikos==='' || kodikosCheck==='' || email==='' || tilefono===''){

        return false
    }

    if(username.length<8){

        return false
    }

    // Elegxos an to username idi iparxi
    if(await signUpModel.checkIfUserNameExists(username)){

        return false
    }

    if(kodikos.length<8){

        return false
    }

    if(! /\d/.test(kodikos)){

        return false
    }

    if(kodikosCheck!==kodikos){

        return false
    }

    // email validation https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(! emailRegexp.test(email)){
        return false
    }

    if( ! /^\d{10}$/.test(tilefono)){

        return false
    }

    return true

}

function showLoginPage(req,res){
    res.render('templates/login', { css: ['login.css'] });

}

async function authenticate(req,res,next){
    const username=req.body.username
    const password=req.body.password
    const result=await signUpModel.getHashedPassword(username)

    if(result.length==0){
        res.render('templates/login', { css: ['login.css'], failed:'1' });

    }
    else{
        const hashedpass= result[0].password
        const user_id=result[0].user_id

        const check= await bcrypt.compare(password,hashedpass)
        if(check==true){
            req.session.userID=user_id

            res.redirect('/')
        }
        else{
            res.render('templates/login', { css: ['login.css'], failed:'1' });
        }

    }

}

function showSignupPage(req,res){
    res.render('templates/signUp', { css: ['signup.css'], js: ['signup.js']});

}

async function checkIfUserNameExists(req,res){
    const userName=req.params.userName
    const result = await signUpModel.checkIfUserNameExists(userName)

    // valid true simeni oti to username einai piasmeno
    res.json({ valid: result });
}

async function signUpNewClient(req,res){
    if(await checkSignUpParams(req)){

        const onoma=req.body.onoma
        const eponimo=req.body.eponimo
        const username=req.body.username
        const kodikos= req.body.kodikos
        const email= req.body.email
        const tilefono=req.body.tilefono

        const saltRounds = 10;

        try{
            const hashedPassword= await bcrypt.hash(kodikos, saltRounds)

            const user_id=await signUpModel.insertClient(onoma,eponimo,username,hashedPassword,email,tilefono)
            req.session.userID=user_id

            res.render('templates/signUp', { css: [ 'signup.css'], js:['signup.js'],loginned:1, message:'Η εγγραφή πραγματοποιήθηκε'});

        }
        catch(err){
            //eggrafike tautoxrona alos xristis me to idio onoma(patisan login kai oi elegxoi perasan prin kataxorithi stin basi enas apo tous xristes)
            res.render('templates/signUp', { css: [ 'signup.css'], js:['signup.js'], message:'Η εγγραφή απέτυχε.'});

        }        

    }
    else{

        res.render('templates/signUp', { css: [ 'signup.css'], js:['signup.js'], message:'Η εγγραφή απέτυχε.'});
    }

}




export {showLoginPage,authenticate,showSignupPage,checkIfUserNameExists,signUpNewClient}