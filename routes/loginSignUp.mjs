import express from 'express'

import * as loginSignUpController from '../Controller/loginSignUp.mjs';
 

const router = express.Router();

router.route('/login').get(loginSignUpController.showLoginPage)
router.route('/loginPost').post(loginSignUpController.authenticate)
router.route('/signup').get(loginSignUpController.showSignupPage)
router.route('/signUp').post(loginSignUpController.signUpNewClient)
router.route('/usernameExists/:userName').get(loginSignUpController.checkIfUserNameExists)

export default router

