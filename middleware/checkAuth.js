
// const jwt =require("jsonwebtoken")
// const checkAuth=(req,res,next)=>{
//     try{

//         const token= req.headers.Authorization.split(" ")[1]
//         jwt.decode(token,"boomeraswathsifbjfb",(err,decoded)=>{
//             if(err){
//                 res.status(400).json({error:{
//                     message:"invalid token"
//                 }})

//             }
//             req.locals.id=decoded.id
//             next();
//         })
        
//     }catch(err){
//         res.status(400).json({error:{
//             message:"token unavailable"
//         }})
//     }

   
// }
// module.exports=checkAuth