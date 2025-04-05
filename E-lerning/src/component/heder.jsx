import './heder.css';
import logo from "../assets/logo2.jpg";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Heder() {
    const [tracklogin, settracklogin] = useState(false);
    const [tracksignup, settracksignup] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='headerlogin'>
            {/* Bigger Logo */}
            <div>
                <img src={logo} alt="Logo" className='logoimg' />
            </div>

            {/* Move Login & Signup to the Right */}
            <div className='auth-container'>
                {/* Login */}
                <div className='logindropdown'>
                    <button onClick={() => settracklogin(!tracklogin)} className={tracklogin ? 'loginbtn1' : 'loginbtn'}>
                        {tracklogin ? '' : 'Login'}
                    </button>
                    {tracklogin && (
                        <div className='loginform'>
                            <div onClick={() => navigate("/admin/login")}>Admin</div>
                            <div onClick={() => navigate("/student/login")}>Student</div>
                            <div onClick={() => navigate("/faculty/login")}>Faculty</div>
                            <div onClick={() => settracklogin(false)}>⊼</div>
                        </div>
                    )}
                </div>

                {/* Signup */}
                <div className='logindropdown'>
                    <button onClick={() => settracksignup(!tracksignup)} className={tracksignup ? 'loginbtn1' : 'loginbtn'}>
                        {tracksignup ? '' : 'Sign Up'}
                    </button>
                    {tracksignup && (
                        <div className='loginform'>
                            <div onClick={() => navigate("/admin/signup")}>Admin</div>
                            <div onClick={() => navigate("/student/signup")}>Student</div>
                            <div onClick={() => navigate("/faculty/signup")}>Faculty</div>
                            <div onClick={() => settracksignup(false)}>⊼</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}