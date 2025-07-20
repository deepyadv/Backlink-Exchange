import React from 'react'
import{ BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from './Component/Header/Navbar.jsx'
import { Login} from "./Pages/Login.jsx"
import { Register} from "./Pages/Register.jsx"
import HomePage from './Pages/Home.jsx'
import Footer from './Component/Footer/Footer.jsx'
import ChooseRole from './Pages/ChooseRole.jsx'
import WebsiteListing from './Pages/WebsiteListing.jsx'
import AllWebsites from './Pages/AllWebsites.jsx'
import SellerDashboard from './Pages/SellerDashboard.jsx'
import BuyerDashboard from './Pages/BuyerDashboard.jsx'
import ContactUs from './Pages/ContactUs.jsx'
import AboutUs from './Component/AboutUs.jsx'
import Dashboard from './Pages/dashboard.jsx'
import Chat from './Component/chat.jsx'
import FAQs from './Pages/FAQs.jsx'
import Adminpanel from './Pages/Adminpanel.jsx'
import AdminAnalytics from './Pages/AdminAnalytics.jsx'
import EditWebsiteInfo from './Pages/EditWebsiteInfo.jsx'
import ChatPage from './Pages/ChatPages.jsx'

function App() {
  return (
    <BrowserRouter>
    < Navbar />
    
    
    <Routes>

    <Route path='/' element = { <HomePage/>} />
    
      <Route path='login' element = { <Login/>} />
      <Route path='register' element ={<Register/>}/>
      <Route path='choose-role' element ={ < ChooseRole/>} />
      <Route path='website-listing' element={<WebsiteListing/>} />
      <Route path='all-websites' element ={< AllWebsites/>} /> 
      <Route path='seller-dashboard' element={<SellerDashboard/>} />
      <Route path='buyer-dashboard' element={<BuyerDashboard/>} />
      <Route path='contact-us' element={<ContactUs/>} />
      <Route path='about-us' element={<AboutUs/>} />
      <Route path='dashboard' element={<Dashboard/>} />
      {/* <Route path="/chat/:receiverId" element={<Chat />} /> */}
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/admin-dashboard" element={<Adminpanel />} />
      <Route path="/admin-analytics" element={<AdminAnalytics />} />
      <Route path="/edit-website-info" element={<EditWebsiteInfo />} />
      <Route path="/chat/:receiverId" element={<ChatPage />} />
      
    </Routes>

    <Footer/>
    </BrowserRouter>
  )
}

export default App

