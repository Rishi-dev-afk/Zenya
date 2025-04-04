import './heder.css';
import logo from "../assets/logo2.jpg";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Heder() {
    const [tracklogin, settracklogin] = useState(false);
    const [tracksignup, settracksignup] = useState(false);
    const navigate = useNavigate();

    return (
        <>
           <div className='headerlogin'>
            <div className='logodivset'>
                <img src={logo} alt="Logo" className='logoimg' />
            </div>
            <div className='support'>
                support
            </div>
            <div>
                <div onClick={() => settracklogin(!tracklogin)} className={tracklogin ? 'loginbtn1' : 'loginbtn'}>
                <div className='loginfixsetup'>{tracklogin ? 'login' : 'login'} </div>
                {
                        tracklogin ? (
                            <div className='loginform'>
                                <hr />
                                <div className="loginadmin" onClick={() => navigate("/admin/login")}>Admin</div>
                                <hr />
                                <div className="loginstudent" onClick={() => navigate("/student/login")}>Student</div>
                                <hr />
                                <div className="loginfaculty" onClick={() => navigate("/faculty/login")}>Faculty</div>
                                <hr />
                                <div className="loginparent" onClick={() => settracklogin(false)}> ⊼ </div>
                            </div>
                          ) : ""
                    }  
                </div>
            </div>
            <div className='signupdiv'>
                <div onClick={() => settracksignup(!tracksignup)} className={tracksignup ? 'loginbtn1' : 'loginbtn'}>
                <div>{tracksignup ? 'signin' : 'signin'}</div> {
                        tracksignup ? (
                            <div className='loginform'>
                                <hr />
                                <div className="loginadmin" onClick={() => navigate("/admin/signin")}>Admin</div>
                                <hr />
                                <div className="loginstudent" onClick={() => navigate("/student/signin")}>Student</div>
                                <hr />
                                <div className="loginfaculty" onClick={() => navigate("/faculty/signin")}>Faculty</div>
                                <hr />
                                <div className="loginparent" onClick={() => settracksignup(false)}> ⊼ </div>
                            </div>
                          ) : ""
                    }  
                </div>
            </div>

           </div>
        </>
    );
}