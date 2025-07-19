import {Router} from "express"
import { userRegister, loginUser,logoutUser, refreshAccessToken, getCurrentUser, websiteInformation, getAllWebsites, changeDetails,
createOrder, verifyPayment, getBuyerOrder, getSellerDashboard, checkIfSeller, sendMessage,
getMessage, getChatUsersForLoggedInUser,userRole, getAllListing,
deleteListing, getAdminAnalytics,getMyWebsite, filterWebsites,markMessagesAsRead,getUnreadCounts  } from "../controller/user.controller.js";
import {verifyJwt} from "../middleware/auth.middleware.js"
import {upload} from "../middleware/multer.middleware.js"
import { isSeller } from "../middleware/isSeller.middleware.js";
import { isBuyer } from "../middleware/isBuyer.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";




const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser );
router.route("/refresh-token").post(refreshAccessToken);
router.route("/get-current-user").get(verifyJwt, getCurrentUser)
router.route("/website-details").post(verifyJwt, upload.single("image"),
    
    websiteInformation);
router .route("/get-All-websites").post(getAllWebsites)    
router.route("/update-user-details").put(verifyJwt, changeDetails)   
router.route("/order-Create").post(verifyJwt, createOrder);
router.route("/verify-payment").post(verifyJwt, verifyPayment,);
router.route("/user-order-details").post(verifyJwt, isBuyer, getBuyerOrder);
router.route("/seller-dashboard").post(verifyJwt, isSeller, getSellerDashboard);
router.route("/is-seller").post(verifyJwt, checkIfSeller);
router.route("/send-messages").post(isSeller, sendMessage);
router.route("/messages").post(verifyJwt, getMessage);
router.route("/chat-users").post(verifyJwt, getChatUsersForLoggedInUser);
router.route("/switch-role").patch(verifyJwt, userRole);
router.route("/get-all-website").get(verifyJwt, isAdmin, getAllListing);
router.route("/delete-website/:id").delete(verifyJwt, isAdmin, deleteListing);
router.route("/analytics").get(verifyJwt, isAdmin, getAdminAnalytics );
router.route("/seller-websites").get(verifyJwt, getMyWebsite );
router.route("/filter").get(verifyJwt, filterWebsites );
router.route("/mark-read").patch(verifyJwt, markMessagesAsRead);
router.route("/unread-count").get(verifyJwt, getUnreadCounts);

export {router}