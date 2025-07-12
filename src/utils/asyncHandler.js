

//  const asyncHandler = (requestHandler) => {
//  (req, res, next) =>{

//  Promise.resolve(asyncHandler(req, res, next)).catch((error) => next(error));
    
// }
//   }


const asyncHandler  = (fn) => async( req, res, next ) =>{
  
    try { 

        fn( req, res, next )
        
    } catch (error) {
        res.status( error.code || 500 )
            .json({
                msg: error.message,
                success: false
            })
    }

}



 export{ asyncHandler }

