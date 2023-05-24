import subject from "../models/subject.js";
import department from "../models/department.js"
import jwt from 'jsonwebtoken'


export const index = async(req ,res)=> {
    const subjects = await subject.find({doctor: req.user._id},{name: 1}).lean();
    res.render('subjects/index' , {subjects});
};

export const create = async(req,res) =>{ 
    const departments = await department.find().lean(); 
    res.render('subjects/create' , {departments}) ;
}; 

export const store = async (req,res) => {
    const {name,code,department} = req.body;
    await subject.create({
        name,
        code,
        department,
        doctor: req.user._id,
    })

    res.redirect('/subjects');
};

export const show = async(req,res)=>{
    // get the id 
 const _id = req.params._id;
    // use it to get the subject info
 const single = await subject.findById(_id).populate('department').lean();
    //render show templates
 res.render('subjects/show' , {subject: single});  
};

export const edit = async(req,res) =>{ 
    const {_id} =req.params;
    const editsub = await subject.findById(_id).lean();
    const departments = await department.find().lean(); 
    res.render('subjects/edit' , {departments , subject: editsub}) ;
}; 

export const update = async (req,res) => {
    const {name,code,department} = req.body;
    const {_id} = req.params;
    await subject.findByIdAndUpdate(_id ,{ $set:{
        name: name,
        code: code,
        department: department


    }, } )

    res.redirect('/subjects');
};

export const deletone = async (req ,res) =>{
    const {_id} = req.params;
    await subject.findByIdAndDelete(_id);
    res.redirect('/subjects');

};