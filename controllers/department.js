import department from "../models/department.js";


export const index = async(req ,res)=> {
    const departments = await department.find({admin: req.user._id},{name: 1}).lean();
    res.render('department/index' ,{departments});
 
};

export const create = (req,res) =>{ 
    res.render('department/create');
};

export const store = async (req,res) => {
    const {name,code} = req.body;
    await department.create({
        name,
        code,
    })

    res.redirect('/departments');
};

export const show = async(req,res)=>{
    // get the id 
 const _id = req.params._id;
    // use it to get the subject info
 const single = await department.findById(_id).populate('department').lean();
    //render show templates
 res.render('daprtments/show' , {department: single});  
};

export const edit = async(req,res) =>{ 
    //const {_id} =req.params;
    const editdep = await department.findById(_id).lean();
    //const departments = await department.find().lean(); 
    res.render('departments/edit' , {department: editdep}) ;
}; 

export const update = async (req,res) => {
    const {name,code} = req.body;
    const {_id} = req.params;
    await department.findByIdAndUpdate(_id ,{ $set:{
        name: name,
        code: code,

    }, } )

    res.redirect('/departments');
};

export const deletone = async (req ,res) =>{
    const {_id} = req.params;
    await department.findByIdAndDelete(_id);
    res.redirect('/departments');

};