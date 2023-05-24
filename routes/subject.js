import { Router } from "express";
import {create, deletone, edit, index ,show,store, update} from "../controllers/subject.js";
const router = new Router();

router.get('/', index);
router.get('/create', create);
router.post('/',store);
router.get('/:_id',show)
router.get('/:_id/edit' , edit)
router.put('/:_id',update)
router.delete('/:_id',deletone)


export default router;