import { useLocation } from "react-router-dom";
import { useState } from "react";
import './adminpage.css';

import Sidebar from "./adminsetup/sidebar";
import Contant from "./adminsetup/contant"; 

export default function AdminPage() {
    const location = useLocation();
    const userData = location.state || {}; 
    const [activeTab, setActiveTab] = useState("dashboard");
    console.log(userData)
    return (
        <div className="admin-page">
            <Sidebar setActiveTab={setActiveTab} />
            <Contant activeTab={activeTab} />
        </div>
    );
}