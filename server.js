import  express  from "express";
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import subjectroter from './routes/subject.js'
import departmentroter from "./routes/department.js";
import methodOverride from 'method-override';
import authRoutes from './routes/authentication.js'
import cookieParser from 'cookie-parser'
import {authentication} from './middleware/authentication.js'

dotenv.config();
mongoose.connect('mongodb://localhost:27017/project');

const app = express();
app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method'));
app.use(cookieParser());

 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.use('/', authRoutes)
app.use('/subjects' , authentication ,subjectroter)
app.use('/departments',authentication ,departmentroter)

app.listen(process.env.Port, ()=> {
    console.log(
    `started the application on http://localhost:${process.env.Port}`
   ); 
})