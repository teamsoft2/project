import  express  from "express";
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import subjectroter from './routes/subject.js'
dotenv.config();
//mongoose.connect('mongodb://localhost:27017/project');

const app = express();


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.use('/subjects' , subjectroter)

app.listen(process.env.Port, ()=> {
    console.log(
    `started the application on http://localhost:${process.env.Port}`
   ); 
})