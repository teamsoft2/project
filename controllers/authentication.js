import user from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//for register
export const registerform = (req,res) =>{
    res.render('authentication/register')
 };
export const register = async (req,res) =>{
    const {username,email,password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const encrypted = bcrypt.hashSync(password,salt);
    await user.create({username,email, password:encrypted});
    res.redirect('/login');
 };

 //for login 
 export const loginform = (req,res) =>{
    res.render('authentication/login')
 };
export const login = async (req,res) =>{
    const {email,password} = req.body;
    const loggeduser = await user.findOne({email});
    const iscorrect = bcrypt.compareSync(password,loggeduser.password)
    if (iscorrect==false){
      return res.send('incorrect');
    }
    const data={
        _id: loggeduser._id,
        email: loggeduser.email,
    };
   const jwttoken= jwt.sign(data, process.env.JWTsecret)
   console.log(jwttoken);
    res.cookie('token', jwttoken );
    res.send('logged');
 };

 //ahmed@gmail.com
 //123456