import { Router } from "express";
import subject from "../models/subject.js";
const router = new Router();

router.get('/', (req ,res)=> {
 
    res.render('subjects/all')
    
});


export default router;