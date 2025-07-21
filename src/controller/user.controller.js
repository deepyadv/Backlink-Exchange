 import { User } from "../models/user.models.js";
 import jwt from "jsonwebtoken"
 import { website } from "../models/website.models.js";
 import { Message } from "../models/message.model.js";
 import { order, } from "../models/order.models.js";
 import {ApiResponse} from "../utils/apiResponse.js"
 import {uploadOnClodinary} from "../utils/cloudinary.js";
 import { razorpay } from "../Config/razorpay.js";
 import crypto from "crypto"

  
 const generateAccessAndRefreshToken = async( userId ) => {

    try {
        const user = await User.findById(userId);
    
                     const accessToken =  await user.generateAccessToken();
                     const refreshToken =   await user.generateRefreshToken();

                     user.refreshToken = refreshToken;

                     await user.save( {validateBeforeSave: false})

                     return{accessToken, refreshToken}


    } catch (error) {
        
        throw new Error("something went wrong while generating access and refreh token")
    }

 }
 
 
 
 const userRegister  = async (req, res ) =>{

    try {

        // get details from frontent 

        const { name, email, password, username, role  } = req.body ;

        // check if user left empty string 

        if( name === ""){
            throw new Error ("name is required")
        };

        if( email === "" ){
          throw new Error("email is required")
        }

        if(password === ""){
            throw new Error("password must be required")
        } ;

        if(username === ""){
          throw new Error("username must be required")
      } ;

        if(role === ""){
          throw new Error("please select one role")
      } ;

        // check if email or username is already exists 

        const existUser  = await User.findOne({ email });

        if (existUser){

            throw new Error (" email is already exist")
        };

        //enter in DB

        const user = await User.create({
            name,
            email,
            password,
            username,
            role
        });

       return res.status(200).json(
        new ApiResponse(200, user, "user registration successfully")
       )

    

        //  res.status(200).json({messege: "user registration successfully"})
              

    } catch (error) {
      res.status(400).json({ error: error.message });    }
 
 };


   const loginUser = async(req, res) =>{


    try {
        const { username, password }=  req.body
    
    
            if( !username ){
                throw new Error( "username required" )
            }
    
            // username or email check in database
    
              const user  = await User.findOne({username});

              console.log(user)
    
              if(!user){
                throw new Error ( "username or email is not registered" )
              };
    
              // password checking
    
              const checkPassword = await user.isPasswordCorrect( password )
    
              console.log(checkPassword)
    
                if(!checkPassword){
                throw new Error("password does not match")
              } 
    
    
               const { accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

               console.log(accessToken, refreshToken)
    
    
                const loggedIn = await User.findById(user._id).select("-password -refreshToken");
    
                const options  = {
    
                    httpOnly: true,
                    secure: true,
                    sameSite: "None"
                }
    
                return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json({ "user": loggedIn, accessToken, refreshToken,
                    msg: "user login successfully"
                 })
    
    
    
    
    } catch (error) {
        res.status(400).json({msg: error.message})
    }




   };

   const logoutUser = async ( req, res ) =>{

            await User.findByIdAndUpdate( req.user._id, 

            {

            $set: {

                refreshToken: undefined
            } 
                  })

                  const options  = {
    
                    httpOnly: true,
                    secure: true
                }
                
                res.status(200)
                .clearCookie("accessToken", options)
                .clearCookie("refreshToken", options)
                .json({msg: "user successfully logout"})

   };

   const refreshAccessToken = async ( req, res ) =>{

         try {
            const incomingRefreshToken =  req.cookies.refreshToken || req.body.refreshToken
   
            if(!incomingRefreshToken){
   
               throw new Error("unauthorized request")
            }
   
               const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
   
                  if(!decodedToken){
                   throw new Error("invaild refresh token")
                  }
   
                  const user = await User.findById(decodedToken._id)
   
                  if(!user){
   
                   throw new Error("user id not found")
   
                  }
   
                  if(incomingRefreshToken !== user?.refreshToken){
                   return res.status(400).json({msg : "token did not match"})
                  }
   
                const { accessToken, refreshToken} =  await generateAccessAndRefreshToken(user._id)
   
                   const options = {
                       httpOnly: true,
                       secure: true
                   }
   
                   return res
                   .status(200)
                   .cookie("accessToken", accessToken, options)
                   .cookie("refreshToken", refreshToken, options )
                   .json({msg: "access and refresh token genrete successfully", accessToken, refreshToken})
                         
   
   
   
         } catch (error) {
            throw new Error (error.message || "something went wrong while generating access and refreh token ")
         }

   };

   const getCurrentUser = async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }
  
    return res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      user: req.user
    });
  };
  

   const websiteInformation = async (req, res) => {
    try {
      const {
        username,
        url,
        domainAuthority,
        categories,
        traffic,
        language,
        price,
      } = req.body;

      console.log(req.body)
  
      
      if (
        !username ||
        !url ||
        !domainAuthority ||
        !categories ||
        !traffic ||
        !language ||
        !price
      ) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      
      const user = await User.findOne({ username });
      if (!user) {
         return res.status(401).json({ error: "User not authorized." });
      };


      const image = req.file?.path

      console.log("local image path", image)

      console.log("image details", image)

      if(!image) {
        return res.status(400).json({ error: "Image not uploaded." });
      }

      const uploadedAvatar = await uploadOnClodinary(image)

      console.log(uploadedAvatar)

      if(!uploadedAvatar){

        throw new Error (" image upload failed")
      }
  
       
      const websiteUser = await website.create({
        url,
        domainAuthority,
        categories: Array.isArray(categories)? categories : [categories],
        traffic,
        language,
        image: uploadedAvatar.url,
        price,
        user: user._id,
      });


  
      return res
        .status(200)
        .json({ msg: "User's website details successfully registered", websiteUser });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  const getAllWebsites = async ( req, res) => {

           try {
            const websites = await website.find()
            .sort({ createdAt: -1})
            .populate("user", "username")
            res.status(200).json(websites)
           } catch (error) {
            res.status(500).json({
              error : "Failed to fetch websites"
            })
           }

  }

   const changeCurrentPassword = async ( req, res ) => {

           const { oldPassword, newPassword }= req.body


           const user  = await User.findById(req.user?._id)

           const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

           if(!isPasswordCorrect){

            throw new Error("invalid password")
           }

           user.password = newPassword

           user.save({ validateBeforeSave: false})

           return res.status(200).json({msg: "user password successfully change"})

           
   }

   const changeDetails = async (req, res) =>{

    console.log("Received body:", req.body); //

    const { websiteid, price, traffic, domainAuthority } = req.body

    if(!websiteid || !price || !traffic || !domainAuthority){

        throw new Error("required all fields ")
    }

           const user = await website.findByIdAndUpdate(websiteid, {

                $set: {
                    price,
                    traffic,
                    domainAuthority
                }

           }, {

            new: true
           }).select("-password")

          res.status(200).json(new ApiResponse(200, user, "website information update successfully"))



   }

   const createOrder = async( req, res ) =>{

       

            const { websiteId, buyerLink, isPaid}   = req.body 

            console.log('Received body in createOrder:', req.body);

            const sellerWebsite = await website.findById(websiteId)
            if(!sellerWebsite){

                throw new Error("website not found")
            }

            console.log("Received websiteId:", req.body.websiteId);

            
            const status  = isPaid ? "complete" :"pending";

            const amount  = sellerWebsite.price;
            const options  = {

              amount: amount * 100,
              currency: "INR",
              receipt: `receipt_${Date.now()}`,
            }

               try {
                
                 const razorpayOrder = await razorpay.orders.create(options);

                 const newOrder = await order.create({
                  buyer:req.user._id,
                  website: sellerWebsite._id,
                  seller: sellerWebsite.user,
                  paymentAmount: sellerWebsite.price,
                  buyerLink,
                  status: "pending",
                  razorpayOrderId: razorpayOrder.id,
              })

              res.status(201).json({msg: res.message || "Order successfully placed", newOrder, razorpayOrder})
                
               } catch (err) {
                console.error("❌ Razorpay order creation error:", err);
                res.status(500).json({ error: "Order creation failed", details: err.message});
               }



            
            

             
   }

   const verifyPayment = async (req, res) => {

    console.log("🛠 Received verify-payment request:", req.body);
console.log("🛠 Razorpay secret:", process.env.RAZORPAY_KEY_SECRET);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    console.log("🛠 Received verify-payment request:", req.body);
console.log("🛠 Razorpay secret:", process.env.RAZORPAY_KEY_SECRET);
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");
  
    if (expected !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    console.log("Looking for Razorpay Order ID:", razorpay_order_id);
  
    const dbOrder = await order.findOne({ razorpayOrderId: razorpay_order_id });

    console.log("verify-payment", dbOrder)
    if (!dbOrder) return res.status(404).json({ error: "Order not found" });
  
    dbOrder.status = "complete";
    dbOrder.paymentId = razorpay_payment_id;
    const newOrder = await dbOrder.save();
    console.log("✅ Saved newOrder:", newOrder);

    console.log("✅ razorpayOrder.id from Razorpay:", razorpay_order_id);

    res.json({ success: true, newOrder });
  };


   const getBuyerOrder = async ( req, res ) =>{


              try {
                 const orders  = await order.find({buyer: req.user._id})
                 .populate("website", "price url")
                 .populate("seller", "username")
                 .sort({ createdAt: -1}) // geeting first result means get last order in first 
  
                 if(!orders || orders.length === 0){
                  throw new Error("no order found")
                 }
  
                 res.status(201).json({msg: res.message || "order detailed successfully fetch", orders})
              } catch (error) {
                 res.status(500).json({msg: "failed to fetch orders", error})
              }

   }

   const getSellerDashboard = async ( req, res) => {
             
        try {
          const websites = await website.find({user: req.user._id}).sort({createdAt: -1});
  
          const orders  = await order.find({seller: req.user._id})
                          .populate("buyer", "username")
                          .populate("website", "price url ")
                          .sort({createdAt: -1})

                          res.status(200).json({
                            msg: "Seller dashboard data fetched successfully",
                            websites,
                            orders
                          })
        } catch (error) {
           res.status(500).json({
            msg: "Failed to load seller dashboard data" || error
           })
        }

   }

  const checkIfSeller = async (req,res) =>{

    try {
      const seller = await website.findOne({user: req.user._id})
  
      const isSeller  = !!seller
  
          res.status(200).json({isSeller})
    } catch (error) {
        console.error("seller not found:", error)
    }
  }

  const sendMessage  = async ( req,res ) => {
      
       try {

        const senderId  = req.user._id;
        const { receiverId, content } = req.body

        const newMsg  = await Message.create({sender: senderId, reciver: receiverId, content})

        res.status(200).json({msg: "message send ", newMsg})
        
       } catch (error) {
         res.status(501).json({msg: "failed to send msg", error})
       }

  };


  const getMessage = async ( req, res) =>{

    try {
      const myId = req.user._id 
      const { receiverId }  = req.body 

      console.log("my id from token :", myId);
      console.log("user id from token :",  receiverId);

      const messages  = await Message.find({
        $or : [
           
          {sender: myId, receiver:  receiverId },
          { sender :  receiverId , receiver: myId}

        ]
      }).sort({createdAt: 1})

      console.log(messages)

      res.status(201).json({ messages })
  
    } catch (error) {
      res.status(502).json({msg: "failed to fetch message",})
      console.log(error)
    }

  }

  const getChatUsersForLoggedInUser = async (req, res) => {
  try {
    const myId = req.user._id.toString();

    const messages = await Message.find({
      $or: [{ sender: myId }, { receiver: myId }],
    }).sort({createdAt: 1});

    const userIds = new Set();

    messages.forEach((msg) => {
      const senderId = msg.sender.toString();
      const receiverId = msg.receiver.toString();

      if (senderId !== myId) userIds.add(senderId);
      if (receiverId !== myId) userIds.add(receiverId);
    });

    const users = await User.find({ _id: { $in: [...userIds] } }).select("_id username");

    res.status(200).json({ users });
  } catch (error) {
    console.error("❌ Error fetching chat users:", error);
    res.status(500).json({ msg: "Failed to fetch chat users" });
  }
};


  const userRole = async (req, res) => {
    try {
      const user = await User.findById(req.user?._id);
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      
      user.role = user.role === "buyer" ? "seller" : "buyer";
      console.log("Switching role to:", user.role);
  
      
      await user.save();

      console.log(user)
  
      
      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(req.user._id);

      console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
  
      const options = {
        httpOnly: true,
        secure:true,
        sameSite: "lax",
      };
  
      console.log("✅ Tokens regenerated");
  
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
          msg: `Role switched to ${user.role}`,
          role: user.role,
          updatedUser: {
            _id: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
          },
        });
    } catch (error) {
      console.error("❌ Error switching role:", error);
      return res.status(500).json({ msg: "Server error", error: error.message });
    }
  };

  const getAllListing  = async ( req, res) => {

    
      try {
        const listings = await website.find().populate('user', 'username email');
        res.status(200).json({ listings });
      } catch (error) {
        return res.status(500).json({error})
      }
    };

      
      

  const deleteListing = async (req, res) => {

    try {
      const { id } = req.params 
      await website.findByIdAndDelete(id)
  
      res.status(200).json({msg: "Listing delete Successfully"})
    } catch (error) {
      res.status(500).json({msg: "Error delete listing", error })
    }
  }

  

const getAdminAnalytics = async (req, res) => {

  try {
    
    const totalBuyers = await User.countDocuments({ role: "buyer" });
    const totalSellers = await User.countDocuments({ role: "seller" });

    
    const totalOrders = await order.countDocuments();
    const orders = await order.find();

    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.paymentAmount || 0),
      0
    );

    
    const topWebsitesAgg = await order.aggregate([
      {
        $group: {
          _id: "$website",
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { orderCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "websites",
          localField: "_id",
          foreignField: "_id",
          as: "websiteDetails"
        }
      },
      {
        $unwind: "$websiteDetails"
      },
      {
        $project: {
          url: "$websiteDetails.url",
          orderCount: 1
        }
      }
    ]);

    res.status(200).json({
      totalBuyers,
      totalSellers,
      totalOrders,
      totalRevenue,
      topWebsites: topWebsitesAgg
    });
  } catch (error) {
    console.error("Admin Analytics Error:", error);
    res.status(500).json({ message: "Error fetching analytics", error });
  }
};

const getMyWebsite = async (req, res) => {


  try {
    
    const websites =   await website.find({user: req.user._id})

    res.status(200).json({msg: " website found successfull ", websites})

  } catch (error) {
    res.status(500).json({msg: " failed to fetch website ", error})
    
  }
}

const filterWebsites = async (req, res) => {
  try {
    const { minPrice, maxPrice, minDA, maxDA, minTraffic, maxTraffic } = req.query;

    const query = {};

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minDA || maxDA) {
      query.domainAuthority = {};
      if (minDA) query.domainAuthority.$gte = Number(minDA);
      if (maxDA) query.domainAuthority.$lte = Number(maxDA);
    }

    if (minTraffic || maxTraffic) {
      query.traffic = {};
      if (minTraffic) query.traffic.$gte = Number(minTraffic);
      if (maxTraffic) query.traffic.$lte = Number(maxTraffic);
    }

    const websites = await website.find(query).populate("user", "username");

    res.status(200).json({ websites });
  } catch (error) {
    console.error("Filter error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const markMessagesAsRead = async (req, res) => {

  try {
    const { withUserId } = req.body;
    const userId = req.user._id;

    await Message.updateMany(
      { sender: withUserId, receiver: userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.json({ success: true, msg: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Failed to mark messages", error });
  }
};

const getUnreadCounts = async (req, res) => {
  try {
    const userId = req.user._id;

    const unreadMessages = await Message.aggregate([
      { $match: { receiver: userId, isRead: false } },
      { $group: { _id: "$sender", count: { $sum: 1 } } },
    ]);

    const unreadCountMap = {};
    unreadMessages.forEach(({ _id, count }) => {
      unreadCountMap[_id.toString()] = count;
    });

    res.json(unreadCountMap);
  } catch (error) {
    res.status(500).json({ success: false, msg: "Failed to fetch unread counts", error });
  }
};

  







 export{userRegister,
        loginUser,
        logoutUser,
        refreshAccessToken,
        getCurrentUser,
        websiteInformation,
        getAllWebsites,
        changeCurrentPassword,
        changeDetails,
        createOrder,
        verifyPayment,
        getBuyerOrder,
        getSellerDashboard,
        checkIfSeller,
        sendMessage,
        getMessage,
        getChatUsersForLoggedInUser,
        userRole,
        getAllListing,
        deleteListing,
        getAdminAnalytics,
        getMyWebsite,
        filterWebsites,
        markMessagesAsRead,
        getUnreadCounts 

        

  }





