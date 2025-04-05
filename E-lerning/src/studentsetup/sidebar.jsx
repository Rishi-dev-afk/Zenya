import React from "react";
import './sidebar.css';
const Sidebar = ({ setActiveTab }) => {
  return (
    <div className="sidebar">
      <h2 className="text-2xl font-bold mb-6">Sidebar</h2>
      <div onClick={() => setActiveTab("dashboard")} className="sidebar-data-setup">
        Dashboard
      </div>
      <div onClick={() => setActiveTab("student")} className="sidebar-data-setup">
         student
      </div>
      <div onClick={() => setActiveTab("teacher")} className="sidebar-data-setup">
        Teacher
      </div>
      <div onClick={() => setActiveTab("question")} className="sidebar-data-setup">
      question
      </div>
      <div onClick={() => setActiveTab("video")} className="sidebar-data-setup">
      video
      </div>
    </div>
  );
};

export default Sidebar;
