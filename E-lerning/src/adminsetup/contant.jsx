import React from "react";
import './contant.css'

import Dashboard from "./contantpage/dashbord.jsx";
import Aboutvideo from "./contantpage/aboutvideo.jsx";
import Aboutstudent from "./contantpage/aboutstudent.jsx";
import Aboutteacher from "./contantpage/aboutteacher.jsx";
import Aboutquestion from "./contantpage/aboutquestion.jsx";


const Content = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "student":
        return < Aboutstudent/>;
      case "teacher":
        return <Aboutteacher />;
      case "question":
        return <Aboutquestion />;
      case "video":
        return <Aboutvideo />;  
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="contant">
      {renderContent()}
    </div>
  );
};

export default Content;
