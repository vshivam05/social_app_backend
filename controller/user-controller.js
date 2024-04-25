import User from "../model/User.js";
import bcrypt from "bcryptjs";
 
export const getAllUser = async(req,res,next)=>{
    let users;

    try{
users = await User.find();
    }catch(e){

    }

    if(!users){
        return res.status(404).json({Message: "No Users Found"});
    }

    return res.status(200).json({users:users});
};



// .........to add user 
// export const signup = async (req,res,next)=>{
    
//     const {name, email, password} = req.body;
//     let existingUser;
//     try{
// existingUser = await User.find({email:email});
//     }
//     catch(e){
//  console.log(err);
//     }

//     if(existingUser)
//     {
//        return res.status(400).json({message: "User already exists"}) //400 means unauthorised acess
//     }

//     const hashedPassword = bcrypt.hashSync(password); //to hash the password
//     const user = new User({
//         name:name,
//         email:email,
//         password:hashedPassword
//     });

//     try{
//        await user.save();

//     }catch(e)
//     {
//         console.log(e);
//     }

//     return res.status(201).json({user})

// }


export const signup = async (req,res,next)=>{
    const {name, email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.find({email: email});
    } catch(err) {
        console.log(err);
    }

    if(existingUser.length > 0) {
       return res.status(400).json({message: "User already exists"}); // 400 means unauthorised access
    }

    const hashedPassword = bcrypt.hashSync(password); // to hash the password
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        blogs:[],
    });

    try {
       await user.save();
       return res.status(201).json({user});
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}

// .........login 

export const login = async(req, res, next)=>{
    const {email, password} = req.body;
let existingUser;

    try{

         existingUser =  await User.findOne({email:email});
    }catch(e)
    {
        console.log(e);
        // return res.status(500).json({message: "Internal server error"});
    }
    if(!existingUser){
        return res.status(404).json({message:"User doesn't Exits"});
    }

   const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password ); //it will return a boolean value after comparing with password

   if(!isPasswordCorrect){
    return res.status(400).json({message:"Incorrect password"});
}
return res.status(200).json({message:"Login successfully"});


}
