// import {v2 as cloudinary} from "cloudinary";
// import fs from 'fs';

// cloudinary.config({ 
//     cloud_name:  process.env.CLOUDINARY_KEY_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// const uploadOnClodinary = async (localPath) =>{

//     if(!localPath) return null;

//    try {
//     const response =  await cloudinary.uploader.upload(localPath,{
//      resource_type: "auto"
//      });
 
//      console.log("file is uploaded on cloudinary", response.url)
//      return response
 
//    } catch (error) {   

//     fs.unlinkSync(localPath);
//     return null 

    
//    }

// };

// export{uploadOnClodinary}

import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_KEY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnClodinary = async (localPath) => {
  const normalizedPath = path.resolve(localPath).replace(/\\/g, "/"); // ✅ Cross-platform fix

  if (!fs.existsSync(normalizedPath)) {
    console.error("❌ File not found at path:", normalizedPath);
    return null;
  }

  try {
    const result = await cloudinary.uploader.upload(normalizedPath, {
      resource_type: "image", // or "auto"
    });

    console.log("✅ Cloudinary upload success:", result.secure_url);
    fs.unlinkSync(normalizedPath); // remove local file after upload
    return result;
  } catch (err) {
    console.error("❌ Cloudinary upload error:", err);
    return null;
  }
};

export { uploadOnClodinary };
