import './heder.css';
import logo from "../assets/logo.jpg";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Heder() {
    const [tracklogin, settracklogin] = useState(false);
    const [tracksignup, settracksignup] = useState(false);
    const navigate = useNavigate();

    return (
        <>
           <div className='headerlogin'>
            <div>
                <img src={logo} alt="Logo" className='logoimg' />
            </div>
            <div>
                <button onClick={() => settracklogin(!tracklogin)} className={tracklogin ? 'loginbtn1' : 'loginbtn'}>
                {tracklogin ? '' : 'login'} {
                        tracklogin ? (
                            <div className='loginform'>
                                <div className="loginadmin" onClick={() => navigate("/admin/login")}>Admin</div>
                                <div className="loginstudent" onClick={() => navigate("/student/login")}>Student</div>
                                <div className="loginfaculty" onClick={() => navigate("/faculty/login")}>Faculty</div>
                                <div className="loginparent" onClick={() => settracklogin(false)}> ⊼ </div>
                            </div>
                          ) : ""
                    }  
                </button>
            </div>
            <div>
                <button>
                <button onClick={() => settracksignup(!tracksignup)} className={tracksignup ? 'loginbtn1' : 'loginbtn'}>
                {tracksignup ? '' : 'signin'} {
                        tracksignup ? (
                            <div className='loginform'>
                                <div className="loginadmin" onClick={() => navigate("/admin/signin")}>Admin</div>
                                <div className="loginstudent" onClick={() => navigate("/student/signin")}>Student</div>
                                <div className="loginfaculty" onClick={() => navigate("/faculty/signin")}>Faculty</div>
                                <div className="loginparent" onClick={() => settracksignup(false)}> ⊼ </div>
                            </div>
                          ) : ""
                    }  
                </button>
                </button>
            </div>

           </div>
        </>
    );
}