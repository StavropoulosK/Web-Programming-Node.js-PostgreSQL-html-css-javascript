async function checkSignUpParams(req){
    const onoma=req.body.onoma
    const eponimo=req.body.eponimo
    const username=req.body.username
    const kodikos= req.body.kodikos
    const kodikosCheck=req.body.kodikosCheck
    const email= req.body.email
    const tilefono=req.body.tilefono

    if(onoma==='' || eponimo==='' || username==="" || kodikos==='' || kodikosCheck==='' || email==='' || tilefono===''){
        return false
    }

    if(username.length<8){
        return false
    }

    // Elegxos an to username idi iparxi
    if(false){
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


const showLoginPage= (req,res) =>{

    res.render('templates/login', { css: ['login.css'] });

}

const authenticate= (req,res)=>{
    if(true){
        res.render('templates/login', { css: ['login.css'], failed:'1' });

    }
    else{
        res.redirect('/')

    }
}

const showSignupPage=(req,res) =>{
    res.render('templates/signUp', { css: ['signup.css'], js: ['signup.js']});

}

const checkIfUserNameExists=async (req,res) =>{
    const userName=req.params.userName
    res.json({ valid: false });
}

const signUpNewClient=async (req,res) =>{
    if(await checkSignUpParams(req)){
        
        res.render('templates/signUp', { css: [ 'signup.css'], js:['signup.js'],   loginned:'1', message:'Η εγγραφή πραγματοποιήθηκε'});

    }
    else{

        res.render('templates/signUp', { css: [ 'signup.css'], js:['signup.js'], message:'Η εγγραφή απέτυχε.'});
    }

}




export {showLoginPage,authenticate,showSignupPage,checkIfUserNameExists,signUpNewClient}