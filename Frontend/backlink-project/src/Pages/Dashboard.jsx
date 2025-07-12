import React from 'react'
import { useSelector} from "react-redux"
import BuyerDashboard from "./BuyerDashboard"
import SellerDashboard from "./SellerDashboard"
import SwitchRole from '../Component/SwitchRole'


function Dashboard() {

    const user  = useSelector((state) => state.auth.userData )

    console.log(user)
    

    if(!user ){

        return <p className="text-center mt-10 text-gray-500">Loading user data...</p>;
    }



  return (
    <div>

        {

            user.role === "buyer" ? <BuyerDashboard/> : <SellerDashboard />
        }

        { <SwitchRole currentRole = {user.role}/>}
       
    </div>
  )
}

export default Dashboard