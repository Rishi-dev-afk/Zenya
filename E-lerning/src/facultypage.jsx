import { useLocation } from "react-router-dom";
import { useState } from "react";
import './adminpage.css';

import Sidebar from "./studentsetup/sidebar";
import Contant from "./studentsetup/contant"; 

export default function Facltypage() {
    const location = useLocation();
    const userData = location.state || {}; 
    const [activeTab, setActiveTab] = useState("dashboard");
    console.log(userData)
    return (
        <div className="admin-page">
            <Sidebar setActiveTab={setActiveTab} />
            <Contant activeTab={activeTab} adminId={userData}/>
        </div>
    );
}